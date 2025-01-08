import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import {Loader} from "lucide-react"

import {Routes, Route, Navigate} from "react-router-dom"
import { useAuthStore } from './store/useAuthStore'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'

const App = () => {
 const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore();
const {theme}=useThemeStore()

console.log({onlineUsers});

 useEffect(()=>{  //this hook check if user authenticated or not
  checkAuth();
 }, [checkAuth]);

 console.log({authUser});

 if(isCheckingAuth && !authUser) 
  return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  );
  
  return (
    <div data-theme={theme}> 
      <Navbar/>
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/login"/>}/> //authuser can se home page but if they are not they navigate to login page
        <Route path='/signup' element={!authUser ?<SignUpPage/>: <Navigate to="/"/>}/>
        <Route path='/login' element={!authUser ?<LoginPage/>: <Navigate to="/"/>}/>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path='/profile' element={authUser ? <ProfilePage/> :<Navigate to="/login"/>}/>
      </Routes>


      <Toaster/>
    </div>
  )
}

export default App