const  jwt = require('jsonwebtoken');
const secret =  "All_is_well"

  exports.generate_token = (data, expiresIn = "1d") => {
    console.log("jjjjjjjjjjj",expiresIn)
    return jwt.sign({ data}, "All_is_well", { expiresIn });
  };
