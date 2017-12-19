var raspi = require('raspi-io')
var five = require('johnny-five')
var control = {
    pins: [21,22,23,24],
    instances: [new five.Pin(21),new five.Pin(22),new five.Pin(23),new five.Pin(24)],
    moves: {
        moveForward() {
            this.instances[0].high()
            this.instances[1].low()
            this.instances[2].high()
            this.instances[3].low()
        },
        moveBack() {
            this.instances[0].low()
            this.instances[1].high()
            this.instances[2].low()
            this.instances[3].high()
        },
        turnLeft() {
            this.instances[0].high()
            this.instances[1].low()
            this.instances[2].low()
            this.instances[3].high()
        },
        turnRight() {
            this.instances[0].low()
            this.instances[1].high()
            this.instances[2].high()
            this.instances[3].low()
        }

    },
    init(client) {
        client.on('forward',() => {
            this.moves.moveForward()
        })
        client.on('back',() => {
            this.moves.moveBack()
        })
        client.on('left',() => {
            this.moves.turnLeft()
        })
        client.on('right',() => {
            this.moves.turnRight()
        })
    }
}

module.exports = control
