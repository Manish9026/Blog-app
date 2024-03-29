import React from 'react'
import './loder.css'
const Loder = () => {
  return (
    <div className='loader-c'>
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