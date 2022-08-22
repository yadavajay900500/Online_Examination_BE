
const questionModel = require("../models/questionPaper.module");
const { paginated_results } = require("../Pagenation/NextPrevius.pagenation")
const { generate_token, expireToken } = require("../Utilities/jwt_token");
const { postTime } = require("../Utilities/webSocket");
const server = require('../Utilities/webSocket')



// 1 *********it is used to set the Question Paper for the student**************/
exports.setQuestion = async (req, res) => {
  console.log(">>>>>>>>>>req.body   ", req.body)
  questionModel(req.body).save(async (err, result) => {
    if (err) {
      next(new Error("Data not saved"));
    }
    else {
      console.log("result>>>>>>>result   ", result)
      res.status(200).send({ result });
    }
  })
}

// 2 *****It is used for the save the right option of the Question*******************/
exports.userAns = async (req, res) => {
  try {
    const updateAns = await questionModel.findByIdAndUpdate(req.query._id, req.body, { new: true })
    console.log("peeeeeeee", updateAns)
    res.status(200).send({ "hello": updateAns })
  } catch (error) {
    throw error;
  }
  //**********Another way save the right option****************/
  // try {
  //   const { _id } = req.query
  //   const { userRightAns } = req.body 
  //   console.log("0000",req.body)
  //  const updateAns= await questionModel.updateOne({_id},{userRightAns});
  //  console.log("}}}}}}}}",updateAns)
  //  if(updateAns.modifiedCount==1){
  //   let data = await questionModel.findOne({_id})
  //    res.status(200).send({updateAns,data});
  //  }
  //  else{
  //   res.status(500).send("not updated")
  //  }
  // } catch (error) {
  //   throw  error;
  // }
};
// 3 *************** Find all Qusetion or Find by pages and records **************************//
exports.userStartExam = async (req, res) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.record)
  const data = await questionModel.find({}, { __v: false, rightAns: false, userRightAns: false })
  let array = await paginated_results(page, limit, data)
       //*******It is used for the shuffling array elements************/
  array.map((element) => {
    for (let i = element.option.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [element.option[i], element.option[j]] = [element.option[j], element.option[i]];
    }
  })
  res.status(200).send({ Welcome:
     array.length === 0 ? "There is no more Question, Please Submit" : array })
}

// 4 ********************used for check the student answer sheet and calculate the percantage of the student****** */

exports.checkThePaper = async (req, res) => {
  try {
    const studentAns = await questionModel.find({},)
    let count = 0;
    let dataLength = studentAns.length
    for (let i = 0; i < studentAns.length; i++) {
      let b = studentAns[i].rightAns
      let a = studentAns[i].userRightAns
      if (b == a) {
        count = count + 1;
      }
    }
    const studentPercentage = (count / dataLength) * 100
    console.log(count)
    res.status(200).send({ "Student_Right_Answer": count, 
    "total_Number_of_Question": dataLength, 
    "StudentPercentage": studentPercentage })

  } catch (error) {
    throw (error)
  }
}

// 5 *********************** It is used for delete the Question *****************************/
exports.deleteSomeQuestion = async (req, res) => {
  var id = req.query._id;
  await questionModel.findOneAndDelete({ id })
  return res.status(200).send("Data is delete");
}
