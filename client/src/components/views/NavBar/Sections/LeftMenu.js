import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

//여기 props은 부모컴포넌트인 NavBar.js에서 받아옴.
function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
    <Menu.Item key="mail">
      <a href="/landing" style={{ fontSize:'20px'}}>Home</a>
    </Menu.Item>
    
  </Menu>
  )
}

export default LeftMenu