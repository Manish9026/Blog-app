import React from 'react'
import { url } from '../../tools/serverURL'

const Home = () => {
  console.log(import.meta.env.VITE_BASE_URL)
  return (
    <div className='containe'> <div> forntent run this port {import.meta.env.VITE_BASE_URL}</div>
    <br/>
    <button> <a href="/login">login</a></button>
    <button><a href="/register">register</a> </button>
    
    </div>
  )
}

export default Home