import React, { useRef, useState } from 'react'
import { BiSolidSchool, BiSolidUpArrow } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdOutlineModeEdit, MdPersonPinCircle } from 'react-icons/md';
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
// import { aboutTitle } from '../../assets/react-icons';
import { FaUserGraduate } from "react-icons/fa";
import { GiSecretBook } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { PiHouseLineFill } from "react-icons/pi";
import { RiEditBoxLine } from "react-icons/ri";
import {useDispatch,useSelector} from 'react-redux'
import { useEffect } from 'react';
import { isVerified } from '../../sclice/authSlice/authSlice';
import { getUserProfile, resetBoxStatus, setBoxStatus, updateProfile } from '../../sclice/userProfileSlice';
import ProLoder from './loader/ProLoder';
import { popupHandler } from '../../sclice/globalSlice';
import Loder from '../../component/loader/Loder';

const show = (e) => {
   


        const node = e.parentNode;
        if (node.className == "f-container") {
        
    
            const show = node.childNodes[0]
            const hide = node.childNodes[1]
    
            show.style.display = "none";
            hide.style.display = "flex";
           
    
            // console.log(node);
            return node
        }
       return show(node)
    }
  


const hide = (e) => {
    const node = e.parentNode;
    if (node.className == "f-container") {
        console.log(node.childNodes);

        const show = node.childNodes[0]
        const hide = node.childNodes[1]

        show.style.display = "flex";
        hide.style.display = "none";
       
        return node
    }
   return hide(node)
}

const UserAbout = () => {
    const title = [["Add bio", "",<GiSecretBook/>], ["Personal detail", "personal-detail",<FaUser/>], ["Education and work", "education-and-work",<FaUserGraduate/>], ["Family details", "family-detail",<PiHouseLineFill/>], ["Detail about you ", "about-self",<RiEditBoxLine/>]]




    return (
        <section className="about-section open-sans">
            <div className="title-section">
                <div className="heading"><h5>About</h5></div>
                {/* <FaUserGraduate /> */}
                <div className='title-body'>
                    {

                        title.map((title, indx) => {
                            return (
                                <NavLink to={title[1]} key={indx} className='title-header' end>
                                    <i className='icon'>
                                        {title[2]}
                                    </i>
                                    <h5>{title[0]}</h5>
                                </NavLink>
                            )
                        })
                    }
                </div>



            </div>
            <span className="form-section">
                <Outlet />
            </span>


        </section>
    )
}

export const BioForm = ({ title }) => {
    const {data}=useSelector(state=>{return state.userProfile})
    const dispatch=useDispatch();
    return (
        <div className='F-section open-sans' >
            <h4>Add bio</h4>
            <div className="f-container">



                <label htmlFor="2">
                    Add short story of your life
                </label>

                <textarea name="" id="2" className="field" placeholder='Enter here' ></textarea>



                <div className="btn">
                    <button>submit</button>
                    <button>cancel</button>
                </div>


            </div>

        </div>
    )
}

export const PersonalForm = (e) => {
  
    const {data,loading}=useSelector(state=>{return state.userProfile})
    const [fieldValue,setFieldValue]=useState("");
    const dispatch=useDispatch();
    let ref=useRef(null);
    
    
    useEffect(()=>{

        // console.log(loading);
        //  dispatch(getUserProfile("personal"))
    },[])
    const inputHandler=(e)=>{
        // if(e.target.name=="DOB"){

        //     const DOB=new Date(e.target.value)
        //     console.log(DOB);
        // setFieldValue({[e.target.name]:DOB})


        // }else{

        
        console.log(e.target.value);
        setFieldValue({[e.target.name]:e.target.value})
        // }
    }
    const updateHandler=async(e)=>{
if(!fieldValue){
    dispatch(popupHandler("No changes track in input field"))
    return
}

        await dispatch(updateProfile({type:"personal",field:fieldValue}))
       hide(e);
       ref.current=null;
        console.log(ref);
    }


    const editHandler=(e)=>{
          
    //    setFieldValue(e.target.value)
    console.log(e.target.closest(".inField"));
        if(ref.current){

          dispatch(popupHandler("First save new record"))
        }else{
            e.stopPropagation(); 
            ref.current=show(e.currentTarget);
        }
       
    }

    const cancelHandler=(e)=>{
        e.stopPropagation();
        hide(e.currentTarget)
        ref.current=null;
    }

    if(data.length!=0){
        let [dob,setDOB]=useState( new Date(data.profile.personal.DOB));
    return (

        <section className='presonal-section'>
            <div className="heading"><h5>Personal Detail </h5></div>

            <div className="f-section">
                <div className="f-container">

                    <div className="form-show " >
                        <span className="logo-icon ">
                            <MdPersonPinCircle />
                        </span>
                        <span className="name"><p>{data?data.userName:"Manish"}</p>
                            <p>name</p></span>
                        <button className="icon" onClick={(e) => {editHandler(e) ;}}>

                            <MdOutlineModeEdit />
                        </button>
                    </div>

                    <div className="form-hide">

                    {
                      loading ?<ProLoder/>:""
                        }
                        <input type="text" name="userName" id="" defaultValue={data.userName} onChange={(e)=>{inputHandler(e)}} className='inField' placeholder=' userName' />
                        <div className="btn">
                            <button onClick={(e)=>updateHandler(e.target)} >save</button>
                            <button onClick={(e) => {cancelHandler(e) }}>cancel</button>
                        </div>
                    </div>

                </div>

                <div className="f-container">

                    <div className="form-show " >
                        
                        <span className="logo-icon ">
                            <MdPersonPinCircle />
                        </span>
                        <span className="name"><p>{data.profile.personal.gender || "none"}</p>
                            <p>gender</p></span>
                        <button className="icon" onClick={(e) => {{editHandler(e) } }}>

                            <MdOutlineModeEdit />
                        </button>
                    </div>

                    <div className="form-hide">
                       {
                      loading ?<ProLoder/>:""
                        }
                    
                        <select className='inField' defaultValue={data.profile.personal.gender} name='gender' onChange={(e)=>inputHandler(e)}>
                            <option value="male" style={{display:"none"}} >male</option>
                            <option value="male"  >male</option>

                            <option value="female">female</option>
                            <option value="other">other</option>

                        </select>
                        <div className="btn">
                            <button onClick={(e)=>updateHandler(e.target)}>save</button>
                            <button onClick={(e) => {cancelHandler(e) }}>cancel</button>
                        </div>
                    </div>

                </div>

                <div className="f-container">

                    <div className="form-show " >
                        <span className="logo-icon ">
                            <MdPersonPinCircle />
                        </span>
                        <span className="name"><p>{data.userEmail || "email "}</p>
                            <p>Email</p></span>
                        <button className="icon" onClick={(e) => {{editHandler(e) } }}>

                            <MdOutlineModeEdit />
                        </button>
                    </div>

                    <div className="form-hide">

                   {
                      loading ?<ProLoder/>:""
                        }
                        <input type="text" name="userEmail" id="" defaultValue={data.userEmail} onChange={(e)=>inputHandler(e)}className='inField' placeholder='Email' />
                        <div className="btn">
                            <button onClick={(e)=>updateHandler(e.target)}>save</button>
                            <button onClick={(e) => { cancelHandler(e)}}>cancel</button>
                        </div>
                    </div>

                </div>

                <div className="f-container">

                    <div className="form-show " >
                        <span className="logo-icon ">
                            <MdPersonPinCircle />
                        </span>
                        <span className="name"><p>{data.profile.personal.phoneNumber || 0}</p>
                            <p>phone no</p></span>
                        <button className="icon" onClick={(e) => { {editHandler(e) } }}>

                            <MdOutlineModeEdit />
                        </button>
                    </div>

                    <div className="form-hide">
                   {
                      loading ?<ProLoder/>:""
                        }
                        <input type="number" name="phoneNumber" id="" defaultValue={data.profile.personal.phoneNumber} className='inField' onChange={(e)=>inputHandler(e)} placeholder='Contact No.' />
                        <div className="btn">
                            <button onClick={(e)=>updateHandler(e.target)}>save</button>
                            <button onClick={(e) => { cancelHandler(e) }}>cancel</button>
                        </div>
                    </div>

                </div>
                <div className="f-container">

                    <div className="form-show " >
                        <span className="logo-icon ">
                            <MdPersonPinCircle />
                        </span>
                        <span className="name"><p>{dob.toLocaleDateString('en-GB') || "24Nov 2002"}</p>
                            <p>DOB</p></span>
                        <button className="icon" onClick={(e) => {editHandler(e) } }>

                            <MdOutlineModeEdit />
                        </button>
                    </div>

                    <div className="form-hide">
                        {/* <label htmlFor="12">
                        <input type="text" id='12' defaultValue={dob.toLocaleDateString()} className='inField'/>
                        </label> */}
                        {
                      loading ?<ProLoder/>:""
                        }
                        <input type="date" name="DOB" onChange={(e)=>inputHandler(e)} width={"40px"} defaultValue={dob.toLocaleDateString()} id="12" className='inField' placeholder='Contact No.' />
                        <div className="btn">
                            <button onClick={(e)=>updateHandler(e.target)}>save</button>
                            <button onClick={(e) => { cancelHandler(e) }}>cancel</button>
                        </div>
                    </div>

                </div>
            </div>

        </section>

    )}
    else{
        return(<ProLoder/>)
    }
}

export const UserEdu = () => {


    return (<section className="education-section">
        <div className="heading"><h5>Education and work</h5></div>
        <div className="f-section">

            <div className="edu1">
                <div className="sub-heading">school</div>
                <div className="f-container">

                    <div className="form-show column-flex  " >
                        <div className="add-section row-flex" onClick={(e) => { e.stopPropagation(); show(e.currentTarget) }}>
                            <span className="logo-icon ">
                                <IoMdAddCircleOutline />
                            </span>
                            <span className="name"><p>Add School</p>
                            </span>
                            
                        </div>

                        <div className="display-section hide ">
                            <div className="dis-container row-flex">



                                <span className="icon">
                                    <BiSolidSchool />
                                </span>
                                <span className="name"><p>school name</p>
                                    <p>school</p></span>

                                <div className="dot-icon">
                                    <BsThreeDots className='dot' />


                                </div>
                                <span className='menu hide'>
                                    <PopupMenu />
                                </span>
                            </div>
                        </div>

                    </div>

                    <div className="form-hide">
                        <input type="text" name="school" id="" className='inField' placeholder='Enter your school name ' required />

                        <textarea className='textArea' placeholder='about school life' ></textarea>
                        <div className="btn">
                            <button >save</button>
                            <button onClick={(e) => { e.stopPropagation(); console.log(e); hide(e.currentTarget) }}>cancel</button>
                        </div>
                    </div>

                </div>


            </div>
            <div className="edu2">
                <div className="sub-heading">college</div>
                <div className="f-container">

                    <div className="form-show column-flex  " onClick={(e) => { e.stopPropagation(); show(e.currentTarget) }} >
                        <div className="add-section row-flex">
                            <span className="logo-icon ">
                                <IoMdAddCircleOutline />
                            </span>
                            <span className="name"><p>Add college</p>
                            </span>
                            
                        </div>

                        <div className="display-section hide ">
                            <div className="dis-container row-flex">



                                <span className="icon">
                                    <BiSolidSchool />
                                </span>
                                <span className="name"><p>school name</p>
                                    <p>school</p></span>

                                <div className="dot-icon">
                                    <BsThreeDots className='dot' />


                                </div>
                                <span className='menu hide'>
                                    <PopupMenu />
                                </span>
                            </div>
                        </div>

                    </div>

                    <div className="form-hide">
                        <div className="coll-type row-flex">
                            <label htmlFor="bachelor" className='row-flex'>
                                <input type="radio" id='bachelor' name='degree' defaultChecked /> 
                            <span class="checkmark">
                            <p className='point'></p>
                            </span>
                               <p>bachelor</p> </label>
                            <label htmlFor="master" className='row-flex'><input type="radio" name='degree' id='master' />
                                <span class="checkmark"><p className='point'></p></span>
                                <p>master</p></label>
                        </div>

                        <input type="text" name="school" id="" className='inField' placeholder='Enter your college name ' required />

                        <textarea className='textArea' placeholder='about college life' ></textarea>
                        <div className="btn">
                            <button >save</button>
                            <button onClick={(e) => { e.stopPropagation(); console.log(e); hide(e.currentTarget) }}>cancel</button>
                        </div>
                    </div>

                </div>


            </div>

            <div className="edu3">
                <div className="sub-heading">work place</div>
                <div className="f-container">

                    <div className="form-show column-flex  " onClick={(e) => { e.stopPropagation(); show(e.currentTarget) }} >
                        <div className="add-section row-flex">
                            <span className="logo-icon ">
                                <IoMdAddCircleOutline />
                            </span>
                            <span className="name"><p>Add work place</p>
                            </span>
                            
                        </div>

                        <div className="display-section hide ">
                            <div className="dis-container row-flex">



                                <span className="icon">
                                    <BiSolidSchool />
                                </span>
                                <span className="name"><p>school name</p>
                                    <p>school</p></span>

                                <div className="dot-icon">
                                    <BsThreeDots className='dot' />


                                </div>
                                <span className='menu hide'>
                                    <PopupMenu />
                                </span>
                            </div>
                        </div>

                    </div>

                    <div className="form-hide">
                      

                        <input type="text" name="cmp_name" id="" className='inField' placeholder='Company name ' required />
                        <input type="text" name="cmp_pos" id="" className='inField' placeholder='Position' required />
                        <input type="text" name="cmp_area" id="" className='inField' placeholder='City/Town' required />
                        <textarea className='textArea' placeholder='about comany expreance' name='cmp_discrip' ></textarea>
                        <div className="btn">
                            <button >save</button>
                            <button onClick={(e) => { e.stopPropagation(); console.log(e); hide(e.currentTarget) }}>cancel</button>
                        </div>
                    </div>

                </div>


            </div>



        </div>

    </section>)
}

const PopupMenu = () => {
    return (
        <div className="pop-menu column-flex">
            <svg
                class="arrow-icon"

                //   viewBox="0 0 3 18"
                //   fill="none"
                width={"100%"}
                height={"100%"}
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M11.2227 0.518233C11.5549 0.296715 12 0.534911 12 0.934259V8H0L11.2227 0.518233Z"
                    fill="#D9D9D9"
                //   width="22"
                //   height="18"

                />
            </svg>
            <div className="menu-container column-flex">
                <div className="m-title">
                    <div className="icon"></div>
                    <h6></h6>
                </div>
            </div>
        </div>

    )
}
export default UserAbout