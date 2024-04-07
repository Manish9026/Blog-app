import { toast } from "react-toastify";

export const urlLoader=({statusCode,message,status})=>{
// alert({message,statusCode})
// toast(message)
// console.log(message,statusCode);
  
    if(status){
        toast.success(message)
    }
    else{
        toast.error(message)
    }

    if(statusCode==65){
        window.history.pushState({},"","/auth/sign-in")
        window.location.reload();
    }
   
}