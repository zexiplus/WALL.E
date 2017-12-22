var raspi = require('raspi-io')
var five = require('johnny-five')
var control = {
    pins: [21,22,23,24],
    instances: [new five.Pin(21),new five.Pin(22),new five.Pin(23),new five.Pin(24)],
    setHigh(arr) {
    	arr.forEach((item,index) => {
	    item ? this.instances[index].high() : this.instances[index].low()
	})
    },
    move(direc) {
	switch(direc) {
	    case 'forward':
	    this.setHigh([1,0,1,0])
	    break;
	    case 'back':
	    this.setHigh([0,1,0,1])
	    break;
	    case 'left':
	    this.setHigh([1,0,0,1])
	    break;
	    case 'right':
	    this.setHigh([0,1,1,0])
	    break;
	}
    },
    stop() {
	    this.instances[0].low()
            this.instances[1].low()
            this.instances[2].low()
            this.instances[3].low()
    },
    init(client) {
        client.on('driveMoto',direc => {
	    console.log('I am driving')
            this.move(direc)
        })
        client.on('stopMoto',direc => {
	    console.log('I am stop')
            this.stop()
        })
        
    }
}

module.exports = control
