import AuthApi from "@/backend/auth";

const CURRENT_USER = 'CURRENT_USER';

const state = {
  current_user: {}
};

export const mutations = {
  [CURRENT_USER] (state, data) {
    state.current_user = data;
  }
};

export const actions = {
  async getCurrentUser({ commit }, params) {
    await AuthApi.getCurrentUser({}).then((response) => {
      let currentUser = response.data
      commit(CURRENT_USER, currentUser)
    }).catch(error => {
      console.error(error)
    })
  }
};

export const getters = {
  current_user: state => state.current_user
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
