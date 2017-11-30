var five = require('johnny-five')
var raspi = require('raspi-io')
var thermometer = {
        controllerName: 'MPU6050',
	instance: new five.Thermometer({
		controller: 'MPU6050'
	}),
	init(client) {
	    client.emit('changeT',this.instance.celsius)
	    this.instance.on('change',function() {
	        client.emit('changeT',this.celsius)
	        console.log('now T',this.celsius)
	    })
	}
}
module.exports = thermometer
