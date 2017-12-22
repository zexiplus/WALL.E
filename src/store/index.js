import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
const store = new vuex.Store({
    namespaced: true,
    state: {
        serverAddress: localStorage.getItem('serverAddress') || 'http://192.168.17.149:3030',
        socketAddress: localStorage.getItem('socketAddress') || 'http://192.168.17.149:3000',
        cameraAddress: localStorage.getItem('cameraAddress') || 'http://192.168.17.149:8080/?action=stream',
    },
    mutations: {
        changeSocket(state,arg) {
            state.socketAddress = arg
            localStorage.setItem('socketAddress',arg)
        },
        changeServer(state,arg) {
            state.serverAddress = arg
            localStorage.setItem('serverAddress',arg)
        },
        closeServer(state,arg) {
            state.serverAddress = ''
            localStorage.setItem('serverAddress','')
        },
        changeCamera(state,arg) {
            state.cameraAddress = arg
            localStorage.setItem('cameraAddress',arg)
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
