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
var router = require('./service')
var publicWeb = process.argv.slice(2)[0] == 1
if(publicWeb) {
    cp.exec('ngrok http 8080',function(err,stdout,stderr) {console.log('camera' + stdout)})
    cp.exec('ngrok http 3030',function(err,stdout,stderr) {console.log('server' + stdout)})
    cp.exec('ngrok http 3000',function(err,stdout,stderr) {console.log('socket' + stdout)})
}
//turn on camera
cp.exec("/home/pi/Software/mjpg-streamer/mjpg-streamer-experimental/mjpg_streamer -i '/home/pi/Software/mjpg-streamer/mjpg-streamer-experimental/input_uvc.so -d /dev/video0 -n -y -f 25 -r 600x400' -o '/home/pi/Software/mjpg-streamer/mjpg-streamer-experimental/output_http.so -n -w /usr/local/www'") 
console.log('camera listen at 8080 port')
console.log('server listen at 3030 port')
console.log('websocket listen at 3000 port')

var app = express() 
var server = http.createServer(app)
var io = socket(server)

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extend: false}))
app.use(cookieParser())
app.use(cors())
app.use(router)

server.listen(3030) //server listen port

var board = new five.Board({
  io: new Raspi,
  repl: false
})
board.on('ready',function() {
  var {ledOne,ledTwo} = require('./board/led.js')
  var {servo,camera} = require('./board/camera.js')
  var thermometer = require('./board/thermometer.js')
  var control = require('./board/control.js')
  console.log('board init successfully')
  io.on('connection',function(client) {
    console.log('websocket connect successfully')
    ledOne.init(client)
    ledTwo.init(client)
    servo.init(client)
    thermometer.init(client)
    control.init(client)
  })
})

io.listen(3000) //websocket listen port
