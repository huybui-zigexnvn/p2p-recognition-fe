<template>
  <div class="bg-light d-flex flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card-group">
            <div class="card p-2">
              <div class="card-body">
                <form @submit.prevent="onSubmit">
                  <h1>{{ $t('update_password.title') }}</h1>
                  <div class="mb-4">
                    <div class="input-group ">
                      <span class="input-group-text">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 512 512" role="img">undefined<path fill="var(--ci-primary-color, currentColor)" d="M411.6,343.656l-72.823-47.334,27.455-50.334A80.23,80.23,0,0,0,376,207.681V128a112,112,0,0,0-224,0v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L116.4,343.656A79.725,79.725,0,0,0,80,410.732V496H448V410.732A79.727,79.727,0,0,0,411.6,343.656ZM416,464H112V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,184,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L296.5,307.007l97.662,63.479h0A47.836,47.836,0,0,1,416,410.732Z" class="ci-primary"></path></svg>
                      </span>
                      <input v-model="currentPassword" :placeholder="$t('update_password.placeholder.current_password')" class="form-control" type="password" name="current_password" required />
                    </div>
                    <span v-if="this.wrongCurrentPassword.length" class="text-danger">{{ this.wrongCurrentPassword }}</span>
                  </div>
                  <div class="mb-4">
                    <div class="input-group ">
                      <span class="input-group-text">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 512 512" role="img">undefined<path fill="var(--ci-primary-color, currentColor)" d="M411.6,343.656l-72.823-47.334,27.455-50.334A80.23,80.23,0,0,0,376,207.681V128a112,112,0,0,0-224,0v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L116.4,343.656A79.725,79.725,0,0,0,80,410.732V496H448V410.732A79.727,79.727,0,0,0,411.6,343.656ZM416,464H112V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,184,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L296.5,307.007l97.662,63.479h0A47.836,47.836,0,0,1,416,410.732Z" class="ci-primary"></path></svg>
                      </span>
                      <input v-model="newPassword" :placeholder="$t('update_password.placeholder.new_password')" class="form-control" type="password" name="new_password" required />
                    </div>
                    <InvalidFieldErrorMessage errorField="password" :errorMessages="errorMessages"></InvalidFieldErrorMessage>
                  </div>
                  <div class="mb-4">
                    <div class="input-group ">
                      <span class="input-group-text">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 512 512" role="img">undefined<path fill="var(--ci-primary-color, currentColor)" d="M411.6,343.656l-72.823-47.334,27.455-50.334A80.23,80.23,0,0,0,376,207.681V128a112,112,0,0,0-224,0v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L116.4,343.656A79.725,79.725,0,0,0,80,410.732V496H448V410.732A79.727,79.727,0,0,0,411.6,343.656ZM416,464H112V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,184,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L296.5,307.007l97.662,63.479h0A47.836,47.836,0,0,1,416,410.732Z" class="ci-primary"></path></svg>
                      </span>
                      <input v-model="passwordConfirmation" :placeholder="$t('update_password.placeholder.password_confirmation')" class="form-control" type="password" name="placeholder.password_confirmation" required />
                    </div>
                    <InvalidFieldErrorMessage errorField="password_confirmation" :errorMessages="errorMessages"></InvalidFieldErrorMessage>
                  </div>
                  <div class="row">
                    <div class="col-12 col-lg-6">
                      <button class="btn btn-primary px-4">{{ $t('update_password.button') }}</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import StaffApi from "@/backend/staff";
  import InvalidFieldErrorMessage from "@/views/shared/InvalidFieldErrorMessage";
  import { useToast } from 'vue-toastification'

  export default {
    name: "editPassword",
    setup() {
      const toast = useToast();
      return { toast }
    },
    data() {
      return {
        currentPassword: '',
        newPassword: '',
        passwordConfirmation: '',
        wrongCurrentPassword: '',
        errorMessages: {},
      }
    },
    components: { InvalidFieldErrorMessage },
    methods: {
      async updatePassword() {
        let paramsUpdatePassword = { current_password: this.currentPassword, new_password: this.newPassword, password_confirmation: this.passwordConfirmation }
        await StaffApi.updatePassword(paramsUpdatePassword).then(response => {

          window.localStorage.setItem('token', '');
          this.$router.push({ name: 'Login' })
          this.toast.success(`${this.$t('update_password.success')}`, {
            timeout: 2000
          });
        }).catch(error => {
          this.toast.error(`${this.$t('update_password.failed')}`)
          if (error.response.status === 401){
            this.wrongCurrentPassword = error.response.data.message
          }
          if (error.response.data.message) {
            this.errorMessages = error.response.data.message
          }
        })
      },
      onSubmit() {
        this.updatePassword()
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import '@/styles/user/edit_password'
</style>
