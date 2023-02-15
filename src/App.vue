<template>
  <router-view></router-view>
</template>

<script>
import AuthApi from "@/backend/auth";

export default {
  name: 'App',
  watch: {
    '$route' (to, from) {
      this.checkChangePassword()
    }
  },
  methods: {
    async checkChangePassword() {
      try {
        await AuthApi.getCurrentUser({}).then((response) => {
          let currentUser = response.data
          if(currentUser.must_change_password === true){
            this.$router.push('/change_password')
          } else if (this.$route.name === "ChangePassword") {
            this.$router.push('/')
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss">
  @import 'styles/style';
</style>
