import React from "react";
import questioning from "./questioning.png"

export default () => {

  document.body.style.overflow = "hidden"
  document.body.style.width = "100%";
document.body.style.height = "100%";

  return (
    <div className="Icomponent Isecond-component" >
      <div className="font-link" style={{color:'black'}}>
    
       <div className="main-text1">
          <div>핸드폰을 팔려고 보니</div>
          <div>100만원에 산 내 핸드폰이</div>
          <div style={{color:'white'}}>20만원대로 ?</div>
       </div>
     
       <img src={questioning} className="questionBox"/>

      </div>
    </div>
  );
};
