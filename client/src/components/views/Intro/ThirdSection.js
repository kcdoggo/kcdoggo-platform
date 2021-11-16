import React from "react";
import { Col,Row } from "antd";


export default () => {
  
  document.body.style.overflow = "hidden"

  return (
    <div className="Icomponent Ithird-component" >
      <div className="font-link">
     <div className="main_text">
     
    
      <div>CdoGGo 플랫폼에서 원하는 가격에 판매하세요 </div>
     
      <div>혼자 진행하는 중고거래보다 간편합니다 !</div>
      </div></div>
      <div className="font-link-two">

      <Row justify="center">
      <div className="con-wrap">
      <Col xl={8} md={12} xs={24} >
        <div className="container one">

        <div style={{fontWeight:900}}>상품등록</div>
          <br/>
          회원가입 완료후, 판매할 전자기기를 업로드합니다. 상품명,
          상품이미지, 가격, 설명을 
          기재해주시면 상품등록 완료!
        </div>
        </Col>

        <Col xl={8} md={12} xs={24} >
        <div className="container two">
          <div style={{fontWeight:900}}>배송</div>
          <br/>
          상품 등록이 완료되시면,
          택배기사가 방문하여, 
          상품을 픽업해갑니다!
          상품을 검수하여, 기재하신
          내용과 동일한지 
          확인이 진행됩니다
          </div>
        </Col>

        <Col xl={8} md={12} s={24} xs={24} >
        <div className="container three">
        <div style={{fontWeight:900}}>대금지급</div>
          <br/>
          거래가 완료되면,
          계좌번호로 대금이 
          송금됩니다.
          </div>
          </Col>

          </div>
          
          </Row>

      </div>
      
     
      <button className="btn_third" >
          <a href="/landing"> CDOGGO 바로가기</a>
      </button>
      </div>
    
  );
};
