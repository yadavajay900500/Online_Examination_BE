const express =  require('express');
const http =  require('http');
const WebSocket =  require('ws');
const PORT=1616
const app = express();
//initialize a simple http server
const server = http.createServer(app);

//initialize the WebSocket server instance
const wss = new WebSocket.Server({ server });

//console.log("ooooo",wss)
wss.on('connection', (ws) => {

   let t=setInterval(() => {
    const time=`${new Date().toLocaleDateString('en-GB',{hour:'2-digit',hour12:true})} 
    :${new Date().getMinutes()}
    :${new Date().getSeconds()}`
    //console.log(time)
        ws.send(time);
     }, 1000);
    //send immediatly a feedback to the incoming connection    
    
});
server.listen(PORT,()=> {
    console.log(`timeServer Started on http://localhost:${PORT}`);
})


module.exports = server;
