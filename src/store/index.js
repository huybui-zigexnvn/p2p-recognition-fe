import { createStore } from 'vuex'
import adminStaffs from './modules/admin/staffs'
import currentUser from './modules/currentUser'
import loader from './modules/loader'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
  },
  actions: {},
  modules: {
    adminStaffs,
    currentUser,
    loader
  },
})
