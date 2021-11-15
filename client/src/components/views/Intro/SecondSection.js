import React from "react";
import questionBox from "./question.png";
import perplexed from "./perplexed.png";

export default () => {

  document.body.style.overflow = "hidden"
   /* <img src={questionBox}>
         <div>기능차감, 구성품 차감</div>
         <div>액정차감, 외관 차감</div>
         <div>왜 이렇게 차감이 많아?</div>
       </img>
       
       <img src={perplexed}/>
       
       */

  return (
    <div className="component second-component" >
      <div className="font-link" style={{color:'black'}}>
    
       <div className="main-text1">
          <div>핸드폰을 팔려고 보니</div>
          <div>100만원에 산 내 핸드폰이</div>
          <div style={{color:'white'}}>20만원대로 ?</div>
       </div>
      <div> 
       <div>
       <img src={questionBox}/>
         <div>기능차감, 구성품 차감</div>
         <div>액정차감, 외관 차감</div>
         <div>왜 이렇게 차감이 많아?</div>
       </div>
       
       
       <img src={perplexed} className="perplexed"/>
    </div>


      </div>
    </div>
  );
};
