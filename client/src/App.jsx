import React from 'react'
import Header from './components/Header/Header'
import Home from './Pages/Home/Home'
import Footer from './components/Footer/Footer'
import Movie from './Pages/Movie/Movie'
import Register from './Pages/Auth/Register'
import Login from './Pages/Auth/Login'
import ForgotPassword from './Pages/Auth/ForgotPassword'
import ResetPassword from './Pages/Auth/ResetPassword'

const App = () => {
  return (
    <>
      <Header />
      <ResetPassword  />
      <Footer />
    </>
  )
}

export default App