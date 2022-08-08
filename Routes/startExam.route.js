const { startExam ,UserStartExam,userAns} = require('../Controllers/onlineExam.controller');

const onlineExam= require('express').Router();






(() => {
    get_requests();
    post_requests();
})();

function post_requests() {
    onlineExam.post("/start_save", startExam);
    onlineExam.patch('/saveAns',userAns)
    
} 


function get_requests() {
    onlineExam.get('/start',UserStartExam );
}

module.exports = onlineExam