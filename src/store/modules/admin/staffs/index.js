import StaffApi from "@/backend/admin/staffs";

const STAFF_LIST = 'STAFF_LIST';

const state = {
  staff_list: []
};

export const mutations = {
  [STAFF_LIST] (state, data) {
    state.staff_list = data;
  }
};

export const actions = {
  async getList({ commit }, params) {
    if (params == undefined) params = {}

    StaffApi.getList(params).then((response) => {
      let staffList = response.data
      commit(STAFF_LIST, staffList);
    }).catch(error => {
      console.error(error)
    })
  }
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
