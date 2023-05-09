<template>
  <div>
    <Loader></Loader>
    <router-view></router-view>
  </div>
</template>
<script>
import Loader from '@/components/Loader'
import { CContainer } from '@coreui/vue'

export default {
  name: 'LayoutWithoutLogin',
  components: {
    CContainer,
    Loader
  }
}
</script>
