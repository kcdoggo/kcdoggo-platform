const { application } = require('express');
const express = require('express');
const router = express.Router();
const multer  = require('multer');
const {Product} = require('../models/Product') //db모델

//=================================
//             product 
//=================================

//머터이용해서,이미지 서버저장, multer diskStorage
const storage = multer.diskStorage({
    //파일저장경로 uploads폴더에.
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    //파일저장이름 어떻게 할건지.
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`)
    }
  })
  
  const upload = multer({ storage: storage }).single("file")



//uploadProductPage.js에서 모든 정보를 submit해서 
///api/product주소 보낸게 index.js의 app.use('/api/product로 가서,여기선 /값만 주면됨.
router.post('/',(req,res)=>{

  //받은 정보 db저장
  const product = new Product(req.body)
  product.save((err)=>{ //콜백err처리
    if(err) return res.status(400).json({success:false,err})
    return res.status(200).json({success:true})


  })

})

router.post('/products',(req,res)=>{

  let limit = req.body.limit ? parseInt(req.body.limit):20;
  let skip = req.body.skip ? parseInt(req.body.skip):0;

 Product.find()
 .populate("writer")
 .skip(skip)
 .limit(limit)
 .exec((err,productInfo)=>{
   if(err) return res.status(400).json({success:false,err})
  
   return res.status(200).json({
     success:true, productInfo,
      postSize:productInfo.length
    })
 })
  

})


//이미 index.js에서 /api/product로 서술해줘서, 여기 오면 /image만 경로.
router.post('/image',(req,res)=>{

    //가져온 이미지 저장, multer사용 .
    upload(req,res,err=>{
       if(err){//에러나면,프론트에 알려줌.
           return req.json({success:false,err})
       }//저장성공하면,파일이름과파일저장경로전달.,이걸fileupload.js프론트에선 state로 저장관리.
       return res.json({success:true, filePath:res.req.file.path ,fileName:res.req.file.filename  }) 
    })

})

//여기는 리덕스의 user data에서 담긴 cart 상품아이디를 받아와서 검색하는거.
//id를 여러개 받아와서 type이 array
router.get('/products_by_id',(req,res)=>{

  let productIds = req.query.id
  let type = req.query.type

  if( type === "array"){
    //문자열을 배열로 변환하는 split함수 써서 아이디를 [3243,25645,3453]로 만들기
    let ids = req.query.id.split(',') 
    productIds = ids.map(item => {
      return item
    }) 
  }//$in 은 배열 값을 선택, 위의 모든 productIds를 검색함.
  //productId 이용해서, db에서 product id 와 같은 상품 가져옴.
  Product.find({_id:{$in:productIds}})
    .populate('writer')
    .exec((err,product)=>{
      if(err) return res.status(400).send(err)
      return res.status(200).send(product)
    })

})

module.exports = router;
