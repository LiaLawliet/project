let app = require('app');
let http = require('http');
let port = normalizePort(process.env.PORT || '4200');

app.set('port', port);
let server = http.createServer(app);


let io = require('socket.io').listen(server);


io.on('connection',(socket)=>{
  console.log('new connection made')
})