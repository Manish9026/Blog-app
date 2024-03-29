export const imageBuffer=async (filePath)=>{
    // console.log(filePath);
    const reader = new FileReader();
    

    let imageUrl=0;
   reader.onloadend = () => {
    
        return reader.result;
    };
  
    console.log(reader.readAsDataURL(filePath));
    
    
    return  imageUrl
    
  
  }


