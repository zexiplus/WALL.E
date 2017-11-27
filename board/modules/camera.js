var five = require('johnny-five')
var Raspi = require('raspi-io')

var pin = new five.Pin({pin:1,mode:4}) //设置1引脚为伺服电机模式
var servo = {
    pin: pin,
    instance: new five.Servo({pin:1,startAt:0}),
    init(client) {
        client.on('turnCamera',argv => {
           this.instance.to(argv)
        })        
    }
}
var camera = {}
module.exports = {
    servo,
    camera
}