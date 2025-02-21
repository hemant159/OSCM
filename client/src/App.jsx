import React, {lazy} from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Group from './pages/Group';

const Home = lazy(() => import("./pages/Home"))
const Login = lazy(() => import("./pages/Login"))
const Chat = lazy(() => import("./pages/Chat"))
const Groups = lazy(() => import("./pages/Group"))

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/chat/:chatid' element={<Chat />}/>
          <Route path='/groups' element={<Groups />}/>
          <Route path='/login' element={<Login />}/>
        </Routes>
      </BrowserRouter>
    </>
  )
};

export default App
