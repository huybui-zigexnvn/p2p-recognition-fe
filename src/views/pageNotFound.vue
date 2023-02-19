<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <div class="clearfix">
            <h1 class="float-start display-3 me-4">{{ $t('page_not_found.title') }}</h1>
            <h4 class="pt-3">{{ $t('page_not_found.you_lost') }}</h4>
            <p class="text-medium-emphasis float-start">
              {{ $t('page_not_found.description') }}
            </p>
          </div>
        </CCol>
        
      </CRow>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <div class="clearfix d-flex">
            <router-link :to="{ path: '/' }"><CButton color="info">{{ $t('page_not_found.button_home_page') }}</CButton></router-link>
          </div>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
  export default {
    name: 'PageNotFound'
  }
</script>
