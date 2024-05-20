import React from 'react'
import './loder.css'
const Loder = ({style}) => {
  return (
    <div className='loader-c' style={style && style}>
        <div className="ring-container">
            <span className='ring'></span>
            <span className='ring'></span>
            <span className='ring'></span>
            <p>loading...</p>
        </div>

    </div>
  )
}

export default Loder