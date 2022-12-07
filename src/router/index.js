import { createRouter, createWebHistory } from 'vue-router'
import ListStaff from '@/components/ListStaff'
import Login from '@/views/Login'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: ListStaff},
  {
    path: '/login', 
    name: 'Login',
    component: Login
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && !window.localStorage.getItem('token')) next({name: 'Login'})
  else if (to.name == 'Login' && window.localStorage.getItem('token')) next('/')
  else next()
})
