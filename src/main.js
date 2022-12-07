import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import { iconsSet as icons } from '@/assets/icons'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import ApiService from "@/backend/api_services";
import { createI18n } from 'vue-i18n'
import vi from "./locales/vi.json";
import en from "./locales/en.json";

const API_URL = `${process.env.VUE_APP_API_URL}/api/v1`;
ApiService.init(API_URL);
import {withAuth, withoutAuth} from './backend/axios'
import * as VeeValidate from 'vee-validate'

const app = createApp(App)

const i18n = createI18n({
  locale: "en",
  fallbackLocale: "en",
  messages: { vi, en },
});

app.use(store)
app.use(router)
app.use(CoreuiVue)
app.use(i18n)
app.use(VeeValidate)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.mount('#app')
app.config.globalProperties.$withAuth = withAuth;
app.config.globalProperties.$withoutAuth = withoutAuth;
