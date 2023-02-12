<template>
  <div class="d-flex">
    <div class="input-group">
      <div class="form-search d-flex align-items-center">
        <CIcon icon="cilSearch" size="xl" />
        <input class="form-control search-input" :placeholder="$t('admin.list_staff.search_placeholder')" v-model="searchValue" @keyup="searchStaff" />
      </div>
    </div>
    <div class="d-flex justify-content-end align-items-center">
      <button class="btn btn-primary btn-add-staff" @click="openModal()">{{ $t('admin.list_staff.create_staff') }}</button>
    </div>
  </div>
  <div class="responsive-table">
    <div class="table-header row">
      <div class="col col-2"></div>
      <div class="col col-5">{{ $t('admin.list_staff.staff_name') }}</div>
      <div class="col col-5">{{ $t('admin.list_staff.email') }}</div>
    </div>
    <div class="table-row row" data-url="" v-for="staff in staffList" :key="staff">
      <div class="col col-2 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
      </div>
      <div class="col col-5">{{staff['name']}}</div>
      <div class="col col-5">{{staff['email']}}</div>
    </div>
    <div class="p-8"></div>
  </div>
  <CModal alignment="center" :visible="visibleModal" @close="closeModal()">
    <CModalHeader>
      <CModalTitle>{{ $t('admin.list_staff.form_create.title') }}</CModalTitle>
    </CModalHeader>
    <form class="needs-validation">
      <CModalBody>
        <div class="mb-3">
          <label for="staffEmail" class="form-label">{{ $t('admin.list_staff.form_create.email') }}</label>
          <input type="email" class="form-control" id="staffEmail" placeholder="name@example.com" v-model="newStaff.email">
        </div>
        <div class="mb-3">
          <label for="staffName" class="form-label">{{ $t('admin.list_staff.form_create.staff_name') }}</label>
          <input type="name" class="form-control" id="staffName" v-model="newStaff.name">
        </div>
        <div class="mb-3">
          <label for="staffPassword" class="form-label">{{ $t('admin.list_staff.form_create.password') }}</label>
          <input type="password" class="form-control" id="staffPassword" v-model="newStaff.password">
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeModal()">
          {{ $t('admin.list_staff.form_create.close') }}
        </CButton>
        <CButton color="primary" @click="submitStaffForm()">{{ $t('admin.list_staff.form_create.save') }}</CButton>
      </CModalFooter>
    </form>
  </CModal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import StaffApi from "@/backend/admin/staffs";

export default {
  name: 'ListStaffs',
  data() {
    return {
      newStaff: {
        email: '',
        name: '',
        password: ''
      },
      visibleModal: false,
      searchValue: ''
    }
  },
  computed: {
    ...mapGetters({
      staffList: 'adminStaffs/staffList',
    }),
  },

  methods: {
    ...mapActions({
      getStaffList: 'adminStaffs/getList',
      createStaff: 'adminStaffs/createStaff',
    }),
    submitStaffForm(){
      StaffApi.create(this.newStaff).then(() => {
        this.getStaffList()
        this.newStaff = { email: '', name: '', password: '' }
        this.closeModal()
      }).catch(error => {
        console.error(error)
      })
    },
    closeModal() {
      this.visibleModal = false
    },
    openModal() {
      this.visibleModal = true
    },
    searchStaff() {
      let params = (this.searchValue == '') ? {} : { q: this.searchValue }
      this.getStaffList(params)
    }
  },
  mounted() {
    this.getStaffList();
  }
}
</script>
<style lang="scss" scoped>
  @import '@/styles/admin/list_staffs'
</style>
