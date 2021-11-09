import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";

import {
  Form,
  Input,
  Button,
} from 'antd';

const formItemLayout = {
  //antd form 제목 레이아웃, 반응형 
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  }, //antd form 인풋칸 레이아웃, 반응형 
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const tailFormItemLayout = {
  //antd form 인풋칸 레이아웃, 반응형
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

function RegisterPage(props) {
  const dispatch = useDispatch();
  return (

    <Formik
      initialValues={{
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: ''
      }} //yup을 위한 cofig option
      validationSchema={Yup.object().shape({
        name: Yup.string().required('이름 입력 바랍니다'),
       
        email: Yup.string()
          .email('Email is invalid')
          .required('이메일 입력 바랍니다'),
        password: Yup.string()
          .min(6, '비밀번호 6자 이상 입력바랍니다')
          .required('비밀번호 입력 바랍니다'),
        confirmPassword: Yup.string() //ref을 사용하여 형제필드 유효성검사.oneOf 는 비번있으면 비번과 비교, 아무것도 없으면 null과 비교
          .oneOf([Yup.ref('password'), null], '비밀번호가 매치하지 않습니다')
          .required('비밀번호 입력 바랍니다')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name, //사용자 이미지 아바타 gravartar. moment.unix 밀리세컨드시간
           image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };
          //리덕스을 사용할거임. 액션함수(보낼데이터)
          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg)
            }
          })

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
          <div className="app">
            <Form className="formStyle"style={{ minWidth: '375px',position: 'absolute', left:'10%', top: '24%', width: '330px' }} {...formItemLayout} onSubmit={handleSubmit} >
              <h2 style={{fontWeight:900, textAlign:'center'}}>회원가입</h2>
              <br/>
              <Form.Item required label="이름">
                <Input
                  id="name"
                  placeholder="이름 입력"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name ? 'text-input error' : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className="input-feedback">{errors.name}</div>
                )}
              </Form.Item>


              <Form.Item required label="이메일" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                <Input
                  id="email"
                  placeholder="이메일 입력"
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

              <Form.Item required label="비밀번호" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                <Input
                  id="password"
                  placeholder="비밀번호 입력"
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

              <Form.Item required label="비밀번호 재입력" hasFeedback>
                <Input
                  id="confirmPassword"
                  placeholder="비밀번호 재입력"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                  }
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="input-feedback">{errors.confirmPassword}</div>
                )}
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </div>
        );
      }}
    </Formik>
  );
};


export default RegisterPage
