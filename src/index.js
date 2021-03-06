

const fs = require('fs');


const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');

const bodyParser = require('body-parser')






 app.use(cors(
  config.application.cors.server
));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});
//app.use(cors());
app.options('*', cors());

// settings
//app.set('port', process.env.PORT || 3000)
//const server = app.listen(8080)
//app.set('port', process.env.PORT || 8080)

app.set('json spaces', 2);
// middlewarese
app.use(morgan('dev'));
app.use(express.urlencoded({extended: true, limit: '1000mb'}));

//app.use(express.json());
//app.use(bodyParser.json()); 
//app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json({limit: '1000mb', extended: true}))

app.use(bodyParser.json({limit: '200mb'}));
app.use(bodyParser.urlencoded({limit: '200mb', extended: true, parameterLimit: 1000000}))
//app.use(express.bodyParser({limit: '50mb'}))


// routes
app.use(require('./routes/index'));
app.use("/api/data",require('./routes/data'));

var server = require("http").Server(app)
var io = require('socket.io')(server);




io.origins('*:*');
io.on('connection', (socket)=>{
  console.log("new connection")
  console.log("coneccion ",socket.id)
 


  socket.on("finish_game", (data) => {
    console.log("JUEGO TERMINADO");
    io.sockets.emit("finish_game_board", data);

  });

  socket.on("send_data", (data) => {
    io.sockets.emit("send", data);

  });

  socket.on("data", (data) => {
    io.sockets.emit("save_data",data)


  });
  socket.on("start_game", (data)=>{

    io.sockets.emit("start_game",data)
  });

});

var port = 8080
server.listen(port, () => {
  console.log(`Server on port ${port}`);
});


