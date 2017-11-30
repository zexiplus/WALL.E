var five = require('johnny-five')
var Raspi = require('raspi-io')
var board = new five.Board({
	io: new Raspi,
	repl: false
})
board.on('ready',function() {
	var pin = new five.Pin({pin:3,mode:3})
})
