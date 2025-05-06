import React from 'react'
import Header from './components/Header/Header'
import Home from './Pages/Home/Home'
import Footer from './components/Footer/Footer'
import Movie from './Pages/Movie/Movie'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import ForgotPassword from './Pages/Auth/ForgotPassword'
import ResetPassword from './Pages/Auth/ResetPassword'

import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useAuthStore } from './store/authStore'
import { useEffect } from 'react'


const App = () => {

  const checkAuth = useAuthStore((state) => state.checkAuth);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);


  return (
    <>

      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/movie/:id' element={<Movie />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/forgot-password' element={<ForgotPassword />}></Route>
          <Route path='/reset-password/:token' element={<ResetPassword />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App