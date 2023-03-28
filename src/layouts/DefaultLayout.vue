<template>
  <div>
    <Loader></Loader>
    <AppSidebar />
    <div class="wrapper d-flex flex-column min-vh-100 bg-light">
      <AppHeader />
      <div class="body flex-grow-1 px-3 mb-3">
        <CContainer lg>
          <router-view />
        </CContainer>
      </div>
    </div>
  </div>
</template>
<script>
import { CContainer } from '@coreui/vue'
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import Loader from '@/components/Loader'

export default {
  name: 'DefaultLayout',
  components: {
    AppHeader,
    AppSidebar,
    CContainer,
    Loader
  }
}
</script>
