<template>
  <div class="loader-wrapper" v-if="loadingPageStatus === 'on'" >
    <div class="loading">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: 'Loader',
  computed: {
    ...mapGetters({
      loadingPageStatus: 'loader/loadingPageStatus'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/loader'
</style>
