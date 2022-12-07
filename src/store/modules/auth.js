const state = {
  auth: {
    isAuthenticated: window.localStorage.getItem('token') !== null
  }
}

const getters = {
  isAuthenticated: state => state.auth.isAuthenticated
}

const actions = {}

const mutations = {
  LOGOUT(state) {
    state.auth.isAuthenticated = !state.auth.isAuthenticated
    window.localStorage.removeItem('token');
  },
}

export default {
  state,
  getters,
  actions,
  mutations
}
