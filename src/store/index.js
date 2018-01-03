import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
const store = new vuex.Store({
    namespaced: true,
    state: {
        serverAddress: localStorage.getItem('serverAddress') || '192.168.17.149:3030',
        serverType: localStorage.getItem('serverType') || 'http://',
        socketAddress: localStorage.getItem('socketAddress') || '192.168.17.149:3000',
        socketType: localStorage.getItem('socketType') || 'http://',
        cameraAddress: localStorage.getItem('cameraAddress') || '192.168.17.149:8080/?action=stream',
        cameraType: localStorage.getItem('cameraType') || 'http://',
        currRouteName: localStorage.getItem('currRouteName') || 'integration'
    },
    mutations: {
        saveRouteName(state,arg) {
            state.currRouteName = arg
            localStorage.setItem('currRouteName',arg)
        },
        changeSocket(state,arg) {
            state.socketAddress = arg
            localStorage.setItem('socketAddress',arg)
        },
        changeSocketType(state,arg) {
            state.socketType = arg
            localStorage.setItem('socketType',arg)
        },
        changeServer(state,arg) {
            state.serverAddress = arg
            localStorage.setItem('serverAddress',arg)
        },
        changeServerType(state,arg) {
            state.serverType = arg
            localStorage.setItem('serverType',arg)
        },
        closeServer(state,arg) {
            state.serverAddress = ''
            localStorage.setItem('serverAddress','')
        },
        changeCamera(state,arg) {
            state.cameraAddress = arg
            localStorage.setItem('cameraAddress',arg)
        },
        changeCameraType(state,arg) {
            state.cameraType = arg
            localStorage.setItem('cameraType',arg)
        },
        closeCamera(state,arg) {
            state.cameraAddress = ''
            localStorage.setItem('cameraAddress','')
        }
    },
    actions: {

    }
})
export default store
