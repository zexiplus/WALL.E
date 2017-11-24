var five = require('johnny-five')
var Raspi = require('raspi-io')
class Led {
    constructor(pin) {
        this.pin = pin
        this.instance = new five.Led(pin)
    }
    bindClient(client) {
        this.client = client
        return this
    }
    bindHandler(eventName,handler) {
        this.client.on(eventName,handler)
        return this
    }
}
var ledOne = new Led(28),
    ledTwo = new Led(29)
ledOne.bindHandler('led1turnOn',function() {
    this.instance.on()
})
ledOne.bindHandler('led1turnOff',function() {
    this.instance.off()
})
ledOne.bindHandler('led1adjustBright',function(arg) {
    this.instance.brightness(arg)
})
ledOne.bindHandler('led1blink',function(arg) {
    this.instance.blink(arg)
})
module.exports = {
    ledOne,
    ledTwo
}
