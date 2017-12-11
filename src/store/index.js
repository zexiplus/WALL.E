import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
const store = new vuex.Store({
    namespaced: true,
    state: {
        serverIp: localStorage.getItem('serverIp') || 'http://192.168.17.149:3000',
        cameraIp: localStorage.getItem('cameraIp') || 'http://192.168.17.149:8080/?action=stream',
        globalSwitch: true,
        ledSwitch: true,
        cameraSwitch: true,
        thermometerSwitch: true,
        proximitySwitch: true,
        gpsSwitch: true,
        remoteControlSwitch: true,
        redRaySwitch: true
    },
    mutations: {
        changeRasSocketIp(state,arg) {
            state.serverIp = arg
            localStorage.setItem('serverIp',arg)
        },
        changeRasCameraIp(state,arg) {
            state.cameraIp = arg
            localStorage.setItem('cameraIp',arg)
        }
    },
    actions: {

    }
})
export default store
