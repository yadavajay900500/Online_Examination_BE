
const questionModel = require("../models/questionPaper.module");
const { paginated_results } = require("../Pagenation/NextPrevius.pagenation")

exports.startExam = async (req, res) => {
  questionModel(req.body).save(async (err, result) => {
    if (err) {
      next(new Error("Data not saved"));
    }
    else {
      res.status(200).send({ result });
    }
  })
}

// 000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

exports.userAns= async (req,res) => {
try{
  const updateAns=await questionModel.findByIdAndUpdate(req.query._id,req.body,{new:true})
  res.status(200).send({"hello":updateAns})
} catch (error){
  throw error;
}


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






// 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000

exports.UserStartExam = async (req, res) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.record)
  console.log(">>>",page)
  const data = await questionModel.find({}, { __v: false, rightAns: false })

  let array = await paginated_results(page, limit, data)
  console.log(">>>>>>>>>>>>>>",array)
  let newArray = array.data[0].option
console.log("////",newArray)
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  console.log("??????/",newArray)
  array.data[0].option = newArray
  res.status(200).send({ Welcome: array })
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
