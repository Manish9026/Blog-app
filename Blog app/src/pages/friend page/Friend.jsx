import React from 'react'

import './friend.scss'
const Friend = () => {
  return (
    <div className="friend-section">
    <div className="fd-container">
      <div className="fd-section">
        <div className="save-fd-heading">
          <div className="your-friends">your friends</div>
        </div>
        <div className="save-fd-container">
          <div className="save-fd">
            <div className="save-fd-img">
              <img className="manish-img-1" src="manish-img-10.png" />
            </div>
            <div className="save-fd-txt">
              <div className="save-fd-name">manish maurya</div>
              <div className="save-fd-t">24 friends</div>
            </div>
          </div>
        </div>
      </div>
      <div className="fd-res-seciton">
        <div className="fd-req-heading">
          <div className="friend-requests">friend requests</div>
        </div>
        <div className="fd-req-container">
          <div className="fd-req-card">
            <div className="req-card-img">
              <img className="fd-img" src="fd-img0.png" />
            </div>
            <div className="fd-content-part">
              <div className="fd-req-name">
                <div className="name">manish maurya</div>
              </div>
              <div className="confirm-btn">
                <div className="confirm">confirm</div>
              </div>
              <div className="remove-btn">
                <div className="remove">remove</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="suj-fd-section">
        <div className="heading">
          <div className="people-you-may-know">People you may know</div>
        </div>
        <div className="sug-fd-container">
          <div className="frame-139">
            <div className="frame-140">
              <img className="manish-img-12" src="manish-img-11.png" />
            </div>
            <div className="frame-141">
              <div className="frame-149">
                <div className="manish-maurya">manish maurya</div>
              </div>
              <div className="frame-142">
                <div className="confirm">confirm</div>
              </div>
              <div className="frame-1422">
                <div className="remove">remove</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  )
}

export default Friend