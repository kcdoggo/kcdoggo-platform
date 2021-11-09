const express = require('express');
const router = express.Router();
const { User } = require("../models/User");
const {Product} = require("../models/Product")
const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
        cart: req.user.cart,
        history: req.user.history
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });
        //여기 comparePassword함수는 user 모델에서 만든 함수임. 
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "잘못된 비밀번호" });

            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true, userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});



router.post("/addToCart", auth, (req, res) => {

        //먼저 User Collection에서 해당 유저 정보 가져오기
        //req.user.id 가져올 수 있는건 auth 미들웨어때문. req.user에 user넣어줬음.
        User.findOne({_id: req.user._id},
                (err, userInfo) => {

        //가져온 정보에서 카트에다 넣으려는 상품이 이미 존재해는 지 확인
        let duplicate = false;

        //forEach 이용해서, DB cart에 있는 id와, user_action.js에서 보내는 body(productId) 와 같은지 확인.
        userInfo.cart.forEach((item) => {
            if(item.id === req.body.productId){
                duplicate = true;
            }
        })

        //상품이 이미 있을때 
        if(duplicate){
            User.findOneAndUpdate(
                {_id: req.user._id, "cart.id": req.body.productId},
                {$inc : {"cart.$.quantity":1}},
                {new:true }, //업데이트된 정보의 결과값 받으려면 new:true 옵션 줘야함.                     
                (err, userInfo) => {//위까지 커리문 돌린다음,에러처리
                    if(err) return res.status(200).json({success: false,err})
                    res.status(200).send(userInfo.cart)
                }
                )
        }
        //상품이 없을때, 상품ID,개수1,날짜 정보 넣어줘야  
        else{
            User.findOneAndUpdate(
                //해당유저 찾기.
                {_id: req.user._id},
                {
                    $push: {
                        cart: {
                            id : req.body.productId,
                            quantity: 1,
                            date:Date.now()
                        }
                    }

                },
                {new: true},
                (err, userInfo) => {
                    if(err) return res.status(400).json({success:false,err})
                    res.status(200).send(userInfo.cart)
                }
            )
        }

      
            });
        })

   router.get('/removeFromCart',auth,(req,res)=>{

    //user collection에 있는 cart에 지우려는 상품 지우기(findOneAndUpdate이용해서 유저 찾기.)
     //req.user._id 가져올 수 있는건 auth 미들웨어때문. req.user에 user넣어줬음.
    User.findOneAndUpdate(
        {_id: req.user._id},
        { 
            "$pull":
            {"cart":{"id":req.query.id}} //여기 id는 user_action.js에서 쿼리문으로 넘겨준거. pull이용해 삭제
        },
        {new :true}, //업데이트 한거 표시
        (err, userInfo)=>{
            let cart = userInfo.cart; // User collection에 있는 cart 
            let array = cart.map(item => {
                return item.id
            })

        //위의 user collection에 있는 id 사용하여,
        //product collection에서 남아있는 상품 정보를 가져오기.
        Product.find({_id:{$in:array}})
            .populate('writer')
            .exec((err,productInfo)=>{
                return res.status(200).json({
                    productInfo, //proudct collection에 있는 상품정보
                    cart //user collection에 있는 cart
                })
            })
        }
        )
        })
    



module.exports = router;
