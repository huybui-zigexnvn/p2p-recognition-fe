<template>
  <div class="d-flex">
    <div class="input-group">
      <div class="form-search d-flex align-items-center">
        <CIcon icon="cilSearch" size="xl" />
        <input class="form-control search-input" :placeholder="$t('admin.list_staff.search_placeholder')" v-model="searchValue" @keyup="searchStaff" />
      </div>
    </div>
    <div v-if="$ability.can('manage', 'staff')" class="d-flex justify-content-end align-items-center">
      <button class="btn btn-primary btn-add-staff" @click="openModal()">{{ $t('admin.list_staff.create_staff') }}</button>
    </div>
  </div>

  <div class="no-records d-flex justify-content-center" v-if="hasNoRecords">
    {{ $t('admin.list_staff.no_records_message') }}
  </div>
  <div class="responsive-table" v-else-if="staffList.length > 0">
    <div class="table-header row">
      <div class="col col-1"></div>
      <div class="col col-3 sort-list" @click="sortStaffs('first_name')">{{ $t('admin.list_staff.first_name') }}<CIcon icon="cilListFilter"/></div>
      <div class="col col-3">{{ $t('admin.list_staff.last_name') }}</div>
      <div class="col col-3 sort-list" @click="sortStaffs('email')">{{ $t('admin.list_staff.email') }}<CIcon icon="cilListFilter"/></div>
      <div class="col col-2 sort-list" @click="sortStaffs('status')">{{ $t('admin.list_staff.status') }}<CIcon icon="cilListFilter"/></div>
    </div>
    <div class="table-row row" data-url="" v-for="staff in staffList" :key="staff">
      <div class="col col-1 text-center">
        <img :src="staff.avatar_url" width="16" height="16" viewBox="0 0 16 16" v-if="staff.avatar_url">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16" v-else>
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
      </div>
      <div class="col col-3 text-truncate">{{staff['first_name']}}</div>
      <div class="col col-3 text-truncate">{{staff['last_name']}}</div>
      <div class="col col-3 text-truncate"><router-link :to="{name: 'Staff Profile', params: {id: staff['id']}}">{{staff['email']}}</router-link></div>
      <div class="col col-2">
        <label class="toggle">
          <input class="toggle-checkbox" type="checkbox" v-model="staff['status']" true-value="enable" false-value="disable" v-on:change=" switchStatusStaff(staff)">
          <div class="toggle-switch"></div>
        </label>
      </div>
    </div>
    <div class="pagination d-flex justify-content-center">
      <vue-awesome-paginate
        :total-items="totalStaff"
        :items-per-page="10"
        :max-pages-shown="5"
        v-model="currentPage"
        :on-click="handlerPaginate"
        :hide-prev-next-when-ends="true"
      >
        <template #prev-button>
          <CIcon icon="cilChevronLeft"/>
        </template>
        <template #next-button>
          <CIcon icon="cilChevronRight"/>
        </template>
      </vue-awesome-paginate>
    </div>
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
          <InvalidFieldErrorMessage errorField="email" :errorMessages="errorMessages"></InvalidFieldErrorMessage>
        </div>
        <div class="mb-3">
          <label for="staffName" class="form-label">{{ $t('admin.list_staff.form_create.first_name') }}</label>
          <input type="first_name" class="form-control" id="staffFristName" v-model="newStaff.first_name">
          <InvalidFieldErrorMessage errorField="first_name" :errorMessages="errorMessages"></InvalidFieldErrorMessage>
        </div>
        <div class="mb-3">
          <label for="staffName" class="form-label">{{ $t('admin.list_staff.form_create.last_name') }}</label>
          <input type="last_name" class="form-control" id="staffLastName" v-model="newStaff.last_name">
          <InvalidFieldErrorMessage errorField="last_name" :errorMessages="errorMessages"></InvalidFieldErrorMessage>
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
import InvalidFieldErrorMessage from "@/views/shared/InvalidFieldErrorMessage";

export default {
  name: 'ListStaffs',
  components: { InvalidFieldErrorMessage },
  data() {
    return {
      newStaff: {
        email: '',
        first_name: '',
        last_name: '',
      },
      visibleModal: false,
      searchValue: '',
      errorMessages: {},
      invalidPage: false,
      hasNoRecords: false,
      currentPage: 1,
      sort_first_name: {
        column_name: 'first_name',
        sort_type: 'asc'
      },
      currentSort: {
        column_name: '',
        sort_type: ''
      },
    }
  },
  computed: {
    ...mapGetters({
      staffList: 'adminStaffs/staffList',
      totalStaff: 'adminStaffs/totalStaff',
    }),

    currentSearch() {
      return this.$route.query.q
    }
  },

  watch: {
    staffList() {
      return this.hasNoRecords = this.staffList.length === 0
    }
  },

  methods: {
    ...mapActions({
      getStaffList: 'adminStaffs/getList',
      createStaff: 'adminStaffs/createStaff',
      turnOnLoading: 'loader/turnOn',
      turnOffLoading: 'loader/turnOff'
    }),
    async submitStaffForm(){
      try {
        await StaffApi.create(this.newStaff).then(() => {
          this.getStaffList()
          this.newStaff = { email: '', first_name: '', last_name: '' }
          this.errorMessages = {}
          this.searchValue = ''
          this.currentPage = 1
          this.$router.push(this.$route.path)
          this.closeModal()
          this.hideLoader()
        })
      } catch(error) {
        this.errorMessages = error.response.data.message
      }
    },
    closeModal() {
      this.visibleModal = false
    },
    openModal() {
      this.visibleModal = true
    },
    searchStaff() {
      const self = this
      function timer(){
        self.currentPage = 1
        let params = { q: { first_name_or_last_name_or_email_cont: self.searchValue.trim() }, page: self.currentPage }
        self.$router.push({ query: self.handlerQueryParams(params) })
        self.getStaffList(params)
      }

      setTimeout(timer,300)
    },
    handlerPaginate(page) {
      let params = { q: { first_name_or_last_name_or_email_cont: this.searchValue }, page: page }
      this.$router.push({ query: this.handlerQueryParams(params) })
      this.getStaffList(params)
    },
    handlerQueryParams(params) {
      if(this.searchValue === '') delete params.q
      if(this.currentPage === 1) delete params.page

      return params
    },
    switchStatusStaff(staff) {
      StaffApi.update(staff['id'], { status: staff['status'] })
    },
    sortStaffs(sort_column) {
      let sort_type
      if(sort_column == this.currentSort.column_name){
        sort_type = this.currentSort.sort_type == 'asc' ? 'desc' : 'asc'
      } else {
        sort_type = 'asc'
      }
      let params = { page: this.currentPage, q: this.currentSearch, sort: {sort_column: sort_column, sort_type: sort_type} }
      this.getStaffList(params)
      this.currentSort = {column_name: sort_column, sort_type: sort_type}
    }
  },

  async mounted() {
    this.currentPage = parseInt(this.$route.query.page) || 0
    if (this.currentPage < 1) {
      this.currentPage = 1
      this.$router.push({ name: 'Home', query: { q: this.currentSearch } })
    }
    this.turnOnLoading()
    await this.getStaffList({page: this.currentPage, q: this.currentSearch}).then((response) => {        
      this.searchValue = this.currentSearch && this.currentSearch.first_name_or_last_name_or_email_cont
      this.hasNoRecords = this.staffList.length === 0
    })
    this.turnOffLoading()
  }
}
</script>
<style lang="scss" scoped>
  @import '@/styles/admin/list_staffs'
</style>
