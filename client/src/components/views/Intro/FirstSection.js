import React from "react";
import Typewriter from 'typewriter-effect';

export default () => {
   
  document.body.style.overflow = "hidden"


  return (
    <div className="component first-component">
        <div className="font-link"style={{fontSize:'3rem',color:'black',
        display:'flex',alignItems:'center',justifyContent:'center',width:'100vw',height:'100vh',marginTop:'-20px',textAlign:'center'}}>
        <Typewriter
             options={{
                strings: ['CdoGGo에 오신걸 환영합니다','즐거운 쇼핑 되세요 !' ],
                autoStart: true,
                loop: true,
                deleteSpeed:'100'
            }}
/> 
    </div>   
   </div>
  );
};


