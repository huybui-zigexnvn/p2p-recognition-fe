import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout'
import Login from '@/views/Login'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/admin/list_staffs',
    children: [
      {
        path: '/admin/list_staffs',
        name: 'List Staffs',
        component: () => import('@/views/admin/ListStaffs.vue'),
      }
    ]
  },
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
