import { useEffect, useState } from "react";
import "./style.scss";
import { headerIcons } from "../../assets/images/headerIcons";
import { icons } from "../../assets/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { cnfFrndReq, getNotificData } from "../../sclice/friendSlice";

export const NtficSection = ({ className, ...props }) => {
  const {notifiData}=useSelector(state=>{return state.userFriend})
  const dispatch=useDispatch();
  console.log(notifiData);
  useEffect(()=>{
    dispatch(getNotificData())
    console.log("hdfgs");
  },[])
    const [array,setArray]=useState(Array(5).fill(0))
  return (
    <section className="ntfic-section">
        <div className="head flex"><icons.bellIcon/> notification</div>

        <div className="cardSection ">{

      notifiData.map((item,indx)=>{

        return(
<div className="frnd-req-card" key={indx}>
        <div className="heading">
          <div className="heading-txt">friend request </div>
        </div>
        <div className="frnd-card">
          <img className="img" src={item.senderId.profile.profileImage} />
          <div className="content-box">
            <div className="name">{item.senderId.userName} </div>
            <div className="btn-section">
              <button className="cnf-btn">
                <div className="confirm" onClick={()=>dispatch(cnfFrndReq(item.senderId.userId))}>confirm </div>
              </button>
              <button className="cnsl-btn">
                <div className="confirm">cancel </div>
              </button>
            </div>
          </div>
        </div>
      </div>
        )
      })
   }
      </div>
    </section>
  );
};
