const Mongoose = require('mongoose');

const paper_schema = new Mongoose.Schema({
    qusNumber:Number,
    question: String,
     option: {
        type: Array
    },
    rightAns:String,
    userRightAns:{
        type:String,
        default:""
    },
    is_Verified : 0

}) 

const questionModel = Mongoose.model("start",paper_schema);

module.exports = questionModel