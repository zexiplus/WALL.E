require('./check-versions')()
var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}
var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack.dev.conf')
var socket = require('socket.io')
var http = require('http')
var cp = require('child_process')
if(process.argv.indexOf('ras') > -1) {
  cp.exec("/home/pi/software/mjpg-streamer/mjpg-streamer-experimental/mjpg_streamer -i '/home/pi/software/mjpg-streamer/mjpg-streamer-experimental/input_uvc.so -d /dev/video0 -n -y -f 25 -r 640x480' -o '/home/pi/software/mjpg-streamer/mjpg-streamer-experimental/output_http.so -n -w /usr/local/www'")
}


// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var server = http.createServer(app)
var io = socket(server)

if(process.argv.indexOf('ras') > -1) {
  var five = require('johnny-five')
  var Raspi = require('raspi-io')
  var board = new five.Board({
    io: new Raspi,
      repl: false
  })
  board.on('ready',function() {
    console.log('board init successfully')
    var led = new five.Led(29)
    var servoPin = new five.Pin({pin:1,mode:4})
    var servo = new five.Servo({pin:1,startAt:0})
    io.on('connection',function(client) {
      console.log('websocket success')
      client.on('turnOn',function() {
        console.log('on')
        led.on()
      })
      client.on('turnOff',function() {
        led.off()
        console.log('off')
      })
      client.on('turnCamera',function(arg) {
	       servo.to(arg)
      })
    })
  })
}


io.listen(3000) //websocket listen port
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: false,
  heartbeat: 2000
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}
