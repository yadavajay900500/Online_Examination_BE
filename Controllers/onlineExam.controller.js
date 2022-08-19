
const questionModel = require("../models/questionPaper.module");
const { paginated_results } = require("../Pagenation/NextPrevius.pagenation")
const { generate_token, expireToken } = require("../Utilities/jwt_token");
const { postTime } = require("../Utilities/webSocket");
const secret = "All_is_well"
const jwt = require('jsonwebtoken');
const jwt_decode = require('jwt-decode');
const server=require('../Utilities/webSocket')
//var sessionstorage = require('sessionstorage');
///var localstorage = require('local-storage');
//const date = require('date-and-time');
  ////////////////////////////////////////////////////////////////////////


  


//*********it is used to set the Question Paper for the student**************/
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

//***********************It is used to find all Question Paper*****************/
exports.getAllQuestion = async (req, res) => {
  try {
    const paper = await questionModel.find()
    res.json({ allQusetionPaper: paper })
  }
  catch {
    res.status(500).json({ massageError: error.massageError })
  }
}

//*****It is used for the save the right option of the Question*******************/
exports.userAns = async (req, res) => {
  try {
    const date = `${new Date().toLocaleDateString('en-GB', { hour: '2-digit', hour12: true })} 
    :${new Date().getMinutes()}
    :${new Date().getSeconds()}`
    console.log("timeeeee", date)
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

//000000000000000000000000000000000000000000000000000000000000000000000000

// exports.postTime=(ws) => {
//   var dateNow = new Date();
//    console.log("oooooooooooooooooooooooo",ws)
//    setInterval(() => {
//       console.log(ws.(`${dateNow.toLocaleDateString('en-GB',{hour:'2-digit',hour12:true})} 
//               :${dateNow.getMinutes()}
//               :${dateNow.getSeconds()}`));
//    }, 1000);

//   //send immediatly a feedback to the incoming connection    

// }








// 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

exports.userStartExam = async (req, res) => {
  var dateNow = new Date();
  var options = {
    timeZone: "Asia/Kolkata",
    year: 'numeric', month: 'numeric', day: 'numeric',
    hour: 'numeric', minute: 'numeric', second: 'numeric'
};
var formatter = new Intl.DateTimeFormat([], options);
var UTCTime = dateNow;
var localTime = formatter.format(new Date(UTCTime));
var currentTime = formatter.format(new Date());
  console.log("Real Time",currentTime, localTime);
  console.log("11111111111", dateNow)
  const daaa = 'foobar'
  const tok = generate_token(daaa, `${60 * 5}s`);
  console.log("jwt_token.....>>>>>>>>>>>>>>", tok)
  const initialToeknTime = jwt_decode(tok).iat;
  const expireTokenTime = jwt_decode(tok).exp


  // const date = `${new Date().toLocaleDateString('en-GB', { hour: '2-digit', hour12: true })} 
  // :${new Date().getMinutes()}
  // :${new Date().getSeconds()}`
  // console.log("timeeeee", date)
  // var UTCTime = "2017-09-03T02:00:00Z";
  // var localTime = formatter.format(new Date(UTCTime));
  // var currentTime = formatter.format(new Date()); console.log(currentTime, localTime);
  //sessionstorage.setItem("key", tok);
  // const itemToken = sessionstorage.getItem("key")
  //console.log("itemToken>>>>>>>>", itemToken)

  console.log("====Initialtime=======", initialToeknTime)
  console.log("++++++DateTime++++++++", dateNow.getTime() / 1000)
  console.log("___ExpiringTime______", expireTokenTime)

  const ti = expireTokenTime < (dateNow.getTime()) / 1000 - initialToeknTime
  // const ti=jwt_decode(tok).exp < (dateNow.getTime())/1000 -  jwt_decode(tok).iat
  console.log("pppppppppppppppppppp", ti);

  if (tok && ti) {
    console.log("successfull logout")
  } else {
    console.log("you continues")
  }


  // ///////////////////////////////////////////////////////////////////////////////////////////////
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.record)
  const data = await questionModel.find({}, { __v: false, rightAns: false, userRightAns: false })
  // console.log(">>>req_body",data)

  let array = await paginated_results(page, limit, data)
  //console.log(">>>>>>>>>>>>>>",array)
  let newArray = array.data[0].option

  //*******It is used for the shuffling array elements************/
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  //console.log("??????/",newArray)
  //console.log(".............................................",array )
  array.data[0].option = newArray
  res.status(200).send({ Welcome: array })
}

//********************used for check the student answer sheet and calculate the percantage of the student****** */

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
    res.status(200).send({ "Student_Right_Answer": count, "total_Number_of_Question": dataLength, "StudentPercentage": studentPercentage })

  } catch (error) {
    throw (error)
  }
}

//*********************** It is used for delete the Question *****************************/
exports.deleteSomeQuestion = async (req, res) => {
  var id = req.query._id;

  await questionModel.findOneAndDelete({ id })

  return res.status(200).send("Data is delete");


}
//===============================================================
//   questionModel.find({}, { __v: false, _id: false }, (err, result) => {
//     console.log(">>>", result)
//     let { start = 0, end = result.length } = req.query;
//     const filteredUsers = result.filter((user, id) => {
//       return id >= start && id <= end
//     });
//     console.log("/////", filteredUsers)
//     // res.send({filteredUsers,length:data.length})
//     const {option}=filteredUsers
//     console.log("=====>",option)
//     const arr = filteredUsers[0].option
//     const rAns = filteredUsers[0].rightAns

//     for (const element of arr) {
//       if (rAns == element) {
//         const rndInt = Math.floor(Math.random() * 3) + 1
//         arr.splice(rndInt, 0, rAns)
//         console.log("?????", arr)
//         console.log("fgfrfrr", filteredUsers)
//         res.status(200).send(filteredUsers)

//       }
//     }
//   })
// }

