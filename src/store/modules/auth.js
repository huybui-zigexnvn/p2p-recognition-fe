const state = {
  loginFailedMessage: ''
}

const getters = {
  loginFailedMessage: state => state.loginFailedMessage,
  isAuthenticated: state => state.auth
}

const actions = {
  setLoginFailedMessage({commit}){
    commit('setLoginFailedMessage')
  }
}

const mutations = {
  setLoginFailedMessage(state) {
    state.loginFailedMessage = 'Email or password is wrong'
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
