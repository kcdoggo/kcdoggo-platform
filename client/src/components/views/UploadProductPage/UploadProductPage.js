import React, {useState} from 'react'
import { Typography,Form, Input, Button } from 'antd';
import FileUpload from '../../utils/FileUpload';
import axios from 'axios';
import {axiosInstance} from '../../herokuConfig'

import "./UploadProductPageStyle.css";


const {TextArea} = Input;
//option 태그 안에 들어가는 배열들...
const Products = [{key:1, value:'Samsung'},{key:2,value:'Apple'}, {key:3, value:'LG'}, {key:4, value:'Huawei'}, {key:5,value:'Nokia'},{key:6,value:'Motorola'},{key:7,value:'Sony'},{key:8,value:'Google'},{key:9,value:'게임기기(닌텐도,xbox등)'}]



function UploadProductPage(props) {
    
    
    const [Title, setTitle] = useState("");
    const [Description, setDescription] = useState("");
    const [Price, setPrice] = useState("");
    const [Product, setProduct] = useState(1) //option태그를 설정했을때 관리하는 Product의 state.
    const [Images, setImages] = useState([])


    const titleChangeHandler = (event) => {
        setTitle(event.currentTarget.value);
    }

    const descriptionChangeHandler = (event) =>{
        setDescription(event.currentTarget.value);
    }

    const priceChangeHandler = (event) => {
        setPrice(event.currentTarget.value);
    }

    const productChangeHandler = (event) => {
        setProduct(event.currentTarget.value)
    }
    //FileUpload의 state에 있는 images를 패러미터로 받아줄거임.
    const updateImages = (newImages) =>{
        setImages(newImages)
    }

    //서버에 데이터 전송기능(타이틀,설명,가격등)
    const submitHandler = (event) =>{
        event.preventDefault();//페이지 리프레시 방지.
        //유효성 체크,모든 칸이 채워지지 않으면 submit못하게
        if(!Title || !Description || !Price || !Product || !Images.length === 0){
           return alert("모든 칸을 기재바랍니다");
        }

        //보낼데이터 객체만듦, auth.js의 유저 prop을 받아옴.
        //필드들은 당연히 db모델 product.js따라가지.
        const body={
            writer: props.user.userData._id,
            title:Title,
            description:Description,
            price:Price,
            images:Images,
            products:Product

        }
        //서버에 채운값들을 request로 보내기,axio(주소,보낼데이터객체)
        axiosInstance.post("/api/product",body)
            .then(response=>{//백엔드에서 처리한 후에,response보낼거.
                if(response.data.success){
                    alert('상품 업로드 되었습니다.')
                    props.history.push('/landing')
                }else{
                    alert('상품 업로드를 하지 못했습니다. 문의바랍니다.')
                }
            }) 

    }
    return (
        <div className="uploadForm" >
        <div style={{backgroundColor:"white" ,maxWidth:'700px',margin:"0 auto",padding:'2rem 2rem',borderRadius:'20px',boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px'}}>
            <div style={{textAlign:'center',marginBottom:'2rem'}}>
                <h1 style={{fontWeight:'900'}}>디지털 상품 업로드</h1>
            </div>

            <Form onSubmit={submitHandler}>
                {/** FileUpload에 있는 이미지들을 이 부모컴포넌트로 가져와야하는게 목적.
                 prop을 refreshFuction으로주고,펑션을 줌. 그럼 이 prop을 fileupload에 적어줘야지.*/}
                <FileUpload refreshFunction={updateImages}/>
                <div style={{display:'flex', justifyContent:'flex-end',maxWidth:'700px',color:'lightgrey',paddingTop:'10px'}}>(*)이미지를 클릭하여 삭제하세요</div>


                <br/>
                <br/>
                <label>제품명</label>
                <Input onChange={titleChangeHandler} value={Title}/>
                <br/>
                <br/>
                <label>설명</label>
                <TextArea onChange={descriptionChangeHandler} value={Description}/>
                <br/>
                <br/>
                <label>가격(원)</label>
                <Input type="number" onChange={priceChangeHandler} value={Price}/>
                <br/>
                <br/>
                <select onChange={productChangeHandler} value={Product}>
                    {Products.map(item => (
                        <option key={item.key} value={item.key}>{item.value}</option>
                    ))}
                </select>
                <br/>
                <br/> {/**andt form 코드에,submit은 htmlType="submit"으로정의해야함.type으로 하면 안넘어가. */}
                <Button htmlType="submit" style={{width:'640px', backgroundColor:'#2B56D8',fontWeight:'900',padding:'19px 2px', color:'white',fontSize:'20px',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'3px'}}>SUBMIT</Button>
            </Form>

        </div>
        </div>
    )
}

export default UploadProductPage
