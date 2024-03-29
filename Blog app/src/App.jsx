import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/login page/Login'
import 'bootstrap/dist/css/bootstrap.css';
import Register from './pages/register page/Register'
import { Outlet } from 'react-router-dom'
import { url } from './tools/serverURL'

function App() {

  return (
<div >
  {url}
  <Outlet/>
</div>
  )
}

export default App
