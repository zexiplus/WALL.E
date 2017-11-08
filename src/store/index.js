import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex)
const store = new vuex.Store({
    namespaced: true,
    state: {
        routerList: [
            {name: 'home'},
            {name: 'camera'},
            {name: 'thermometer'},
            {name: 'control'},
            {name: 'accelerometer'},
            {name: 'led'}
        ]
    },
    mutations: {

    },
    actions: {

    }
})
export default store