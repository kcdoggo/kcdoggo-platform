import React from "react";
import Typewriter from 'typewriter-effect';

export default () => {
   
  document.body.style.overflow = "hidden"
document.body.style.width = "100%";
document.body.style.height = "100%";

  return (
    <div className="Icomponent Ifirst-component">
        <div className="font-link"style={{fontSize:'3rem',color:'black', textAlign:'center',
        display:'flex',alignItems:'center',justifyContent:'center',width:'100vw',height:'100vh',marginTop:'-20px'}}>
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


