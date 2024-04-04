import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './pages/login page/Login.jsx'
import Register from './pages/auth pages/Register.jsx';
import Home from './pages/home/Home.jsx'
import Layout from './layout/Layout.jsx'
import Tool from './component/Tool.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'
import Loder from './component/loader/Loder.jsx'
import CreateBlog from './pages/create blog/CreateBlog.jsx'
import Friend from './pages/friend page/Friend.jsx'
import { SingleFrdSection } from './pages/singlefriend page/SingleFrdSection.jsx'
import Friends from './pages/singlefriend page/Friends.jsx'
import MenuBar from './component/hearder/mobileMenuBar/MenuBar.jsx'

// console.log("fsdfjhgdf")
const router = createBrowserRouter(
  [
    {
      path: "",
      element: <Layout />,
      children: [

        {
          path: "/",
          element: <Home />
        },
        {

          path: "/login",
          element: <Login />,
        },
        {
          path: "/sign-up",
          element: < Register/>
        },
        {
          path: "/upload",
          element: <Tool/>
        },
        {
          path: "/loader",
          element: <Loder/>
        },
        {
          path:'/create-blog',
          element:<CreateBlog/>

        },
        {
          path:'/friends',
          element:<Friend/>
        },
        {
          path:'single-friend',
          element:<SingleFrdSection/>,
          children:[
            {
              path:'',
              element:<Friends/>
            },
            {
              path:'./blogs',
              element:<Friends/>
            },
          ]
        }


      ],
    },
    {
      path:"/menu",
      element:<MenuBar/>
    }

  ]
)

ReactDOM.createRoot(document.getElementById('root')).render(

  <>
  <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </>



)
