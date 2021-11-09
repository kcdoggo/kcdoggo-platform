import React,{useEffect,useState} from 'react'
import { FaCode, FaFileExcel } from "react-icons/fa";
import axios from 'axios';
import { axiosInstance } from '../../herokuConfig';
import {Col,Row,Card,Carousel} from 'antd';
import Meta from 'antd/lib/card/Meta'
import ImageSlider from '../../utils/ImageSlider';
import mainImage from './main.svg'
import CheckBox from './Sections/CheckBox';
import {products} from './Sections/Datas'

function LandingPage() {

    //어디서부터 데이터 가져오는지에 대한 위치,처음은 0부터 시작
    //limit이 8이면, 다음엔 skip = 0+8
    const [Skip, setSkip] = useState(0)

    const [Limit, setLimit] = useState(8)

    //서버에서 가져온 이미지 저장
    const [Products, setProducts] = useState([])

    //데이터가 더 있을때만 더보기 버튼 보이기
    const [PostSize, setPostSize] = useState(0)

    useEffect(() => {

        let body = {
            skip:Skip, limit : Limit
        }
        
        getProducts(body)
    }, [])


    const getProducts = (body) =>{
        axiosInstance.post('/api/product/products',body)
        .then(response=>{
            if(response.data.success){ 
                if(body.loadMore){
                    setProducts([...Products,...response.data.productInfo])
                }else{
                    setProducts(response.data.productInfo)
                }
                setPostSize(response.data.postSize)
            }else{
                alert("상품 가져오는 데 실패")
            }
        })


    }

    //더보기 눌렀을때 8개 더 추가되는 기능. 시작부분 skip이 달라야겠wl
    //처음엔 0+8,두번짼,8+8
    const loadMoreHandler = () => {
 
        let skip = Skip+Limit
        
        let body = {
            skip:skip, 
            limit : Limit,
            loadMore:true
        }
        
 
        getProducts(body)
        setSkip(skip)
    }

    const renderCards = Products.map((product,index)=>{


        
      
        const productPrice = parseInt(product.price,10) 
        const toLocale = productPrice.toLocaleString("ko-KR")
        

        return (
        <Col lg={6} md={8} xs={24} key={index}>
            <Card 
                 cover={<a href={`/product/${product._id}`}><ImageSlider images={product.images}/> </a>}>
            <Meta
                title={product.title}
                description={`${toLocale}원`}
            />

        </Card>
        </Col>)
    })
    
    return (
        <>
        <img  style={{width:'100%'}} src={mainImage}/>
        <div style={{width:'75%', margin:'3rem auto'}}>
                

            {/**filter */}



            {/**체크박스 */}
            {/**<CheckBox list={products}/>**/}


            {/**라디오 박스 */}



            {/**search */}


            {/**카드 */}
            <Row gutter={[16,16]}>
            {renderCards}
            
            </Row>

            <br/> 
                {PostSize>=Limit &&
                <div  style={{display:'flex', justifyContent:'center'}}>
                     <button onClick={loadMoreHandler}>더보기</button>
                </div>
                }


        </div>
        </>
    )
}

export default LandingPage
