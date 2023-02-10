import StaffApi from "@/backend/admin/staffs";

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
    StaffApi.getList({}).then((response) => {
      let staffList = response.data
      commit(STAFF_LIST, staffList);
    }).catch(error => {
      console.error(error)
    })
  },
  createStaff({ commit, dispatch }, newStaff) {
    StaffApi.create(newStaff).then(() => {
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
