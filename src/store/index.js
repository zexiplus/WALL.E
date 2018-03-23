import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
const store = new vuex.Store({
    namespaced: true,
    state: {
        serverAddress: localStorage.getItem('serverAddress') ? localStorage.getItem('serverAddress').split(',') : ['http://','192.168.17.149:3030'],
        socketAddress: localStorage.getItem('socketAddress') ? localStorage.getItem('socketAddress').split(',') : ['http://','192.168.17.149:3000'],
        cameraAddress: localStorage.getItem('socketAddress') ? localStorage.getItem('cameraAddress').split(',') : ['http://','192.168.17.149:8080'],
        currRouteName: localStorage.getItem('currRouteName') || 'integration'
    },
    mutations: {
        saveRouteName(state,arg) {
            state.currRouteName = arg
            localStorage.setItem('currRouteName',arg)
        },
        changeSocket(state,arg) {
            state.socketAddress = arg
            localStorage.setItem('socketAddress',arg.join(','))
        },
        changeServer(state,arg) {
            state.serverAddress = arg
            localStorage.setItem('serverAddress',arg.join(','))
        },
        changeCamera(state,arg) {
            state.cameraAddress = arg
            localStorage.setItem('cameraAddress',arg.join(','))
        }
    },
    actions: {

    }
})
export default store
