import Vue from 'vue';
import VueRouter from 'vue-router';
import GUIChat from '../views/GUIChat';
import IdentityVerificationView from '../views/IdentityVerificationView';
import ErrorView from '../views/ErrorView';
import Register from '../views/register';

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
  },
  {
    name: 'Error',
    path: '/error',
    component: ErrorView
  },
  {
    name: 'Register',
    path: '/signup',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
    routes
})

export default router;
