const server = require("./server");
const PORT = 4040;

server.listen(PORT,()=> {
    console.log(`Server Started on http://localhost:${PORT}`);
})
