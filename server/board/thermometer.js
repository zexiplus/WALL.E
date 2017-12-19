var five = require('johnny-five')
var raspi = require('raspi-io')
var thermometer = {
  controllerName: 'MPU6050',
	instance: new five.Thermometer({
		controller: 'MPU6050'
	}),
	init(client) {
	    var that = this
	    this.instance.on('change',function() {
	        client.emit('changeT',this.celsius)
	    })
	    client.on('updateTemperature',function() {
		    client.emit('changeT',that.instance.celsius)
	    })
	}
}
module.exports = thermometer
