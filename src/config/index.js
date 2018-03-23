var ipArr = ['http://192.168.17.149','http://192.168.41.89']
var index = 0
const cameraUrl = `${ipArr[index]}:8080/?action=stream`
const serverIp = ''
const api = Object.freeze({
    temperture:{
        saveTemperature: '/temperature/saveTemperature',
        getTemperature: '/temperature/getTemperature'
    },
    led: {

    },
    gps: {

    }
})

export {
    api,
    cameraUrl,
    serverIp
}
