

const fs = require('fs');

const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');
const config = require('./config');
const socketIO = require('socket.io');
const bodyParser = require('body-parser')




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

app.use(cors());
// routes
app.use(require('./routes/index'));
app.use("/api/data",require('./routes/data'));



// starting the server
/** 
const server = app.listen(app.get('port'), () => {
    console.log(`Server on port ${app.get('port')}`);
});

*/

const server = app.listen(8080, () => {
  console.log(`Server on port ${8080}`);
});




  

//websockets
 
const io = socketIO.listen(server);

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