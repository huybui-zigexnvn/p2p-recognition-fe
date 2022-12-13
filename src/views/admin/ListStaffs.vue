<template>
  <div class="row">
    <div class="d-flex justify-content-end align-items-center activity">
      <div><a class="btn btn-primary" href="#" @click="() => { visibleLiveDemo = true }">Create Staff</a></div>
    </div>
    <div class="col-md-12">
      <div class="mt-3">
        <ul class="list list-inline">
          <li class="d-flex justify-content-between">
            <div class="d-flex flex-row align-items-center">
              <div class="ml-2">
                <a href="#">Email</a>
              </div>
            </div>
            <div class="d-flex flex-row align-items-center">
              <span>Name</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <CModal alignment="center" :visible="visibleLiveDemo" @close="() => { visibleLiveDemo = false }">
    <CModalHeader>
      <CModalTitle>Modal title</CModalTitle>
    </CModalHeader>
    <CModalBody>Woohoo, you're reading this text in a modal!</CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="() => { visibleLiveDemo = false }">
        Close
      </CButton>
      <CButton color="primary">Save changes</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
export default {
  name: 'ListStaffs',
  data() {
    return { 
      visibleLiveDemo: false,
    }
  }
}
</script>
<style>

.list-group li {
  margin-bottom: 12px;
}

.list-group-item {
}

.list li {
  list-style: none;
  padding: 10px;
  border: 1px solid #e3dada;
  margin-top: 12px;
  border-radius: 5px;
  background: #fff;
}
</style>