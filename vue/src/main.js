import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router/router';
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client'


Vue.use(new VueSocketIO({
  debug: true,
  connection: SocketIO('http://localhost:3000/caesar-api'),
  
}))

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
