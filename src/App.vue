<template>
  <DefaultLayout v-if="this.$route.meta.layout==='defaultLayout'">
    <router-view></router-view>
  </DefaultLayout>
  <router-view v-else></router-view>
</template>

<script>
import DefaultLayout from './layouts/DefaultLayout'
export default {
  name: 'App',
  components: {DefaultLayout} 
}
</script>

<style lang="scss">
  @import 'styles/style';
</style>
