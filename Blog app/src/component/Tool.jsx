import React, { useState } from 'react'

const Tool = () => {
    const [image,setImage]=useState()

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      const reader = new FileReader();

      console.log(file);
      reader.onloadend = () => {
        console.log(reader);
          const base64String = reader.result;
          setImage(base64String);
          console.log("Base64 string:", base64String);
      };

      console.log(file);
      if (file) {
        // console.log(reader);
    reader.readAsDataURL(file)
      }

      const imageBuffer=(filePath)=>{
        const reader = new FileReader();
        reader.onloadend = () => {
          console.log(reader);
            const base64String = reader.result;
            setImage(base64String);
            console.log("Base64 string:", base64String);
        };

        
        reader.readAsDataURL(file)

      }
  };

  const onClickHandler=()=>{
    window.history.pushState({}, '', "hello");
      window.location.reload();

  }
    
  return (
    <div style={{margin:"100px"}}>
        <input type="file" name="" id="" onChange={(e)=>{
          handleFileChange(e);

          
            // console.log(e);
            // setImage(e.target.value)
        }} />

      {/* <button onClick={()=>onClickHandler()}> reload</button> */}


        <img src={image} alt="" />




    </div>
  )
}

export default Tool