const mongoose = require('mongoose');
const  Schema  = require('mongoose');

const paymentSchema = mongoose.Schema({

    user : {
        type:Array,
        default : [],

    },
    product:{
        type:Array,
        default:[]
    },
    data:{
        type:Array,
        default:[]
    }



    },{timestamps:true}) //등록시간,업데이트 




const Payment = mongoose.model('Payment', paymentSchema);

module.exports = { Payment }