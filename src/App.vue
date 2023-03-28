<template>
  <router-view></router-view>
</template>

<script>
  import AuthApi from "@/backend/auth";
  import defineAbilityFor from '@/services/ability'

  export default {

    name: 'App',
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
