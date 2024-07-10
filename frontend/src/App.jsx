import { Routes, Route, Navigate, Router } from 'react-router-dom'

import AdminLogin from './pages/admin/AdminLogin'
import Dashboard from './pages/admin/Dashboard'
import AddShoe from './pages/admin/AddShoe'
import EditShoe from './pages/admin/EditShoe'
import ShoeDetail from './pages/admin/ShoeDetail'
import { useEffect } from 'react'
import Home from './pages/client/Home'
import Search from './pages/client/Search'
import Product from './pages/client/Product'
import Login from './pages/client/Login'
import Register from './pages/client/Register'
import Profile from './pages/client/Profile'
import Checkout from './pages/client/Checkout'
import Thankyou from './pages/client/Thankyou'
import LandingPage from './pages/client/LandingPage'


function App() {

  useEffect(() => {
    const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js"
    const clientKey = "SB-Mid-client-EtWKsueB7t7AZgtA"
    const script = document.createElement('script')
    script.src = snapScript
    script.setAttribute('data-client-key', clientKey)
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }

  }, []);


  const admin = localStorage.getItem('admin')
  const user = localStorage.getItem('user')
  return (

    <Routes>
      <Route
        path="/admin/*"
        element={
          <Routes>
            <Route path="" element={admin ? <Dashboard /> : <Navigate to={'/admin/login'} />} />
            <Route path="login" element={admin ? <Navigate to={'/admin'} /> : <AdminLogin />} />
            <Route path="add" element={admin ? <AddShoe /> : <Navigate to={'/admin/login'} />} />
            <Route path="edit/:id" element={admin ? <EditShoe /> : <Navigate to={'/admin/login'} />} />
            <Route path="detail/:id" element={admin ? <ShoeDetail /> : <Navigate to={'/admin/login'} />} />
          </Routes>
        }
      />
      <Route path='/' element={<LandingPage />} />
      <Route path="/shop" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path='/product/:id' element={<Product />} />
      <Route path='/profile/:name' element={user ? <Profile /> : <Navigate to={'/login'} />} />
      <Route path='/checkout' element={user ? <Checkout /> : <Navigate to={'/login'} />} />
      <Route path='/thanks' element={<Thankyou userId={user} />} />
      <Route path='/login' element={!user ? <Login /> : <Navigate to={"/"} />} />
      <Route path='/signup' element={!user ? <Register /> : <Navigate to={"/"} />} />
    </Routes>

  )
}

export default App
