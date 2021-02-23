import Vue from 'vue';
import VueRouter from 'vue-router';
import GUIChat from '../views/GUIChat';


Vue.use(VueRouter)

const routes = [
  {
    path: '/chat',
    name: 'Chat',
    component: GUIChat
  }
]

const router = new VueRouter({
  mode: 'history',
  base: 'localhost:8080',
  routes
})

export default router;
