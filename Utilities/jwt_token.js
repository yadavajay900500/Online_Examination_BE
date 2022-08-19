const  jwt = require('jsonwebtoken');
const secret =  "All_is_well"


// jwt.sign({
//     exp: Math.floor(Date.now() / 1000) + (60 * 60),
//     data: 'foobar'
//   }, ');
//   console.log("ttt",ttt)
// exports.generate_token = () => {
//     return jwt.sign({
//         exp: Math.floor (`${60 * 15}s`),
//         data: 'foobar'
//     },secret);
//     console.log(">>>>");
//   };
  exports.generate_token = (data, expiresIn = "1d") => {
    console.log("jjjjjjjjjjj",expiresIn)
    return jwt.sign({ data}, "All_is_well", { expiresIn });
  };
// exports.token_parser = async(req, res, next) => {

//   const {token} = req.query;
//   try {
//     const decoded = await Promise.resolve(jwt.verify(token, secret));
//      req.body.token = decoded;
//      next();
//   } catch (error) {
//     next(error);
//   }
  
//}