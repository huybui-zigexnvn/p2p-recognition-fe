<template>
  <router-view></router-view>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'App',
  methods: {
    ...mapActions({
      getPasswordChanged: 'authen/getPasswordChanged',
    }),
    ...mapGetters({
      currentUser: 'authen/currentUser',
    })
  },
  created() {
    this.getPasswordChanged()
    this.currentUser
  },
}
</script>

<style lang="scss">
  @import 'styles/style';
</style>
