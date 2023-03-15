import { createRouter, createWebHistory } from 'vue-router'
import DefaultLayout from '@/layouts/DefaultLayout'
import Login from '@/views/Login'
import qs from 'qs';
import ChangePassword from '@/views/ChangePassword'
import pageNotFound from '@/views/pageNotFound'

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
  },
  {
    path: '/profile', 
    name: 'Profile',
    component: DefaultLayout,
    redirect: '/profile',
    children: [
      {
        path: '/profile',
        component: () => import('@/views/users/profile'),
      }
    ]
  },
  {
    path: '/edit-profile', 
    name: 'Edit Profile',
    component: DefaultLayout,
    redirect: '/edit-profile',
    children: [
      {
        path: '/edit-profile',
        component: () => import('@/views/users/editProfile'),
      }
    ]
  },
  {
    path: '/edit-password', 
    name: 'Edit password',
    component: DefaultLayout,
    redirect: '/edit-password',
    children: [
      {
        path: '/edit-password',
        component: () => import('@/views/users/editPassword'),
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*', 
    name: 'NotFound',
    component: pageNotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
  parseQuery(query) {
    return qs.parse(query);
  },
  stringifyQuery(query) {
    var result = qs.stringify(query);

    return result ? (result) : '';
  }
})


router.resolve({
  name: 'NotFound',
  params: { pathMatch: ['not', 'found'] },
}).href

export default router

router.beforeEach((to, from, next) => {
  if (to.name !== 'Login' && to.name !== 'ChangePassword' && to.name !== 'NotFound' && !window.localStorage.getItem('token')) next({name: 'Login'})
  else if (to.name == 'Login' && window.localStorage.getItem('token')) next('/')
  else next()
})
