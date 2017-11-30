var socket = require('socket.io')
var http = require('http')
var cp = require('child_process')
var five = require('johnny-five')
var Raspi = require('raspi-io')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var express = require('express')
var cors = require('cors')

//turn on camera
cp.exec("/home/pi/software/mjpg-streamer/mjpg-streamer-experimental/mjpg_streamer -i '/home/pi/software/mjpg-streamer/mjpg-streamer-experimental/input_uvc.so -d /dev/video0 -n -y -f 25 -r 640x480' -o '/home/pi/software/mjpg-streamer/mjpg-streamer-experimental/output_http.so -n -w /usr/local/www'") 

var app = express() 
var server = http.createServer(app)
var io = socket(server)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extend: false}))
app.use(cookieParser())
app.use(cors())
app.post('/board/led',function(req,res,next) {
    console.log('req is ',req)
    res.end(JSON.stringify({
      hello: 'world'
    }))
})

server.listen(3030)


var board = new five.Board({
  io: new Raspi,
  repl: false
})
board.on('ready',function() {
  var {ledOne,ledTwo} = require('./board/led.js')
  var {servo,camera} = require('./board/camera.js')
  var thermometer = require('./board/thermometer.js')
  console.log('board init successfully')
  io.on('connection',function(client) {
    console.log('websocket connect successfully')
    ledOne.init(client)
    ledTwo.init(client)
    servo.init(client)
    thermometer.init(client)
  })
})

io.listen(3000) //websocket listen port
