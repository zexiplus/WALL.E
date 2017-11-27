
import Vue from 'vue'
import App from './App'
import router from './router'
import vueResource from 'vue-resource'
import VueSocketio from 'vue-socket.io'
import store from '@s'
import {raspiIp,raspiIpWire} from '&c'
import ElementUI from 'element-ui'
import plugins from '@p'
import 'element-ui/lib/theme-chalk/index.css'
import '@a/style/reset.css'

Vue.use(vueResource)
Vue.use(ElementUI)
Vue.use(VueSocketio,raspiIpWire)
Vue.use(plugins)
/*edit*/
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  store,
  sockets: {
    connect() {
        console.log('webSocket client connect successfully')
    }
  },
  template: '<App/>',
  components: { App }
}).$mount('#app')
