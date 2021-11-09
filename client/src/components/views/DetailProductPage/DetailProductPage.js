import axios from 'axios'
import React,{useEffect,useState} from 'react'
import ProductImage from './Sections/ProductImage'
import ProductInfo from './Sections/ProductInfo'
//반응형 디자인을 위해 antd의 Row,Col을 사용
import {Row,Col} from 'antd'
import { axiosInstance } from '../components/herokuConfig';

function Page(props) {
    
    //path="/product/:productId 여기props전달받음
    const productId = props.match.params.productId
    
    //{} 빈객체보다는 초기상태를 ('') undefined 로 주기.
    //Product가 undefined라면, axios가 request를 가져오는 로딩중인 걸 확인할수있다.
    //if(!Product) return null로 로딩구현.
    const [Product, setProduct] = useState()

    

    useEffect(() => {
        //axiosInstance.get(address,id,type) 이용해서 백서버에서 정보가져옴. 
        //후에 router폴더에서, router.get만들기.
        axiosInstance.get(`/api/product/products_by_id?id=${productId}&type=single`)
        .then(response =>{
            setProduct(response.data[0])
           
        })
        .catch(err=> alert(err))
    }, [])    

    //axiosInstance가 request를 아직 가져오지 않았다면, Product가 undefiend일테니, 로딩상태로 null을 줌. 
    if(!Product){
        return null;{/* loading spinner,blank table도 가능*/}
    }
        //가져왔다면 이제 화면 보여줌. 
    return (
        <div style={{width:'100%', padding: '3rem 4rem'}}>
            <div style={{display:'flex', justifyContent: 'center',alignItems: 'center', paddingBottom:'40px'}}>
                 <h1 style={{fontWeight:900}}>{Product.title}</h1> 
            </div>
                <br/>
                <br/>

                <Row gutter={[16,16]}>

                    <Col sm={24} lg={12} ><ProductImage detail={Product}/></Col>
                    <Col sm={24} lg={12}><ProductInfo detail={Product}/></Col>
                </Row>
                

            </div>
        
        
    )
}

export default Page
