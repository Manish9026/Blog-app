import { useState } from 'react'
import './searchBar.css'
import { BiSearch } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux';
import { headerIcons } from '../../assets/images/headerIcons';
import { getSrhRes } from '../../sclice/searchSlice';
import { Link } from 'react-router-dom';
import { setSrhValue } from '../../sclice/globalSlice';
const SearchBar = ({style}) => {
const [srhData,setSrhData]=useState("");
const dispatch=useDispatch();

  // console.log(style);
  const SrchResComponent=()=>{
    const {status,data}=useSelector(state=>{return state.searchUser})
    return(
      <div className="srh-section" >
        {
          status?
        
          
            data.map((item,indx)=>{
              return (  
                <Link to={`/single-friend?uid=${item.userId}`} className="srh-container " onClick={()=>dispatch(setSrhValue(item.userId))} key={item.userId}>
                  <BiSearch className="srh-icon"/>
              {/* <img className="srh-icon" src="srh-icon0.svg" /> */}
              <div className="srh-text">
                <div className="save-fd-name">{item.userName}</div>
                <div className="save-fd-t">24 friends</div>
              </div>
              <div className="srh-img">
                <img className="manish-img-1" src={item.profile.profileImage} />
              </div>
            </Link>)
            })

          
     :
      <div className="srh-not-fnd">
        <img className="srh-nft-icon" src={headerIcons.notFound} />
        <div className="not-record-founded">not record founded</div>
      </div>
      }
    </div>
    )
  }
  return (
    <section className='search-section' style={style?{transform:"translatey(0px)"}:{transform:"translatey(-180px)"}}>
      
    <form onSubmit={(e)=>e.preventDefault()} role="search" className="form"  >
   
   <div className="row-flex srh"><input type="search" name="" id="" value={srhData} placeholder='Search friends' onChange={(e)=>{setSrhData(e.target.value); dispatch(getSrhRes(e.target.value))}} />
   <button onClick={()=>{console.log(srhData); dispatch(getSrhRes(srhData))}} ><BiSearch className='icon'/></button>
   </div>

{
  srhData?
  <SrchResComponent/>:""
  }

  </form>
 
</section>

  )
}

export default SearchBar