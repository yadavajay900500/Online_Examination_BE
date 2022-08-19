//const server = require("../online_Exam/Utilities/webSocket");
const server = require("./server");
const PORT = process.env.PORT || 4040;

server.listen(PORT,()=> {
    console.log(`Server Started on http://localhost:${PORT}`);
})

