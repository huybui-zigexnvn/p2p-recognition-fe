<template>
  <div v-if="this.loaded" class='col-md-12'>
    <div class='card'>
      <div class='card-body'>
        <div class='row form-group'>
          <div class='col-md-2'>
            <label>{{ $t('profile.email') }}</label>
          </div>
          <div class="col-md-10">
            {{ this.currentUser.email }}
          </div>
        </div>
        <hr>
        <div class='row form-group'>
          <div class='col-md-2'>
            <label>{{ $t('profile.full_name') }}</label>
          </div>
          <div class="col-md-10">
            {{ fullName }}
          </div>
        </div>
        <hr>
        <div class='row form-group'>
          <div class='col-md-2'>
            <label>{{ $t('profile.role') }}</label>
          </div>
          <div class="col-md-10">
            {{ this.currentUser.role }}
          </div>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-center pt-5">
      <a href="/edit-profile">
        <button type="button" class="btn btn-info button-edit">{{ $t('profile.button.edit') }}</button>
      </a>
    </div>
  </div>
</template>

<script>
  import AuthApi from "@/backend/auth";
  import InvalidFieldErrorMessage from "@/views/shared/InvalidFieldErrorMessage";
  import { useToast } from 'vue-toastification'

  export default {
    name: 'Profile',
    components: { InvalidFieldErrorMessage },
    setup() {
      const toast = useToast();
      return { toast }
    },
    data() {
        return {
          currentUser: {},
          loaded: false,
          errorMessages: {},
        } 
      },
    created() {
      this.getCurrentPassword()
    },
    computed: {
      fullName() {
        return `${this.currentUser.first_name} ${this.currentUser.last_name}`
      },
    },
    methods: {
      async getCurrentPassword() {
        try {
          await AuthApi.getCurrentUser({}).then((response) => {
            this.currentUser = response.data
            this.loaded = true
          })
        } catch (error) {
          console.log(error)
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/user/profile'
</style>
