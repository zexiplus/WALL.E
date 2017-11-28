var socket = require('socket.io')
var http = require('http')
var cp = require('child_process')
var five = require('johnny-five')
var Raspi = require('raspi-io')

//turn on camera
cp.exec("/home/pi/software/mjpg-streamer/mjpg-streamer-experimental/mjpg_streamer -i '/home/pi/software/mjpg-streamer/mjpg-streamer-experimental/input_uvc.so -d /dev/video0 -n -y -f 25 -r 640x480' -o '/home/pi/software/mjpg-streamer/mjpg-streamer-experimental/output_http.so -n -w /usr/local/www'") 

var server = http.createServer()
var io = socket(server)


var board = new five.Board({
  io: new Raspi,
  repl: false
})
  board.on('ready',function() {
    var {ledOne,ledTwo} = require('./modules/led.js')
    var {servo,camera} = require('./modules/camera.js')
    var thermometer = require('./modules/thermometer.js')
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
