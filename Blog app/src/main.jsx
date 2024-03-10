import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/login page/Login.jsx'
import Register from './pages/register page/Register.jsx'
import Home from './pages/home/Home.jsx'
const router=createBrowserRouter(
[
  {
    path:"/",
    element: <App/>,
    children:[

      {
        path:"/",
        element:<Home/>
      },
      {

        path:"/login",
        element:<Login/>,
      },
      {
        path:"/register",
        element:<Register/>
      }

    ],
  },
 
]
)

ReactDOM.createRoot(document.getElementById('root')).render(

  <>
 <RouterProvider router={router}/>
  </>

   
 
)
