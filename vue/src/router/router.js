import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/HomePage'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: HomePage
  },
]

const router = new VueRouter({
  mode: 'history',
  base: 'localhost:8080',
  routes
})

export default router;
