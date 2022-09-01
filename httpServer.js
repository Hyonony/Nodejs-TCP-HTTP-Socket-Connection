
const net = require('net')
const serveStatic = require('serve-static')
      express = require('express') // 웹 프레임 워크
      app = express()
      httpserver = require('http').createServer(app), //httpserver
      io = require('socket.io')(httpserver), //socket.io
      require('dotenv').config(), // dotenv 환경 변수 관리하기 (.env파일)
      path = require('path')
      bodyParser = require('body-parser')
      http_PORT = process.env.http_PORT // .env
      tcp_port = process.env.tcp_port  // .env
      client = net.connect({port :tcp_port, host : 'localhost' })
      //TCP <-> Http 연결에 필요한 객체

// httpserver를 Linsten 상태로 둠
httpserver.listen(http_PORT, ()=> {
    console.log(`HTTP Server is listening on port ${http_PORT}`)
  });

// Express 사용하기 위함. 나중에는 결국 앱에서 프론트 역할을 하기에 사용하지 않을 것.
// 가상의 페이지로 테스트 용으로 사용하는 것.

app.use(bodyParser.urlencoded({extended:false}))

app.use(bodyParser.json())
app.use('/public', serveStatic(path.join(__dirname, 'view')))

//socket.io 연결됐을 경우 아래 내용이 실행됨
io.on('connection', (socket)=> {
  //연결되면 socket 파라미터에 socket 데이터가 쌓임

  // console.log(socket);
  // 확인하려면 위에 터미널에 찍어볼 수 있음

  socket.on('message', (message)=>{
    // message라는 약속으로 통신을 하는 것 프론트와 같은 네임을 가져야함
    
    client.write(`"${message}"`)
    //TCP <-> Http 연결에 필요한 객체를 사용하여 TcpBroadCast 함수로 데이터 전송
  })
});
