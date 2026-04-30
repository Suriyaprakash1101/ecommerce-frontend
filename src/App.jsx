import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AppContext from './components/AppContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import AppProvider from './components/AppContext'
import ShowProduct from './components/ShowProduct'
import About from './components/About'
import SignUp from './components/SignUp'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'


function App() {
 

  return (
    <AppProvider>
      <div className=''>
        
      <BrowserRouter>
      
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/product' element={<ShowProduct/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/adminDashboard' element={<AdminDashboard/>}/>
        </Routes>
      </BrowserRouter>
      
      </div>
    </AppProvider>
  )
}

export default App
