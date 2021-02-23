import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../components/HomePage';
import GUIChat from '../views/GUIChat';
import IdentityVerificationView from '../views/IdentityVerificationView';

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
  },
  {
    path: '/verification',
    name: 'Identity Verification',
    component: IdentityVerificationView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: 'localhost:8080',
  routes
})

export default router;
