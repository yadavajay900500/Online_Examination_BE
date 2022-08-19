const { setQuestion ,userStartExam,userAns,checkThePaper,registrationForm,postTime,getAllQuestion,deleteSomeQuestion} = require('../Controllers/onlineExam.controller');
const questionModel = require('../models/questionPaper.module');
//const { result_validator } = require('../Registration/Middleware/questionPaper.middleware');
const {registrationSchema}=require('../Validations/questionPaper.validator')
const {result_validator}=require('../Middlewares/globalValidatior.middleware')
const onlineExam= require('express').Router();
//const {option_validator}=require('../Helper/validator.helper')






(() => {
    delete_request();
    get_requests();
    post_requests();
})();

function post_requests() {
    onlineExam.post("/setQuestionPaper",registrationSchema(), result_validator,setQuestion);  
    onlineExam.patch('/saveAns',userAns)
    
} 


function get_requests() {
    onlineExam.get('/start',userStartExam );
    onlineExam.get('/getQuestion',getAllQuestion );
    onlineExam.get('/checkPaper',checkThePaper)
}
function delete_request(){
    onlineExam.delete('/deleteQuestion',deleteSomeQuestion)
}

module.exports = onlineExam