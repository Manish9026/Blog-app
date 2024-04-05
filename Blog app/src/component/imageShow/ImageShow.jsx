import React from 'react'
import './style.scss'
import { useDispatch, useSelector } from 'react-redux'
import { IoCloseSharp } from 'react-icons/io5'
import { showImage} from '../../sclice/globalSlice'
const ImageShow = ({image}) => {
    const dispatch=useDispatch();
    const {imageShow}=useSelector(state=>state.global);
    console.log(imageShow);
  return (
    <section className='image-show-section row-flex' style={imageShow.toggle? {display:"flex"}:{display:"none"}}>

        <div className="image-container">
            <img src={imageShow && imageShow.img}alt="profile-image" />
            <button className='cross-icon' onClick={()=>{dispatch(showImage(""))}}>
    <IoCloseSharp className='icon'/>
  
</button>

        </div>
    </section>
  )
}

export default ImageShow