/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu, Badge, Avatar, Icon } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";

function RightMenu(props) {

  //리덕스 상태를 조회해서 사용하게 useSelector 사용 
  //이걸로 리덕스에 있는 userData - cart.length이용할거.
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item style={{ fontSize:'20px'}} key="mail">
          <a href="/login">LOGIN</a>
        </Menu.Item>
        <Menu.Item style={{ fontSize:'20px'}} key="app">
          <a href="/register">SIGN UP</a>
        </Menu.Item>
      </Menu>
    )
  } else {
    return (
      <Menu mode={props.mode}>
       <Menu.Item key="upload" style={{fontWeight:'20px'}} >
          <a href="/product/upload" >상품 업로드</a>
        </Menu.Item>

        
        <Menu.Item key="cart" style={{paddingBottom: 3}}>

        <Badge count={user.userData && user.userData.cart.length}>
         <a href="/user/cart" className="head-example" style={{marginRight:-22, color: '#6677777'}}>  
          <Icon type="shopping-cart" style={{fontSize:30,marginBottom:3}}/>
          </a>
        </Badge>
        </Menu.Item>


        <Menu.Item key="logout" style={{fontWeight:'20px'}} >
          <a onClick={logoutHandler}>LOGOUT</a>
        </Menu.Item>
     
      </Menu>
    )
  }
}

export default withRouter(RightMenu);

