var ipArr = ['http://192.168.17.149','http://192.168.41.89']
var index = 0
const cameraUrl = `${ipArr[index]}:8080/?action=stream`
const socketIp = `${ipArr[index]}:3000`
const serverIp = `${ipArr[index]}:3030`
const api = Object.freeze({
    temperture:{
        saveTemperature: `${serverIp}/temperature/saveTemperature`,
        getTemperature: `${serverIp}/temperature/getTemperature`
    },
    led: {

    },
    gps: {

    },

})

export {
    api,
    cameraUrl,
    socketIp,
    serverIp
}
