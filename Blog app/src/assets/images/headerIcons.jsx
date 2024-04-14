
import user from './user.png'
import fr from './friend.png'
import hm from './home.png'
import ms from './message.png';
import bk from './bookmark.png'
import hs from './histor.png'
import cmt from './comment.png'
import google from './google.png'
import fb from './facebook.png'
import githup from './github.png'
import gmail from './gmail.png'
import logout from './logout.png'
import notFound from './no-results.png'
import more from './more.png'
import more1 from './more1.png'
import avtar from './avtar.jpeg'
import pro from './planning.png'
import like from './thumb-up.png'
export const headerIcons={
    userIcons: user,
    friendIcon:fr,
    homeIcon:hm,
    message:ms,
    githup,
    fb,
    google,
    gmail,
    notFound,
    like,
    more,
    more1,
    logout,
    avtar,
    pro
    



}
// const navLinks=[
//     "/",
//     "/friends","saved-story","/user/message","/user/comments","history"
//   ]


  import { AiFillHome } from "react-icons/ai";
  import { FaUserFriends } from "react-icons/fa";
  import { SiGooglemessages } from "react-icons/si";
  import { MdOutlineHistory } from "react-icons/md";
  import { FaBookmark } from "react-icons/fa";
  import { FaComments } from "react-icons/fa6";
  import { MdOutlineAdd } from "react-icons/md";
  import { FaUser } from "react-icons/fa6";

export const navTitle=[
    [ <AiFillHome />,"Home","/"],[<FaUser />,"profile","/user/profile"],[  <FaUserFriends />,"friends","/friends"],[ <MdOutlineAdd />,"new Blog","/create/blog"],[<FaBookmark />,"saved Story","/saved-story"],[ <SiGooglemessages />,"messages","/user/message"],[<FaComments />," your comments","/user/comments"],[  <MdOutlineHistory />,"history","/history"]
]