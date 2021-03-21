import Vue from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import router from './router/router';
import {io} from 'socket.io-client';

Vue.prototype.$username = 'mr_blue'; //This has to be initialized as empty string
Vue.prototype.$contacts = ['mr_green', 'neo', 'morpheo']; //This has to be initialized as empty string


Vue.use(io('http://localhost:3000/caesar-api', {autoConnect: false}));

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
