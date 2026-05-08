import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import AppContext, { useApp } from './components/AppContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import AppProvider from './components/AppContext'
import ShowProduct from './components/ShowProduct'
import About from './components/About'
import SignUp from './components/SignUp'
import Login from './components/Login'
import AdminDashboard from './components/AdminDashboard'
import { useAutoLogout } from './hook/useAutoLogout'
import OrderProduct from './components/OrderProduct'
import Dashboard from './components/Dashboard'
import AddProduct from './components/AddProduct'
import ViewProduct from './components/ViewProduct'
import EditUser from './components/EditUser'
import { useTokenRefresh } from './hook/useTokenRefresh'
function AppRoutes() {
  useAutoLogout();
  const { isLoggedIn } = useApp();
     useTokenRefresh(isLoggedIn, 29);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/product' element={<ShowProduct />} />
      <Route path='/about' element={<About />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/login' element={<Login />} />
      <Route path='/adminDashboard' element={<AdminDashboard />} />
      <Route path='/order' element={<OrderProduct />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/addNewProduct' element={<AddProduct />} />
      <Route path='/viewProduct' element={<ViewProduct />} />
      <Route path='/editProfile' element={<EditUser/>}/>
    </Routes>
  );
}

function App() {
  
  return (
    <BrowserRouter>
      <AppProvider>
        <div className=''>

          <AppRoutes />

        </div>
      </AppProvider>
    </BrowserRouter>
  )
}

export default App