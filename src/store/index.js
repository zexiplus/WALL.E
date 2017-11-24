import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
const store = new vuex.Store({
    namespaced: true,
    state: {
        rasSocketIp: 'http://192.168.17.149:3000',
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
        
    },
    actions: {

    }
})
export default store