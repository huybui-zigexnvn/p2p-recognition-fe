import axios from "axios";


const STAFF_LIST = 'STAFF_LIST';

const state = {
  staff_list: [],
  visible_modal: false,
};

export const mutations = {
  [STAFF_LIST] (state, data) {
    state.staff_list = data;
  },
  closeModal(state) {
    state.visible_modal = false;
  },
  openModal(state) {
    state.visible_modal = true;
  },
};

export const actions = {
  async getList({ commit }) {
    axios.get(`${process.env.VUE_APP_API_URL}/api/v1/staffs`).then((response) => {
      let staffList = response.data
      commit(STAFF_LIST, staffList);
    }).catch(error => {
      console.error(error)
    })
  },
  createStaff({ commit, dispatch }, newStaff) {
    axios.post(`${process.env.VUE_APP_API_URL}/api/v1/create_staff`, { staff: newStaff }).then(() => {
      dispatch('getList');
      commit('closeModal');
    }).catch(error => {
      console.error(error)
    })
  },
  closeModal({ commit }) {
    commit('closeModal')
  },
  openModal({ commit }) {
    commit('openModal')
  }
};

export const getters = {
  staffList: state => state.staff_list,
  visibleModal: state => state.visible_modal,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
