const state = {
  loadingPageStatus: "off",
};

export const mutations = {
  ['TOOGLE_LOADING_STATUS'] (state, status) {
    state.loadingPageStatus = status;
  }
};

export const actions = {
  turnOn({ commit }) {
    commit('TOOGLE_LOADING_STATUS', 'on')
  },
  turnOff({ commit }){
    commit('TOOGLE_LOADING_STATUS', 'off')
  }
};

export const getters = {
  loadingPageStatus: state => state.loadingPageStatus,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
