import React from 'react'
import './home.css'
import { icons } from '../../assets/react-icons'
const Home = () => {

  return (

    
    <div className="home-section">
      <div className="friend-stories">
        <div className="heading">
          <h3 className="friend-stories2">friend stories</h3>
        </div>
        <div className="stories-card-section">
          <div className="card-container">
            <div className="card-profile">
              <div className="ellipse-8"></div>
              <div className="friend-name">friendName</div>
            </div>
            <div className="card-content">
              <div className="card-footer">
                <icons.likeIcon className='icon'/>
                <icons.commentIcon className='icon'/> 
              </div>
            </div>
          </div>
          <div className="frame-120">
            <div className="frame-121">
              <div className="ellipse-8"></div>
              <div className="friend-name">friendName</div>
            </div>
            <div className="frame-122">
              <div className="frame-123">
                <img className="facebook-like" src="facebook-like0.png" />
                <img className="speech-bubble" src="speech-bubble0.png" />
              </div>
            </div>
          </div>
          <div className="frame-120">
            <div className="frame-121">
              <div className="ellipse-8"></div>
              <div className="friend-name">friendName</div>
            </div>
            <div className="frame-122">
              <div className="frame-123">
                <img className="facebook-like" src="facebook-like1.png" />
                <img className="speech-bubble" src="speech-bubble1.png" />
              </div>
            </div>
          </div>
          <div className="frame-120">
            <div className="frame-121">
              <div className="ellipse-8"></div>
              <div className="friend-name">friendName</div>
            </div>
            <div className="frame-122">
              <div className="frame-123">
                <img className="facebook-like" src="facebook-like2.png" />
                <img className="speech-bubble" src="speech-bubble2.png" />
              </div>
            </div>
          </div>
          <div className="frame-120">
            <div className="frame-121">
              <div className="ellipse-8"></div>
              <div className="friend-name">friendName</div>
            </div>
            <div className="frame-122">
              <div className="frame-123">
                <img className="facebook-like" src="facebook-like3.png" />
                <img className="speech-bubble" src="speech-bubble3.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="user-full-profile">
        <div className="hr-frofile">
          <div className="prthdj">
            <div className="user-icon">
              <img className="male-user" src="male-user2.png" />
            </div>
            <div className="user-narme">userNarme</div>
          </div>
          <div className="user-list">
            <div className="list">
              <img className="male-user" src="male-user3.png" />
            </div>
            <div className="list-user-icon"></div>
            <div className="ellipse-9"></div>
            <div className="ellipse-9"></div>
            <div className="ellipse-9"></div>
            <div className="ellipse-9"></div>
            <div className="btn-end">
              <div className="_10-more">10 more</div>
            </div>
          </div>
        </div>
        <div className="body-section">
          <div className="blog-img"></div>
          <div className="content-text">
            <div className="pragraph-text">sfgshdfg</div>
            <div className="footer-body">
             <icons.likeIcon className='icon'/>
             <icons.commentIcon className='icon'/>
             
            </div>
          </div>
        </div>
      </div>
    </div>



  )
}

export default Home