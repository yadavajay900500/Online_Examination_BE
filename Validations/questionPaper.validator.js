const { check, body } = require('express-validator')
const questionModel = require("../models/questionPaper.module")

exports.registrationSchema = (req, res, next) => {
  return [
    body('option').custom(async (option) => {
      if (option.length == 4) {
          for (let i = 0; i < option.length; i++) {
          for (let k = i + 1; k < option.length; k++) {
            if (option[i] == option[k]) {
              const sameOption=option[i]
               return Promise.reject(`Two option are not same ===> ${sameOption} `)
             // throw `Two option are not same ===> ${sameOption} `
            }
            }
          }}
          
      else {
        return Promise.reject('provide 4 option only')

            //throw `provide 4 option only`
          }
          
  })
  ]
}





// check("question").custom( (question)=> {
//     const data= questionModel.findOne({question})
//    // console.log("findddddddd",data)
//     return data
//     .then(user => {
//         if (user.length > 0) {
//             // Custom error message and reject
//             // the promise
//             return Promise.reject('Question already in use');
//         }
//     })
//})
