import React from 'react'
import "./style.scss"
import { useDispatch, useSelector } from 'react-redux'
import { popupHandler } from '../../sclice/globalSlice'
import { headerIcons } from '../../assets/images/headerIcons'
const Popup = ({isActive}) => {
  const {popupStatus}=useSelector(state=>state.global)
  const dispatch=useDispatch();

  return (

    <div className="p-container" style={popupStatus.isActive?{display:"flex"}:{display:"none"}}>
      
  <div className="cookiesContent" id="cookiesPopup">
    <button className="close" onClick={()=>dispatch(popupHandler())}>✖</button>
    <img src={headerIcons.pro} alt="cookies-img" />
    <p>{popupStatus.message}</p>
    <button className="accept" onClick={()=>dispatch(popupHandler())}>Back now </button>
  </div>
</div>

  )
}

export default Popup