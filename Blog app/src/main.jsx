import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import './css-configration/classes.scss'
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom'
// import Login from './pages/login page/Login.jsx'
import Register, { Login, SignUP } from './pages/auth pages/Register.jsx';
import Home from './pages/home/Home.jsx'
import Layout from './layout/Layout.jsx'
import Tool from './component/Tool.jsx'
import { Provider } from 'react-redux'
import { store } from './store.js'
import Loder from './component/loader/Loder.jsx'
import BlogSection, { CreateBlog, CreateStory } from './pages/create blog/BlogSection.jsx'
import Friend from './pages/friend page/Friend.jsx'
import { SingleFrdSection } from './pages/singlefriend page/SingleFrdSection.jsx'
import Friends from './pages/singlefriend page/Friends.jsx'
import MenuBar from './component/hearder/mobileMenuBar/MenuBar.jsx'
import ImageShow from './component/imageShow/ImageShow.jsx'
import UserProfile from './pages/profile page/UserProfile.jsx'
import UserAbout, { BioForm, PersonalForm, UserEdu } from './pages/profile page/UserAbout.jsx'

// console.log("fsdfjhgdf")


import { useDispatch } from 'react-redux'
import { isVerified } from './sclice/authSlice/authSlice.js'
import { getUserProfile } from './sclice/userProfileSlice.js'
import { ImOpt } from 'react-icons/im'
import { getStories } from './sclice/storySlice.js'
const RoutePath = () => {

  const dispatch = useDispatch();

  const router = createBrowserRouter(
    [
      {
        path: "",
        element: <Layout />,
        children: [

          {
            path: "/",
            element: <Home />,
            loader:async()=>await dispatch(getStories())
          },

          {
            path: "/auth",
            element: < Register />,
            loader:async()=>await dispatch(isVerified()),
            children: [{
              path: "sign-in",
              element: <Login />

            },
            {
              path: "sign-up",
              element: <SignUP />

            },
            ]
          },
          {
            path: "/upload",
            element: <Tool />
          },
          {
            path: "/loader",
            element: <Loder />
          },
          {
            path: '/create',
            element: <BlogSection />,
            children:[{
              path:"blog",
              element:<CreateBlog/>
            },
            {
              path:"story",
              element:<CreateStory/>
            }]

          },
          {
            path: '/friends',
            loader:async()=>await dispatch(isVerified()),
            element: <Friend />
          },
          {
            path: 'single-friend',
            element: <SingleFrdSection />,
            children: [
              {
                path: '',
                element: <Friends />
              },
              {
                path: './blogs',
                element: <Friends />
              },
            ]
          }
          ,
          {
            path: "user/profile",
            element: <UserProfile />,
            loader:async()=>await dispatch(isVerified()),

            children: [
              {
                path: '',
                element: <UserAbout />,
                children: [{
                  path: "",
                  element: <BioForm />
                },
                {
                  path: "personal-detail",
                  element: <PersonalForm />,
                  loader:async()=>{
                    await dispatch(getUserProfile("personal"))
                    return null
                  }
                },
                {
                  path: "education-and-work",
                  element: <UserEdu />
                },
                ]
              }, {
                path: './friends',
                element: <Friends />
              }
            ]
          }


        ],
      },


    ]
  )


  return <RouterProvider router={router} />

}
// const router = createBrowserRouter(
//   [
//     {
//       path: "",
//       element: <Layout/>,
//       children: [

//         {
//           path: "/",
//           element: <Home />
//         },

//         {
//           path: "/auth",
//           element: < Register />,
//           children: [{
//             path: "sign-in",
//             element: <Login />

//           },
//           {
//             path: "sign-up",
//             element: <SignUP />

//           },
//           ]
//         },
//         {
//           path: "/upload",
//           element: <Tool />
//         },
//         {
//           path: "/loader",
//           element: <Loder />
//         },
//         {
//           path: '/create-blog',
//           element: <CreateBlog />

//         },
//         {
//           path: '/friends',
//           element: <Friend />
//         },
//         {
//           path: 'single-friend',
//           element: <SingleFrdSection />,
//           children: [
//             {
//               path: '',
//               element: <Friends />
//             },
//             {
//               path: './blogs',
//               element: <Friends />
//             },
//           ]
//         }
//         ,
//         {
//           path: "user/profile",
//           element: <UserProfile />,
//           // loader:async()=>await dispatch(isVerified()),

//           children: [
//             {
//               path: '',
//               element: <UserAbout />,
//               children: [{
//                 path: "",
//                 element: <BioForm />
//               },
//               {
//                 path: "personal-detail",
//                 element: <PersonalForm />
//               },
//               {
//                 path: "education-and-work",
//                 element: <UserEdu />
//               },
//               ]
//             }, {
//               path: './friends',
//               element: <Friends />
//             }
//           ]
//         }


//       ],
//     },


//   ]
// )



ReactDOM.createRoot(document.getElementById('root')).render(

  <>
    <Provider store={store}>
    {/* <RouterProvider router={router} /> */}
    <RoutePath/>
    </Provider>
  </>



)
