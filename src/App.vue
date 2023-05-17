<template>
  <DefaultLayout v-if="this.$route.meta.layout==='defaultLayout'">
    <router-view></router-view>
  </DefaultLayout>
  <LayoutWithoutLogin v-else>
    <router-view></router-view>
  </LayoutWithoutLogin>
</template>

<script>
  import DefaultLayout from './layouts/DefaultLayout'
  import LayoutWithoutLogin from './layouts/LayoutWithoutLogin'

  export default {

    name: 'App',
    components: { DefaultLayout, LayoutWithoutLogin }
  }

</script>

<style lang="scss">
  @import 'styles/style';
</style>
