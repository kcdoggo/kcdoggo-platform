import React from 'react'
import { useDispatch } from 'react-redux';
import { Button, Descriptions, Badge } from 'antd';
import {addToCart} from '../../../../_actions/user_actions';
import { useSelector } from "react-redux";



function ProductInfo(props) {
    
    const user = useSelector(state => state.user)


    const dispatch = useDispatch();
    const clickHandler = () => {
        
       if(user.userData && !user.userData.isAuth){
            alert('로그인이 필요합니다. \nplease login first')
        }else{
            dispatch(addToCart(props.detail._id))
            alert('장바구니에 상품이 담겼습니다. \nproduct successfully added to cart ')
        }
    }


        const priceNumber = props.detail.price
        const number = parseInt(priceNumber,10) 
        const toLocale = number.toLocaleString("ko-KR")
        
       console.log(toLocale)

    return (
        <div>
            <Descriptions title="상품정보" bordered>
                <Descriptions.Item label="가격">{toLocale} 원</Descriptions.Item>
                <Descriptions.Item label="판매수">{props.detail.sold}</Descriptions.Item>
                <Descriptions.Item label="열람수">{props.detail.views}</Descriptions.Item>
                <Descriptions.Item label="상품설명" span={2}>{props.detail.description} </Descriptions.Item>
            </Descriptions>       

                <br/>
                <br/>
                <br/>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <Button style={{backgroundColor:'#faad14', borderStyle:'none',fontWeight:'900'}}type="primary" size="large" shape="round" onClick={clickHandler} >
                        장바구니 추가
                    </Button>
                </div>
            </div>
    )
}

export default ProductInfo
