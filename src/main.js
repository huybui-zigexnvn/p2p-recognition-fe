import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import {withAuth, withoutAuth} from './backend/axios'
import * as VeeValidate from 'vee-validate'

const app = createApp(App)
app.use(store)
app.use(router)
app.use(CoreuiVue)
app.use(VeeValidate)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.mount('#app')
app.config.globalProperties.$withAuth = withAuth;
app.config.globalProperties.$withoutAuth = withoutAuth;
