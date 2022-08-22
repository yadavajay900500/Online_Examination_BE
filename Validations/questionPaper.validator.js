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
              throw `Two option are not same ===> ${sameOption} `
            }
            }
          }}
          
      else {
            throw `provide 4 option only`
          }
          
  })
  ]
}
