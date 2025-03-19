import React, {lazy, Suspense, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Group from './pages/Group';
import ProtectRoute from './components/auth/ProtectRoute';
import NotFound from './pages/NotFound';
import LayoutLoaders from './components/layout/Loaders';
import axios from "axios";
import { server } from './constants/config';
import { useDispatch, useSelector } from "react-redux";
import { userExists, userNotExists } from "./redux/reducers/auth";
import {Toaster } from "react-hot-toast";
import { SocketProvider } from './socket';

const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Chat = lazy(() => import("./pages/Chat"))
const Groups = lazy(() => import("./pages/Group"))

const AdminLogin = lazy(() => import("./pages/admin/AdminLogin"))
const DashBoard = lazy(() => import("./pages/admin/DashBoard"))
const UserManagement = lazy(() => import("./pages/admin/UserManagement"))
const ChatManagement = lazy(() => import("./pages/admin/ChatManagement"))
const MessageManagement = lazy(() => import("./pages/admin/MessageManagement"))


const App = () => {

  const {user, loader} = useSelector(state => state.auth)
 
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${server}/api/v1/user/profile`, { withCredentials: true })
      .then(({ data }) => dispatch(userExists(data.user)))
      .catch((err) => dispatch(userNotExists()));
  }, [dispatch])
  return loader ? (
    <LayoutLoaders />
    ) : (
    <>
      <BrowserRouter>
        <Suspense fallback={<LayoutLoaders />}>
          <Routes>
            <Route element={<SocketProvider>
              <ProtectRoute user={user} />
            </SocketProvider>}>
              <Route path='/home' element={<Home />}/>
              <Route path='/chat/:chatid' element={<Chat />}/>
              <Route path='/groups' element={<Groups />}/>
            </Route>
            <Route path='/login' element={
              <ProtectRoute user={!user} redirect='/home'>
                <Login />
              </ProtectRoute>
            }/>
            <Route path='/admin' element={<AdminLogin />} />
            <Route path='/admin/dashboard' element={<DashBoard />} />
            <Route path='/admin/users' element={<UserManagement />} />
            <Route path='/admin/chats' element={<ChatManagement />} />
            <Route path='/admin/messages' element={<MessageManagement />} />
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </Suspense>
        <Toaster position='bottom-center' />
      </BrowserRouter>
    </>
  )
};

export default App
