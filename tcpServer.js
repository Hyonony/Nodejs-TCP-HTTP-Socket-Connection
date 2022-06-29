const net = require('net')
require('dotenv').config();
var tcp_port = process.env.TCP_PORT;

require('./httpServer');


var clients = []; //tcp clients 객체

// Start a TCP Server
net.createServer(function (socket) {
  socket.setEncoding('utf-8');
  
  // Identify this clients
  socket.name = socket.remoteAddress + ":" + socket.remotePort 

  // Put this new client in the list
  clients.push(socket);
  
  // Send a nice welcome message and announce
  // socket.write("Welcome " + socket.name + "\n");
  TcpBroadCast(socket.name + " joined\n", socket);
  
  
  // Handle incoming messages from clients.
  socket.on('data', function (data) {
    // socket.write(Data);
    // console.log(data)
    // socket.write()
    TcpBroadCast(data, socket);
    // TcpBroadCast(Data, socket);
    // Data = data.write(Data);
    
  });
  
  // Remove the client from the list when it leaves
  socket.on('close', ()=>{
    console.log('client disconnected')
  })
  socket.on('end', function () {
    clients.splice(clients.indexOf(socket), 1);
    TcpBroadCast(socket.name + " left\n");
  });
  
  // Send a message to all clients
  function TcpBroadCast(message, sender) {
    clients.forEach(function (client) {
      // Don't want to send it to sender
      if (client === sender) return;
      client.write(message);
    });
    // Log it to the server output too
    process.stdout.write(message)
  }

}).listen(tcp_port, ()=>{
  console.log(`TCP Server is listening on port ${tcp_port}`);
});


