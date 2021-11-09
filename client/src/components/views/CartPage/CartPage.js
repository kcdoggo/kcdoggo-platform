import React, {useEffect,useState} from 'react'
import {useDispatch} from 'react-redux'
import {getCartItems, removeCartItem} from '../../../_actions/user_actions'
import UserCardBlock from './Sections/UserCardBlock';
import { Empty } from 'antd';
import Paypal from '../../utils/Paypal';


function CartPage(props) {

    const [Total, setTotal] = useState(0)
    const [ShowTotal, setShowTotal] = useState(false)

    const dispatch = useDispatch();
  
    const client = {
        sandbox:    'YOUR-SANDBOX-APP-ID',
        production: 'YOUR-PRODUCTION-APP-ID',
    }


    useEffect(() => {

        let cartItems = []

        //리덕스 User state안에 먼저 cart가 있는지 확인.
        if(props.user.userData && props.user.userData.cart){
            if(props.user.userData.cart.length > 0 ){
                props.user.userData.cart.forEach(item => {

                  	// 리덕스 카트에 있는 아이템 id를 넣음.
                    cartItems.push(item.id)
                })      //리덕스 카트에 있는 아이팀의 id, 그리고 모든 정보(수량포함)
                dispatch(getCartItems(cartItems,  props.user.userData.cart))
                    .then(response => {calculateTotal(response.payload)})
            }
        }   //이게 있어야 dispatch 액션발생함수가 실행됨.     
        }, [props.user.userData])

        let calculateTotal = (cartDetail) => {
            let total = 0;
            cartDetail.map(item => {
                total += parseInt(item.price,10) * item.quantity 

            })
            setTotal(total)
            setShowTotal(true)

        }
        const toLocale= Total.toLocaleString("ko-KR")

        let removeFromCart = (productId) => {
            dispatch(removeCartItem(productId))
            .then(response => { //만약 카트에 아무 상품도 없다면 
                if(response.payload.productInfo.length <= 0 ){
                    //빈 상품 아이콘하고, 합계가격도 안보이게..useState이용. 
                    setShowTotal(false)
                }

            })
        }

    return (
        <div style={{width:'85%', margin: '3rem auto'}}>
            <h1 style={{fontWeight:900}}>내 장바구니</h1>
            <UserCardBlock products={props.user.cartDetail} removeItem={removeFromCart}/>

        {/**ShowTotal이 true면 합계 보여주기, 아니면 antd의 empty보여주기  */}
        {ShowTotal ? 
            <div style={{marginTop: '3rem'}}>
                <h2>총 합계 : {toLocale}원 </h2>
            </div> : <Empty style={{marginTop: '20px'}} description={'장바구니에 담긴 상품이 없습니다'}/>
        }

        {/** A && B, a가 false라면 b는 리턴되지 않음,
         *  falsy가 되는건 0, empty string "",'',undefined,NaN */}
        {ShowTotal && <Paypal total={Total}/>}
        

        </div>
        
    )
}

export default CartPage
