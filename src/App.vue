<template>
  <DefaultLayout v-if="this.$route.meta.layout==='defaultLayout'">
    <router-view></router-view>
  </DefaultLayout>
  <router-view v-else></router-view>
</template>

<script>
  import AuthApi from "@/backend/auth";
  import defineAbilityFor from '@/services/ability'
  import DefaultLayout from './layouts/DefaultLayout'

  export default {

    name: 'App',
    components: { DefaultLayout },
    async created() {
      let role = ''
      await AuthApi.getCurrentUser().then(response => {
              role = response.data.role
            }).catch(error => {
              console.log(error)
            })
      defineAbilityFor(role)
    }
  }

</script>

<style lang="scss">
  @import 'styles/style';
</style>
