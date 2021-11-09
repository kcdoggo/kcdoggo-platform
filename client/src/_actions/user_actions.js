import axios from 'axios';
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS,
    REMOVE_CART_ITEM
    
} from './types';

import { axiosInstance } from '../components/herokuConfig';


import { USER_SERVER } from '../components/Config.js';

export function registerUser(dataToSubmit){
    const request = axiosInstance.post(`${USER_SERVER}/register`,dataToSubmit)
        .then(response => response.data);
    
    return {
        type: REGISTER_USER,
        payload: request
    }
}

export function loginUser(dataToSubmit){
    const request = axiosInstance.post(`${USER_SERVER}/login`,dataToSubmit)
                .then(response => response.data);

    return {
        type: LOGIN_USER,
        payload: request
    }
}

export function auth(){
    const request = axiosInstance.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

    return {
        type: AUTH_USER,
        payload: request
    }
}

export function logoutUser(){
    const request = axiosInstance.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

    return {
        type: LOGOUT_USER,
        payload: request
    }
}

export function addToCart(id){

    let body = {
        productId : id 
    }
    const request = axiosInstance.post(`${USER_SERVER}/addToCart`,body)
    .then(response => response.data);

    return {
        type: ADD_TO_CART,
        payload: request
    }
}
                            //cartItems와 user state에 들어있는 cart 
export function getCartItems(cartItems, userCart){

    const request = axiosInstance.get(`/api/product/products_by_id?id=${cartItems}&type=array`)
     .then(response => { 
        //CartItem들의 id에 해당하는 아이템들을, Product Collection에서 가져온 후,
	    // Quantity정보를 넣어줌.
        userCart.forEach(cartItem => {

            //여기 액션에서 백서버인 product.js라우터에 요청 보냄. 거기서 product를 돌려줌. 
            response.data.forEach((productDetail, index)=> {
             //리덕스 스토에어 있는 카트 아이디와 , DB에 있는 아이디가 같다면
                if(cartItem.id === productDetail._id){
                    // DB의 product에 quantity가 담기게 됨
                    response.data[index].quantity = cartItem.quantity
                }
            })
        })
            //response.data는 리듀서 user_reducer의 payload.action 으로 감. 
           return response.data; 

    });

    return {
        type: GET_CART_ITEMS,
        payload: request
    }
}


export function removeCartItem(productId){

    const request = axiosInstance.get(`/api/users/removeFromCart?id=${productId}`)
     .then(response => { 
    
            //productInfo, cart(user collection)조합+하여 CartDetail을 만듦.
            response.data.cart.forEach(item=>{
                //여기 productId와 cart는 user.js서버에서 돌려준 값.
                response.data.productInfo.forEach((product,index)=>{
                    if(item.id === product._id){
                        response.data.productInfo[index].quantity = item.quantity
                    }
                })
            })
           return response.data; 

    });

    return {
        type: REMOVE_CART_ITEM,
        payload: request
    }
}
