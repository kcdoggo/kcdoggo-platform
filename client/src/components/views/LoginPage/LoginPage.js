import React, { useState } from "react";
import { withRouter } from "react-router-dom"; //어떤 상태면 특정 컴포넌트 안보이게 하기.
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Icon, Input, Button, Checkbox, Typography ,Row, Col } from 'antd';
import { useDispatch } from "react-redux";
import "./LoginPageStyle.css";



const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();

  const [formErrorMessage, setFormErrorMessage] = useState('')

  return (

    <Formik
      initialValues={{
        email: '',
        password: '',
      }} //검증은 Yup을 이용. 
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('이메일이 옳지 않습니다')
          .required('이메일을 써주시기 바랍니다'),
        password: Yup.string()
          .min(6, '비밀번호는 6자 이상이여야 합니다')
          .required('비밀번호를 써주시기 바랍니다'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => { //줄 데이터(이메일,비번)
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };
          //dispatch로 액션함수 발생,loginUser(줄 데이터)
          dispatch(loginUser(dataToSubmit))
            .then(response => {//loginUser액션함수에서axios로 백서버에 요청보내서 결과 받은거.
              if (response.payload.loginSuccess) {
                //localStorage로 데이터를 브라우저상 저장
                window.localStorage.setItem('userId', response.payload.userId);
                props.history.push("/landing");

              } else {
                setFormErrorMessage('이메일이나 비밀번호를 다시 확인해주시길 바랍니다')
              }
            })
            .catch(err => {
              setFormErrorMessage('이메일이나 비밀번호를 다시 확인해주시길 바랍니다')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (


    <div className="appLogin" style={{position:'relative'}} >       
          
            <form className="formStyle" onSubmit={handleSubmit}>
               <Row type="flex" align="middle" >
                <Col offset={2} xs={20} xl={6}  >
              
              <Title style={{textAlign:"center"}} level={2}>로그인</Title>
              <br/>              

              {/**antd 의 form 사용 */}
              <Form.Item required>
                <Input 
                  size="large"
                  id="email"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="이메일을 적어주시길 바랍니다"
                  type="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email ? 'text-input error' : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </Form.Item>

              <Form.Item required>
                <Input 
                  size="large"
                  id="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="비밀번호를 적어주시길 바랍니다"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.password && touched.password ? 'text-input error' : 'text-input'
                  }
                />
                {errors.password && touched.password && (
                  <div className="input-feedback">{errors.password}</div>
                )}
              </Form.Item>

              {formErrorMessage && (
                <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
              )}

              <Form.Item>  
                <div>
                  <Button style={{backgroundColor:'#13d18e' ,minWidth: '100%', fontWeight:'900', borderStyle:'none'}}size="large" type="primary" htmlType="submit" className="login-form-button" disabled={isSubmitting} onSubmit={handleSubmit}>
                      LOGIN
                </Button>
                </div>
                  <a href="/register" style={{color:'#1890ff'}}>회원가입 하러가기</a>
                <a className="login-form-forgot" href="/reset_user" style={{ float: 'right',color:'#1890ff' }}>
                  비밀번호 찾기
                  </a>
              </Form.Item>
                </Col>

                </Row>
            </form>
          </div>
        );
      }}
    </Formik>
  );
};

export default withRouter(LoginPage);


