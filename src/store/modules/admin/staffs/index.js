import StaffApi from "@/backend/admin/staffs";

const STAFF_LIST = 'STAFF_LIST';

const state = {
  staff_list: [],
  total_staff: 0,
};

export const mutations = {
  [STAFF_LIST] (state, data) {
    state.staff_list = data.staffs;
    state.total_staff = data.total_staff;
  }
};

export const actions = {
  async getList({ commit }, params) {
    StaffApi.getList(params || {}).then((response) => {
      let staffList = response.data
      commit(STAFF_LIST, staffList);
    }).catch(error => {
      console.error(error)
    })
  }
};

export const getters = {
  staffList: state => state.staff_list,
  totalStaff: state => state.total_staff,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
