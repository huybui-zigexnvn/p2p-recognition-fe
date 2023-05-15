import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login'
import qs from 'qs';
import ChangePassword from '@/views/ChangePassword'
import pageNotFound from '@/views/pageNotFound'
import listStaff from '@/views/admin/staffs/ListStaffs.vue'
import Profile from '@/views/users/profile'
import editProfile from '@/views/users/editProfile'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/profile' },
  {
    path: '/',
    name: 'staffs',
    path: '/admin/staffs',
    meta: { layout:"defaultLayout" },
    component: listStaff
  },
  {
    path: '/admin/staffs/:id',
    name: 'Staff Profile',
    meta: { layout:"defaultLayout" },
    component: () => import('@/views/admin/staffs/StaffProfile.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/change_password',
    name: 'ChangePassword',
    component: ChangePassword
  },
  {
    path: '/profile',
    name: 'profile',
    meta: { layout:"defaultLayout" },
    component: Profile
  },
  {
    path: '/edit-profile',
    name: 'Edit Profile',
    meta: { layout:"defaultLayout" },
    component: editProfile
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
