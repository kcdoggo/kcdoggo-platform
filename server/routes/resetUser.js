const { application } = require('express');
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const { User } = require("../models/User");
const path = require('path');



router.post(`/findPassword`,(req,res)=>{


    const Email = req.body.email
    
    User.findOne({email:req.body.email},
        (err,userInfo)=>{
            const ps = userInfo.password
 
    // 본인 Gmail 계정
    const EMAIL = "cdoggokk@gmail.com";
    const EMAIL_PW = "Aa8135406@";

    // 이메일 수신자
    let receiverEmail = Email;

    // transport 생성
    let transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: EMAIL,
            pass: EMAIL_PW,
        },
    });

    // 전송할 email 내용 작성
    let mailOptions = {
        from: EMAIL,
        to: receiverEmail,
        subject: "[cDoGGo] 패스워드 확인바랍니다",
        html: '<img src="https://blogger.googleusercontent.com/img/a/AVvXsEhjtTAAw4zDvLFYhPee1ZhbU-TaXtJXA6IwmdkBbGj_EkLjxnwpq3BZFsnimypdKe18Q5cjWIbHPfBkDK9PQWgN4NVztFK-xWzWR8KLvg8QlzgIzN0Cfx2X4YqdOfszw7PEMyZgOreZCdA-VnBGuAHldtBEOWljvfsn8yEfEelSDB1ODtYI9K44Pydn=s320" />'+"<br/>안녕하세요, CdoGGo 플랫폼입니다. <br/> 귀하의 비밀번호는"+ ps+" 입니다" 

        
    };
    
    
    // email 전송
    transport.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return;
        }

        console.log(info);
        console.log("send mail success!");
});



        }

    )
    
 



})







module.exports = router;
