import React, {lazy, Suspense} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Group from './pages/Group';
import ProtectRoute from './components/auth/ProtectRoute';
import NotFound from './pages/NotFound';
import LayoutLoaders from './components/layout/Loaders';

const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Chat = lazy(() => import("./pages/Chat"))
const Groups = lazy(() => import("./pages/Group"))

let user = true;

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<LayoutLoaders />}>
          <Routes>
            <Route element={<ProtectRoute user={user} />}>
              <Route path='/home' element={<Home />}/>
              <Route path='/chat/:chatid' element={<Chat />}/>
              <Route path='/groups' element={<Groups />}/>
            </Route>
            <Route path='/login' element={
              <ProtectRoute user={!user} redirect='/home'>
                <Login />
              </ProtectRoute>
            }/>
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  )
};

export default App
