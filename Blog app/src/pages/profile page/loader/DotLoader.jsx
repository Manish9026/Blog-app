// import { set } from 'mongoose'
import React, { useEffect, useState } from 'react'
// import './style.scss'
const DotLoader = ({style,loader_Style,dot_Color,dot_ShadowColor,dot_Style}) => {
  const [loaderStyle,setLoaderStyle]=useState({
    backgroundColor:"#d5d0d083",
    display:"flex",
    justifyContent:"center",
    alignItem:"center",
    position:"absolute",
    height:"100%",
    flex:"1"
  })


  const [dotStyle,setDotStyle]=useState({
    width: "10px",
    aspectRatio: 1,
    borderRadius: "50%",
    animation: "l5 1s infinite linear alternate"
  })
  const [dotShadowColor,setDotShadowColor]=useState("rgba(59, 57, 57, 0.133)")
  const [dotBgColor,setDotBgcolor]=useState("rgb(51, 51, 133)")
useEffect(()=>{
if(dot_Style){
  setDotStyle(prev=>({...prev,...dot_Style}))
}
if(loader_Style){
  setLoaderStyle(prev=>({...prev,...loader_Style}))
}
if(dot_Color){
  setDotBgcolor(dot_Color)
}
if(dot_ShadowColor){
  setDotShadowColor(dot_ShadowColor)
}
},[loader_Style,dot_Color,dot_ShadowColor,dot_Style])
  return (
    <section className={`dot-loader `} style={loaderStyle}>
      <style>{`
      @keyframes l5 {

0%  {box-shadow: 20px 0 ${dotBgColor}, -20px 0 ${dotShadowColor};background: ${dotBgColor} }
33% {box-shadow: 20px 0 ${dotBgColor}, -20px 0 ${dotShadowColor};background: ${dotShadowColor}}
66% {box-shadow: 20px 0 ${dotShadowColor},-20px 0 ${dotBgColor}; background: ${dotShadowColor}}
100%{box-shadow: 20px 0 ${dotShadowColor},-20px 0 ${dotBgColor}; background: ${dotBgColor} }
};`}
      </style>

        <div className="loader" style={dotStyle}></div>
    </section>
  )
}

export default DotLoader