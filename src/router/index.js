import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/home')
  },
  {
    path: '/fee/:allPrice',
    name: 'Fee',
    component: () => import(/* webpackChunkName: "home" */ '@/views/fee')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
