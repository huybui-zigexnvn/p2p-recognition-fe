<template>
  <div class="row">
    <div class="d-flex justify-content-end align-items-center activity">
      <div><a class="btn btn-primary" href="#" @click="() => { visibleModal = true }">Create Staff</a></div>
    </div>
    <div v-if="staffList.length > 0">
      <div class="col-md-12">
        <div class="mt-3">
          <ul class="list list-inline">
            <li class="d-flex justify-content-between" v-for="staff in staffList" v-bind:key="staff">
              <div class="d-flex flex-row align-items-center">
                <div class="ml-2">
                  <a href="#">{{staff['name']}}</a>
                </div>
              </div>
              <div class="d-flex flex-row align-items-center">
                <span>{{staff['email']}}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div v-else><span>Don't have any staff yet</span></div>
  </div>
  <CModal alignment="center" :visible="visibleModal" @close="() => { visibleModal = false }">
    <CModalHeader>
      <CModalTitle>Form create staff</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="mb-3">
        <label for="staffEmail" class="form-label">Email address</label>
        <input type="email" class="form-control" id="staffEmail" placeholder="name@example.com">
      </div>
      <div class="mb-3">
        <label for="staffName" class="form-label">Staff name</label>
        <input type="name" class="form-control" id="staffName">
      </div>
      <div class="mb-3">
        <label for="staffPassword" class="form-label">Passwords</label>
        <input type="password" class="form-control" id="staffPassword">
      </div>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { visibleModal = false }">
        Close
      </CButton>
      <CButton color="primary">Save</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'ListStaffs',
  data() {
    return { 
      visibleModal: false,
    }
  },
  computed: {
    ...mapGetters({
      staffList: 'adminStaffs/staffList'
    }),
  },

  methods: {
    ...mapActions({
      getStaffList: 'adminStaffs/getList'
    }),
  },
  mounted() {
    this.getStaffList();
  }
}
</script>
<style lang="scss" scoped>
  @import '@/styles/admin/list_staffs'
</style>
