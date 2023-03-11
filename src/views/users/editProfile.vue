<template>
  <div v-if="this.loaded" class='col-md-12'>
    <form @submit.prevent="onSubmit">
      <div class='card'>
        <div class='card-body'>
          <div class='row form-group'>
            <div class='col-md-2'>
              <label>{{ $t('profile.email') }}</label>
            </div>
            <div class="col-md-10">
              <input type="email" class="form-control" id="email" placeholder="name@example.com" v-model="this.currentUser.email">
              <InvalidFieldErrorMessage errorField="email" :errorMessages="errorMessages"></InvalidFieldErrorMessage>
            </div>
          </div>
          <hr>
          <div class='row form-group'>
            <div class='col-md-2'>
              <label>{{ $t('profile.full_name') }}</label>
            </div>
            <div class="col-md-10">
              <div class="d-flex">
                <div class="first-name">
                  <input type="text" class="form-control" id="first-name" placeholder="Nguyễn" v-model="this.currentUser.first_name">
                  <InvalidFieldErrorMessage errorField="first_name" :errorMessages="errorMessages"></InvalidFieldErrorMessage>
                </div>
                <div class="last-name">
                  <input type="text" class="form-control" id="last-name" placeholder="Văn" v-model="this.currentUser.last_name">
                  <InvalidFieldErrorMessage errorField="last_name" :errorMessages="errorMessages"></InvalidFieldErrorMessage>
                </div>
              </div>
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
        <button @click="updateProfile()" type="button" class="btn btn-info button-edit">{{ $t('profile.button.update') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
  import AuthApi from "@/backend/auth";
  import InvalidFieldErrorMessage from "@/views/shared/InvalidFieldErrorMessage";
  import StaffApi from "@/backend/staff";
  import { useToast } from 'vue-toastification'

  export default {
    name: 'editProfile',
    components: { InvalidFieldErrorMessage },
    setup() {
      const toast = useToast();
      return { toast }
    },
    data() {
        return {
          currentUser: {
            email: '',
            first_name: '',
            last_name: ''
          },
          loaded: false,
          errorMessages: {},
        } 
      },
    created() {
      this.getCurrentPassword()
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
      async updateProfile() {
        console.log(this.currentUser.email)
        await StaffApi.updateProfile({email: this.currentUser.email, first_name: this.currentUser.first_name, last_name: this.currentUser.last_name}).then(response => {
          if(response.data.error){
            this.toast.error(`${this.$t('profile.update_failed')}`)
            return;
          } else {
            this.toast.success(`${this.$t('profile.update_success')}`, {
              timeout: 2000
            });
          }
        }).catch(error => {
          if (error.response.data.message) {this.errorMessages = error.response.data.message}
          console.log(error)
        })
      },
      onSubmit() {
        this.updateProfile()
      },
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/user/profile'
</style>
