import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../components/HomePage';
import GUIChat from '../views/GUIChat';


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
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
