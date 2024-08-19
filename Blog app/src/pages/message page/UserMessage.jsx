import React, { useState, useEffect } from 'react'
import './style.scss'
import { IoFilter, IoSearch } from 'react-icons/io5'
import { FaArrowLeft, FaBackspace, FaBackward, FaSearch } from 'react-icons/fa'
import { IoCall, IoSend } from 'react-icons/io5'
import { MdOutlineSearch, MdVideoCall } from 'react-icons/md'
import { FaRegSmile } from "react-icons/fa";
import { MdCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux'
import { setMsgPage } from '../../sclice/userMessageSlice'
const UserMessage = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        window.addEventListener("resize", widthHandler)
        widthHandler()
        return () => {
            window.removeEventListener("resize", widthHandler)
        }
    }, [])
    const widthHandler = () => {
        dispatch(setMsgPage(0))
    }




    const MessageBody = () => {
        const { isVisible } = useSelector(state => { return state.userMessage.msgPage })
        // const dispatch=useDispatch();

        return (
            <div className="message-body" style={isVisible ? { left: 0 } : { left: "-1000px" }} >
                <div className="msg-head">
                    <span className='md-icons backIcon' onClick={() => dispatch(setMsgPage(0))}>
                        <FaArrowLeft />
                    </span>
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
                        Array(10).fill(null).map((_, index) => {
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
        // const dispatch=useDispatch();
        const [card, setCard] = useState({
            isActive: false
        })
        return (
            <div className="user-card" onClick={() => dispatch(setMsgPage(1))}>
                <span className="card-img">

                    <img src="https://res.cloudinary.com/dztzqqiex/image/upload/v1723892977/jlaim9otbhxkjbmpsamm.jpg" alt="" />
                </span>
                <span className="content">
                    <p>userName</p>
                    <p>last message</p>
                    <p>last 2dago</p>
                </span>
            </div>
        )
    }
    return (
        <section className="message-section">
            <MessageTop />
            <MessageBody />
        </section>
    )
}



export default UserMessage