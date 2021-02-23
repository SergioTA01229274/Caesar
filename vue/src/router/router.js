import Vue from 'vue';
import VueRouter from 'vue-router';
import GUIChat from '../views/GUIChat';
import IdentityVerificationView from '../views/IdentityVerificationView';

Vue.use(VueRouter)

const routes = [
  {
    path: '/chat',
    name: 'Chat',
    component: GUIChat
  },
  {
    path: '/verification',
    name: 'Identity Verification',
    component: IdentityVerificationView
  },
  {
    name: 'Login',
    path: '/',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: 'localhost:8080',
  routes
})

export default router;
