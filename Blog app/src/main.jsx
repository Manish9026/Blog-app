import React, { Suspense, lazy, memo, useCallback } from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.scss'
// import 'bootstrap/dist/css/bootstrap.css';
// import './css-configration/classes.scss'
import { Outlet, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom'
// import Login from './pages/login page/Login.jsx'



import  { Login, SignUP } from './pages/auth pages/Register.jsx';
const Register=React.lazy(()=>import('./pages/auth pages/Register'))
const  Home = lazy(()=>import('./pages/home/Home.jsx'));
const  Layout = lazy(()=>import('./layout/Layout.jsx'));

// console.log("layout",Layout);
// import  Layout from './layout/Layout.jsx'
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


import { useDispatch } from 'react-redux'
import  {getUserInfo, isVerified} from './sclice/authSlice/authSlice.js'
import   {getUserProfile}  from  './sclice/userProfileSlice.js'
import  {getStories} from './sclice/storySlice.js'
import UserFriend from './pages/profile page/UserFriend.jsx';
import { getAllFrnd, getFriendPageData } from './sclice/friendSlice.js';
import UserBlogs from './pages/profile page/UserBlogs.jsx';
import { getAllPost } from './sclice/userPostSlice.js';
import { GoogleOAuthProvider } from '@react-oauth/google';
import PNotFound from './component/utils.component/PNotFound.jsx';
import InternalError from './component/utils.component/InternalError.jsx';
// import UserMessage, { MessageBody } from './pages/message page/UserMessage.jsx';
const UserMessage = lazy(() => import("./pages/message page/UserMessages.jsx").then(module =>({ default: module.UserMessage })
));
const MessageBody = lazy(() => import("./pages/message page/UserMessages.jsx").then(module => ({ default: module.MessageBody })));
import SocketProvider from './context/SocketContext.jsx';
import { CookiesProvider } from 'react-cookie';
import Blog from './pages/singlefriend page/Blog.jsx';
import Photo from './pages/singlefriend page/Photo.jsx';
import About from './pages/singlefriend page/About.jsx';
import SavedStory from './pages/savedStorypage/SavedStory.jsx';
import Comment from './pages/comment page/Comment.jsx';


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
             
              dispatch(getStories())
              dispatch(getAllPost({skip:0,next:10}))
             
             
            
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
            loader:async()=>dispatch(getFriendPageData()),
            element: <Friend />
          },
          {
            path: 'single-friend',
            element: <SingleFrdSection />,
            children: [
              {
                path: '',
                element: <Friends />,
               
              },
              {
                path: 'about',
                element: <About />,
               
              },
              
              {
                path: 'friends',
                element: <Friends />,
               
              },
              {
                path: 'blogs',
                element: <Blog />,
               
              },
              {
                path: 'photos',
                element: <Photo />,
               
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
                path: 'about',
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
              },
              {
                path:"blogs",
                element:<UserBlogs/>
              },
              {
                path:"photos",
                element:<Photo/>
              }
            ]
          },
          {
            path:"/user/message",
            element:<UserMessage/>,
            loader:()=>{
              dispatch(getAllFrnd({type:"self"}))
              return 0
            },children:[{
              path:":frndId",
              element:<MessageBody/>
           
            }]
          },
          {
            path:"saved-story",
            element:<SavedStory/>
          }
,{
  path:"/user/comments",
  element:<Comment/>
},
          {
            path:"*",
            element:<PNotFound/>
          },{
            path:"/internal-error",
            element:<InternalError/>
          }


        ],
        loader:()=>{
          dispatch(isVerified())
          return 0
        }
      },


    ]
  )


  return (

  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    
     <RouterProvider router={router} /></GoogleOAuthProvider>
)

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
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
 
    <Provider store={store}>
 <Suspense fallback={ <section style={{  background:"linear-gradient(45deg, #000428, #004e92)",width:"100vw",height:"100vh"}}>< Loder style={{height:"100%"}}/></section> }>
    {/* <RouterProvider router={router} /> */}
    <SocketProvider>
    <RoutePath/>
    </SocketProvider>

    </Suspense>
    </Provider>
    </CookiesProvider>


  </>



)

import { registerSW } from 'virtual:pwa-register';
// import {} from 'virt'

registerSW({
  onNeedRefresh() {},
  onOfflineReady() {}
});