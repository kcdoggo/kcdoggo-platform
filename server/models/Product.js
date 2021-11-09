const mongoose = require('mongoose');
const moment = require("moment");
const  Schema  = require('mongoose');

const productSchema = mongoose.Schema({
 
    writer:{
        type: Schema.Types.ObjectId,
        ref:'User'

    },
    title:{
        type:String,
        maxlength: 50
    },
    description:{
        type:String
    },
    price:{
        type:Number,
        default:0
    },
    images:{
        type:Array,
        default:[]
    },
    products: {
        type: Number,
        default: 1
    },
    sold:{ 
        type:Number,
        maxlength:100,
        default:0
    },
    views:{
        type:Number,
        default:0

    }},{timestamps:true}) //등록시간,업데이트 




const Product = mongoose.model('Product', productSchema);

module.exports = { Product }