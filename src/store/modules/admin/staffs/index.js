import StaffApi from "@/backend/admin/staffs";

const STAFF_LIST = 'STAFF_LIST';
const STAFF = 'STAFF';

const state = {
  staff_list: [],
  total_staff: 0,
  staff: {},
};

export const mutations = {
  [STAFF_LIST] (state, data) {
    state.staff_list = data.staffs;
    state.total_staff = data.total_staff;
  },
  [STAFF] (state, data) {
    state.staff = data
  },
};

export const actions = {
  async getList({ commit }, params) {
    await StaffApi.getList(params || {}).then((response) => {
      let staffList = response.data
      commit(STAFF_LIST, staffList);
    }).catch(error => {
      console.error(error)
    })
  },
  async showSatff({ commit }, staffId) {
    await StaffApi.showStaff(staffId).then((response) =>{
      commit(STAFF, response.data)
    }).catch(error => {
      console.error(error)
    })
  }
};

export const getters = {
  staffList: state => state.staff_list,
  totalStaff: state => state.total_staff,
  staff: state => state.staff,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};
