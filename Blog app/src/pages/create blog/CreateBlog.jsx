import React from 'react'
import  './createBlog.scss'
import { bg, uploadBg } from '../../assets/backgroundImg/background'
const CreateBlog = () => {
  return (
    <div
  className="ct-blog-container"
  style={{
    background: `url(${bg}) center`,
    backgroundSize: "cover",
    backgrounRepeat: "no-repeat",
  }}
>
  <div className="ct-heading">
    <div className="ct-txt">create own blog</div>
  </div>
  <div className="ct-form">
    <label 
      className="ct-img"
      style={{
        background: `url(${uploadBg}) center`,
        backgroundSize: "cover",
        backgrounRepeat: "no-repeat",
      }}
      htmlFor='ctfile'
    >
      <input type="file" id='ctfile' style={{display:"none"}}/>

      <div   className="ct-blur">
        <div className="ct-img-txt">upload bolg image</div>
      </div>
    </label>
    <form className="ct-in-section">
      <div className="ct-in-field">
        <input className="title" type='text' placeholder="title" />
      </div>
      <div className="ct-in-field">
        <input className="blog-type"  type='text' placeholder="blog type" />
      </div>
      <div className="ct-content-field">
        <textarea className="ct-content-txt" type='text' placeholder="Create your blog" />
      </div>
      <div className="ct-btn-section">
        <button className="sub-btn">
          <p className="txt">submit</p>
        </button>
      </div>
    </form>
  </div>
</div>

  )
}

export default CreateBlog