<template>
  <div class="row">
    <div class="d-flex justify-content-end align-items-center activity">
      <div><a class="btn btn-primary" href="#" @click="() => { visibleModal = true }">Create Staff</a></div>
    </div>
    <div class="col-md-12">
      <div class="mt-3">
        <ul class="list list-inline">
          <li class="d-flex justify-content-between">
            <div class="d-flex flex-row align-items-center">
              <div class="ml-2">
                <a href="#">Name</a>
              </div>
            </div>
            <div class="d-flex flex-row align-items-center">
              <span>Email</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <CModal alignment="center" :visible="visibleModal" @close="() => { visibleModal = false }">
    <CModalHeader>
      <CModalTitle>Form create staff</CModalTitle>
    </CModalHeader>
    <CModalBody>Form content</CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { visibleModal = false }">
        Close
      </CButton>
      <CButton color="primary">Save</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
export default {
  name: 'ListStaffs',
  data() {
    return { 
      visibleModal: false,
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '@/styles/admin/list_staffs'
</style>