import React from 'react'
import { BiSolidSchool, BiSolidUpArrow } from 'react-icons/bi';
import { BsThreeDots } from 'react-icons/bs';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdOutlineModeEdit, MdPersonPinCircle } from 'react-icons/md';
import { Link, Outlet, useLocation } from "react-router-dom";
// import { aboutTitle } from '../../assets/react-icons';
import { FaUserGraduate } from "react-icons/fa";
import { GiSecretBook } from "react-icons/gi";
import { FaUser } from "react-icons/fa";
import { PiHouseLineFill } from "react-icons/pi";
import { RiEditBoxLine } from "react-icons/ri";
const show = (e) => {
    const node = e.parentNode;
    if (node.className == "f-container") {
        console.log(node.childNodes);

        const show = node.childNodes[0]
        const hide = node.childNodes[1]

        show.style.display = "none";
        hide.style.display = "flex";

        return
    }
    show(node)

}
const hide = (e) => {
    const node = e.parentNode;
    if (node.className == "f-container") {
        console.log(node.childNodes);

        const show = node.childNodes[0]
        const hide = node.childNodes[1]

        show.style.display = "flex";
        hide.style.display = "none";

        return
    }
    hide(node)
}

const UserAbout = () => {
    const title = [["Add bio", "",<GiSecretBook/>], ["Personal detail", "personal-detail",<FaUser/>], ["Education and work", "education-and-work",<FaUserGraduate/>], ["Family details", "",<PiHouseLineFill/>], ["Detail about you ", "",<RiEditBoxLine/>]]




    return (
        <section className="about-section open-sans">
            <div className="title-section">
                <div className="heading"><h5>About</h5></div>
                {/* <FaUserGraduate /> */}
                <div className='title-body'>
                    {

                        title.map((title, indx) => {
                            return (
                                <Link to={title[1]} key={indx} className='title-header'>
                                    <i className='icon'>
                                        {title[2]}
                                    </i>
                                    <h5>{title[0]}</h5>
                                </Link>
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


    return (

        <section className='presonal-section'>
            <div className="heading"><h5>Personal Detail </h5></div>

            <div className="f-section">
                <div className="f-container">

                    <div className="form-show " >
                        <span className="logo-icon ">
                            <MdPersonPinCircle />
                        </span>
                        <span className="name"><p>Manish</p>
                            <p>name</p></span>
                        <button className="icon" onClick={(e) => { e.stopPropagation(); show(e.currentTarget) }}>

                            <MdOutlineModeEdit />
                        </button>
                    </div>

                    <div className="form-hide">
                        <input type="text" name="userName" id="" className='inField' placeholder=' userName' />
                        <div className="btn">
                            <button >save</button>
                            <button onClick={(e) => { e.stopPropagation(); console.log(e); hide(e.currentTarget) }}>cancel</button>
                        </div>
                    </div>

                </div>

                <div className="f-container">

                    <div className="form-show " >
                        <span className="logo-icon ">
                            <MdPersonPinCircle />
                        </span>
                        <span className="name"><p>user</p>
                            <p>gender</p></span>
                        <button className="icon" onClick={(e) => { e.stopPropagation(); show(e.currentTarget) }}>

                            <MdOutlineModeEdit />
                        </button>
                    </div>

                    <div className="form-hide">
                        <select className='inField'>
                            <option value="male">male</option>
                            <option value="female">female</option>
                            <option value="other">other</option>

                        </select>
                        <div className="btn">
                            <button >save</button>
                            <button onClick={(e) => { e.stopPropagation(); console.log(e); hide(e.currentTarget) }}>cancel</button>
                        </div>
                    </div>

                </div>

                <div className="f-container">

                    <div className="form-show " >
                        <span className="logo-icon ">
                            <MdPersonPinCircle />
                        </span>
                        <span className="name"><p>Manish@gmail.com</p>
                            <p>Email</p></span>
                        <button className="icon" onClick={(e) => { e.stopPropagation(); show(e.currentTarget) }}>

                            <MdOutlineModeEdit />
                        </button>
                    </div>

                    <div className="form-hide">
                        <input type="text" name="userName" id="" className='inField' placeholder='Email' />
                        <div className="btn">
                            <button >save</button>
                            <button onClick={(e) => { e.stopPropagation(); console.log(e); hide(e.currentTarget) }}>cancel</button>
                        </div>
                    </div>

                </div>

                <div className="f-container">

                    <div className="form-show " >
                        <span className="logo-icon ">
                            <MdPersonPinCircle />
                        </span>
                        <span className="name"><p>91+ 9026123956</p>
                            <p>phone no</p></span>
                        <button className="icon" onClick={(e) => { e.stopPropagation(); show(e.currentTarget) }}>

                            <MdOutlineModeEdit />
                        </button>
                    </div>

                    <div className="form-hide">
                        <input type="number" name="userName" id="" className='inField' placeholder='Contact No.' />
                        <div className="btn">
                            <button >save</button>
                            <button onClick={(e) => { e.stopPropagation(); console.log(e); hide(e.currentTarget) }}>cancel</button>
                        </div>
                    </div>

                </div>
                <div className="f-container">

                    <div className="form-show " >
                        <span className="logo-icon ">
                            <MdPersonPinCircle />
                        </span>
                        <span className="name"><p>24Nov 2002</p>
                            <p>DOB</p></span>
                        <button className="icon" onClick={(e) => { e.stopPropagation(); show(e.currentTarget) }}>

                            <MdOutlineModeEdit />
                        </button>
                    </div>

                    <div className="form-hide">
                        <input type="date" name="userName" id="" className='inField' placeholder='Contact No.' />
                        <div className="btn">
                            <button >save</button>
                            <button onClick={(e) => { e.stopPropagation(); console.log(e); hide(e.currentTarget) }}>cancel</button>
                        </div>
                    </div>

                </div>
            </div>

        </section>

    )
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