import AuthApi from "@/backend/auth";
const state = {
  password_changed: false
};

export const mutations = {
  PASSWORD_CHANGED(state, data) {
    state.password_changed = data
  }
};

export const actions = {
  async getPasswordChanged({ commit }) {
    AuthApi.getCurrentUser({}).then((response) => {
      let currentUser = response.data
      commit('PASSWORD_CHANGED', currentUser);
    }).catch(error => {
      console.error(error)
    })
  }
};

export const getters = {
  passwordChanged: state => state.password_changed,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
