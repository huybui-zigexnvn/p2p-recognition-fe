<template>
  <div class="row d-flex">
    <div class="input-group d-flex">
      <div class="form-outline form-search">
        <input type="search" class="form-control" placeholder="Search" v-model="searchValue" />
        <!-- <CIcon icon="cilSearch" size="xl" /> -->
      </div>
    </div>
    <div class="select-pagination">
      <select class="form-select" @change="selectItemsPerPage($event)">
        <option value="5">perpage 5</option>
        <option value="10">perpage 10</option>
        <option value="15">perpage 15</option>
      </select>
    </div>
    <div class="d-flex justify-content-end align-items-center activity">
      <div><a class="btn btn-primary" href="#" @click="openModal()">Create Staff</a></div>
    </div>
  </div>
  <div class="responsive-table">
    <div class="table-header row">
      <div class="col col-2"></div>
      <div class="col col-5">User Name</div>
      <div class="col col-5">Email</div>
    </div>
    <div class="table-row row" data-url="" v-for="staff in filteredStaffs" :key="staff">
      <div class="col col-2 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
          <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
      </div>
      <div class="col col-5">{{staff['name']}}</div>
      <div class="col col-5">{{staff['email']}}</div>
    </div>
    <div class="example-one">
    <vue-awesome-paginate
      :total-items="staffList.length"
      :items-per-page="perPage"
      :max-pages-shown="5"
      v-model="currentPage"
      :on-click="onClickHandler"
    />
  </div>
    <div class="p-8"></div>
  </div>
  <CModal alignment="center" :visible="visibleModal" @close="closeModal()">
    <CModalHeader>
      <CModalTitle>Form create staff</CModalTitle>
    </CModalHeader>
    <form class="needs-validation">
      <CModalBody>
        <div class="mb-3">
          <label for="staffEmail" class="form-label">Email address</label>
          <input type="email" class="form-control" id="staffEmail" placeholder="name@example.com" v-model="newStaff.email">
        </div>
        <div class="mb-3">
          <label for="staffName" class="form-label">Staff name</label>
          <input type="name" class="form-control" id="staffName" v-model="newStaff.name">
        </div>
        <div class="mb-3">
          <label for="staffPassword" class="form-label">Passwords</label>
          <input type="password" class="form-control" id="staffPassword" v-model="newStaff.password">
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeModal()">
          Close
        </CButton>
        <CButton type="submit" color="primary" @click="submitStaffForm()">Save</CButton>
      </CModalFooter>
    </form>
  </CModal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { ref } from "vue";

export default {
  name: 'ListStaffs',
  setup() {
    const currentPage = ref(1);
    return {
      currentPage,
    };
  },

  data() {
    return { 
      newStaff: {
        email: '',
        name: '',
        password: ''
      },
      searchValue: '',
      perPage: 5,
      totalItems: [],
    }
  },

  computed: {
    ...mapGetters({
      staffList: 'adminStaffs/staffList',
      visibleModal: 'adminStaffs/visibleModal',
    }),
    filteredStaffs() {
      return this.staffList.filter((staff) =>
        staff.name.toLowerCase().includes(this.searchValue.toLowerCase()) || staff.email.toLowerCase().includes(this.searchValue.toLowerCase())
      )
    }
  },

  methods: {
    ...mapActions({
      getStaffList: 'adminStaffs/getList',
      createStaff: 'adminStaffs/createStaff',
      closeModal: 'adminStaffs/closeModal',
      openModal:'adminStaffs/openModal',
    }),
    submitStaffForm(){
      this.createStaff(this.newStaff);
      this.newStaff = { email: '', name: '', password: '' }
    },
    onClickHandler(){
    },
    selectItemsPerPage(e){
      this.perPage = parseInt(e.target.value)
      this.getStaffList(this.currentPage, this.perPage)
    },
    paginationItems(items, perPage){
      var temporal = [];

        for (var i = 0; i < items.length; i+= perPage){
            temporal.push(items.slice(i,i+perPage));
        }

      return temporal;
    }
  },

  created() {
    this.getStaffList(this.currentPage);
  },

  mounted() {
    // this.paginationItems(this.staffList, this.perPage);
  },
}
</script>
<style lang="scss" scoped>
  @import '@/styles/admin/list_staffs'
</style>
