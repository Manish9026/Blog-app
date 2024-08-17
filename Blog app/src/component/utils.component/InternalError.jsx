import React from 'react'
import './style.scss';
import video from '../../assets/backgroundImg/Error.mp4'
import { Link, useLocation, useNavigate } from 'react-router-dom'
const InternalError = () => {
    const navigate=useNavigate();
  return (
 
    <section className="error-page center">
   
     <video src={video} autoPlay loop className='video-part'></video>
          

   <div className="contant_box center">
		<h3 className="h2">
		Look like you're lost
		</h3>
		
		<p>somthing went wrong! server error</p>
		
		<button className="link center" onClick={()=>navigate(-1)}>Try again</button>
	</div>

    </section>
  )
}

export default InternalError