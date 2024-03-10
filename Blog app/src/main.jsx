import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/login page/Login.jsx'
import Register from './pages/register page/Register.jsx'
const router=createBrowserRouter(
[
  {
    path:"/",
    element: <App />,
    children:[
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
  {
    path:"/register",
    element:<Register/>
  }
]
)


 const root =ReactDOM.createRoot(document.getElementById('root'));
 root.render(

 <RouterProvider router={router}>
  
 </RouterProvider>
   
 
)
