import React, { useState } from 'react'
import './style.scss'
import { IoFilter, IoSearch } from 'react-icons/io5'
import { FaSearch } from 'react-icons/fa'
import { IoCall, IoSend } from 'react-icons/io5'
import { MdOutlineSearch, MdVideoCall } from 'react-icons/md'
import { FaRegSmile } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
const UserMessage = () => {
    return (
        <section className="message-section">
            <MessageTop />
            <MessageBody/>
        </section>
    )
}

const MessageBody = () => {


    return (
        <div className="message-body">
            <div className="msg-head">

                <ul className="user-logo">
                    <li className='img'><img src="https://res.cloudinary.com/dztzqqiex/image/upload/v1723892977/jlaim9otbhxkjbmpsamm.jpg" alt="" /></li>
                    <li>
                        <p>userName</p>
                        <p>online</p>
                    </li>
                </ul>

                <ul className="msg-head-nav">

                    <li className='md-icons'><MdVideoCall /></li>
                    <li className='md-icons' md-icons><IoCall /></li>
                    <li className='md-icons'><MdOutlineSearch /></li>



                </ul>
            </div>
        <div className="msg-mid">
            messages
        </div>


            <div className="msg-bottom">
                <ul className="upload-btn">
                    <li className='md-icons'><FaRegSmile /></li>
                  <li className='md-icons'>   <MdCloudUpload /> </li>


                  
                </ul>
                <div className="input-field">
                    <input
                        className=""
                        placeholder="Type a message"
                    />
                    <span className='md-icons send'><IoSend /></span>
                    
                </div>
                <div className="frame-66"></div>
            </div>
        </div>
    )
}
const MessageTop = () => {
    const [search, setSearch] = useState({
        isActive: false,
        crossIsActive: false,
    })
    return (
        <div className="top-section">
            <div className="t-head">
                <h5 className='heading'>chat</h5>
                <span className="search">
                    <span className={"srh-field " + (search.isActive ? "srh-out" : "srh-in")} >
                        <input type="text" placeholder='search friends' />
                        <span className="md-icons srh-icon" onClick={() => setSearch(prev => ({ ...prev, isActive: !search.isActive }))}>
                            <IoSearch />
                        </span>
                    </span>

                    <span className="md-icons">
                        <IoFilter />
                    </span>
                </span>
            </div>

            <div className="t-body">
                {
                    Array(3).fill(null).map((_, index) => {
                        return (
                            <UserCard key={index} />
                        )
                    })
                }
            </div>
        </div>
    )
}

const UserCard = () => {
    const [card, setCard] = useState({
        isActive: false
    })
    return (
        <div className="user-card">
            <span className="card-img">

                <img src="https://res.cloudinary.com/dztzqqiex/image/upload/v1723892977/jlaim9otbhxkjbmpsamm.jpg" alt="" />
            </span>
            <span className="content">
                <p>userName</p>
                <p>last 2dago</p>
            </span>
        </div>
    )
}
export default UserMessage