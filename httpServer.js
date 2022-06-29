
const net = require('net')
      express = require('express')
      app = express()
      httpserver = require('http').createServer(app),
      io = require('socket.io')(httpserver),
      require('dotenv').config(),
      http_PORT = process.env.http_PORT;
      tcp_port = process.env.tcp_port;
      client = net.connect({port :tcp_port, host : 'localhost' });

httpserver.listen(http_PORT, ()=> {
    console.log(`HTTP Server is listening on port ${http_PORT}`)
  });

app.use(express.static(__dirname + '/static'));
app.get('/', (req, res) =>{
  res.sendFile(__dirname + '/index.html');
})

io.on('connection', (socket)=> {
  socket.on('message', (message)=>{
    client.write(`"${message}"`)
  })
});