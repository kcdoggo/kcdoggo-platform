import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Icon } from 'antd';
import './Sections/Navbar.css';
import { Typography } from 'antd';
import logo from './logo.svg';


const { Title } = Typography;

//여기서 left,right 메뉴 불러와서 적어줌. 
function NavBar() {

  // 드로어 설정 (css에서 media query를 줘서 작은 화면일때만 보이게 설정)
  const [visible, setVisible] = useState(false)

  const showDrawer = () => {
    setVisible(true)
  };

  const onClose = () => {
    setVisible(false)
  };

  return (
 
    <nav className="menu" style={{ position: 'fixed', zIndex: 6, width: '100%' }}>
        {/**fixed header위해, 포지션 fixed,zIndex를 줘서 고정중에 
     * 스크롤해도 컨텐드가 뚫고 오지않고록 맨상단 위치 **/}
     
      <div className="menu__logo">
        <a href="/landing" style={{display:'flex',flexDirection:'row'}}  >
          <img src={logo} style={{ width:'35px', height:'35px', marginLeft:'-10px', marginRight:'3px'}}/>
          <Title level={3} style={{fontWeight:900, display:'flex',marginTop:'3px'}}>CdoGGo</Title>
          </a>
      </div>

      <div className="menu__container">
     
      {/**왼쪽 메뉴*/}
        <div className="menu_left">
          <LeftMenu mode="horizontal" /> 
        </div>

      {/**오른쪽 메뉴 */}
        <div className="menu_right">
          <RightMenu mode="horizontal" />
        </div>

     {/**드로어 버튼 */}
        <Button
          className="menu__mobile-button"
          type="primary"
          onClick={showDrawer}
        >
          <Icon type="align-right" />
        </Button>
      
      
        <Drawer
          title="Basic Drawer"
          placement="right"
          className="menu_drawer"
          closable={false}
          onClose={onClose}
          visible={visible}
        >
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>


      </div>
    </nav>
  )
}

export default NavBar