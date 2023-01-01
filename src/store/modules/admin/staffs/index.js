import axios from "axios";
import { useRouter } from 'vue-router'


const STAFF_LIST = 'STAFF_LIST';
// const STAFF = 'STAFF';
const router = useRouter();

const state = {
  staff_list: [],
  staff: {
    email: '',
    name: '',
    password: ''
  }
};

export const mutations = {
  [STAFF_LIST] (state, data) {
    state.staff_list = data;
  },
  // [STAFF] (state, data) {
  //   state.staff.email = data;
  // }
};

export const actions = {
  async getList({ commit }) {
    axios.get('http://localhost:3000/api/v1/staffs').then((response) => {
      let staffList = response.data
      commit(STAFF_LIST, staffList);
    }).catch(error => {
      console.error(error)
    })
  },
  createStaff({ state }) {
    axios.post('http://localhost:3000/api/v1/create_staff', {
      email: state.staff.email,
      name: state.staff.name,
      password: state.staff.password,
    }).then((response) => {
      let staff = response.data
      // commit(STAFF, staff);
      if(staff.success) {
        router.push({name: 'Home'})
      }
    }).catch(error => {
      console.error(error)
    })
  },
};

export const getters = {
  staffList: state => state.staff_list,
  staff: state => state.staff,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};