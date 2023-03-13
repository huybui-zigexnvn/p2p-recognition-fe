<template>
  <div v-if="active" class="loader-wrapper">
    <div class="loading">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    active: Boolean
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/loader'
</style>
