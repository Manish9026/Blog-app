import React, { useEffect, useState } from 'react'

const useWindowWidth = () => {
  const [width,setWidth]=useState();

  useEffect(()=>{
setWidth(window.innerWidth)
  },[window.innerWidth])


  return width
}

export default useWindowWidth