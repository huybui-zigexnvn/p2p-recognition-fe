import axios from "axios";

const STAFF_LIST = 'STAFF_LIST';

const state = {
  staff_list: []
};

export const mutations = {
  [STAFF_LIST] (state, data) {
    state.staff_list = data;
  },

};

export const actions = {
  getList({ commit }) {
    axios.get('http://localhost:3000/api/v1/staffs').then((response) => {
      let staffList = response.data
      commit(STAFF_LIST, staffList);
    }).catch(error => {
      console.error(error)
    })
  },
};

export const getters = {
  staffList: state => state.staff_list,
  
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};