import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout'
import Login from '@/views/Login'
import ChangePassword from '@/views/ChangePassword'
import store from '@/store'

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
  },
  {
    path: '/change_password', 
    name: 'ChangePassword',
    component: ChangePassword
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
  else if (to.name == 'Login' && window.localStorage.getItem('token') && store.getters["authen/passwordChanged"]) next('/')
  else if (to.name !== 'ChangePassword' && !!window.localStorage.getItem('token') && !store.getters["authen/passwordChanged"]) next({name: 'ChangePassword'})
  else next()
})
