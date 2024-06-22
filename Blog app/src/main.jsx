import React, { Suspense, lazy } from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.scss'
import 'bootstrap/dist/css/bootstrap.css';
import './css-configration/classes.scss'
import { Outlet, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom'
// import Login from './pages/login page/Login.jsx'



import  { Login, SignUP } from './pages/auth pages/Register.jsx';
const Register=React.lazy(()=>import('./pages/auth pages/Register'))
const  Home = lazy(()=>import('./pages/home/Home.jsx'));
const  Layout = lazy(()=>import('./layout/Layout.jsx'));

// console.log("layout",Layout);
// import  Layout from './layout/Layout.jsx'
import Tool from './component/Tool.jsx'
import { Provider, useSelector } from 'react-redux'
import { store } from './store.js'
import Loder from './component/loader/Loder.jsx'
const BlogSection=React.lazy(()=>import("./pages/create blog/BlogSection.jsx"))
import { CreateBlog, CreateStory } from './pages/create blog/BlogSection.jsx'
const  Friend =lazy(()=>import('./pages/friend page/Friend.jsx')) 
const  SingleFrdSection=lazy(()=>import("./pages/singlefriend page/SingleFrdSection.jsx")) 

const  Friends = lazy(()=>import("./pages/singlefriend page/Friends.jsx"));
// const MenuBar =lazy(()=>import( './component/hearder/mobileMenuBar/MenuBar.jsx'))
// const ImageShow =lazy(()=>import( './component/imageShow/ImageShow.jsx'))
const UserProfile=lazy(()=>import('./pages/profile page/UserProfile.jsx')) 
const UserAbout=lazy(()=>import("./pages/profile page/UserAbout.jsx"))
import {BioForm, PersonalForm, UserEdu } from './pages/profile page/UserAbout.jsx'
// console.log("fsdfjhgdf")


import { useDispatch } from 'react-redux'
import  {getUserInfo, isVerified} from './sclice/authSlice/authSlice.js'
import   {getUserProfile}  from  './sclice/userProfileSlice.js'
import  {getStories} from './sclice/storySlice.js'
import UserFriend from './pages/profile page/UserFriend.jsx';
import { getAllFrnd } from './sclice/friendSlice.js';

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
            loader:async()=>{
            
              // if(authStatus)
              // location.replace("/auth/sign-in")          
              // else
              await dispatch(getStories())
            return null}
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
            loader:async()=>{
              await dispatch(isVerified())
return 0
            },
            
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
                    return 0
                  },
                 
                },
                {
                  path: "education-and-work",
                  element: <UserEdu />
                },
                ]
              }, {
                path: 'friends',
                element: <UserFriend />,
                loader:async()=>{
                  dispatch(getAllFrnd({type:"self"})); 
                  return null                 
                }
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
 <Suspense fallback={ <section style={{  background:"linear-gradient(45deg, #000428, #004e92)",width:"100vw",height:"100vh"}}>< Loder style={{height:"100%"}}/></section> }>
    {/* <RouterProvider router={router} /> */}
   
    
    <RoutePath/>
    </Suspense>
    </Provider>

  </>



)
