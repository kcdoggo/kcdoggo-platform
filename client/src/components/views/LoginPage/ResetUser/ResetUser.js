import axios from 'axios';
import React,{useState} from 'react'
import "./LoginPageStyle.css";
import {axiosInstance} from '../../../herokuConfig'

function ResetUser() {

    const [Email, setEmail] = useState()

    const onChangeHandler = (event) => {
        setEmail(event.currentTarget.value);
    }

    const body = {email:Email}

    const onClickHandler = (event) => {
        event.preventDefault();
        axiosInstance.post(`/api/resetUser/findPassword`, body 
        ).then(response=> console.log(response.data),
            alert('이메일을 전송하였습니다')   )
            .catch(error => console.log(error))
       
        
       
    }
    return (
        <div className="resetUser" style={{position:'relative'}}>
            <div  style={{ textAlign:'center',minWidth: '375px',position: 'absolute', left:'10%', top: '25%', width: '330px' }}>
                <h2 style={{fontWeight:'900'}}>비밀번호 찾기</h2>
           
            <form style={{maxWidth: '400px', margin: '2rem auto', display:"flex", flexDirection:'column', justifyContent:'center' }}>
                <h3>가입시 사용한 이메일을 입력바랍니다</h3>
                <input type="text" onChange={onChangeHandler} placeholder="이메일을 입력하세요 "style={{borderStyle:'none', backgroundColor:'#E8F0FE',padding:'10px 5px',borderRadius:'5px'}}/>
                <br/>
                <button onClick={onClickHandler} style={{backgroundColor:'#557DF5' ,minWidth: '100%', fontWeight:'900', borderStyle:'none',padding:'7px 5px',borderRadius:'5px',color:'white'}}>비밀번호 찾기</button>
            </form>
            </div>
        </div>
    )
}

export default ResetUser
