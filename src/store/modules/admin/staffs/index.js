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
  async getList({ commit }, pageNumber, perPage) {
    if(perPage == undefined) {
      perPage = 5
    }
    axios.get('http://localhost:3000/api/v1/staffs', { params: { page: pageNumber, per_page: perPage } }).then((response) => {
      console.log(pageNumber)
      console.log(perPage)
      let staffList = response.data
      commit(STAFF_LIST, staffList);
    }).catch(error => {
      console.error(error)
    })
  },
  createStaff({ commit, dispatch }, newStaff) {
    axios.post('http://localhost:3000/api/v1/create_staff', { staff: newStaff }).then(() => {
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
