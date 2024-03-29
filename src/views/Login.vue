<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8">
          <div class="card-group d-block d-md-flex row">
            <div class="card col-md-7 p-4 mb-0">
              <div class="card-body">
                <form @submit.prevent="onSubmit">
                  <h1>{{ $t('login.title') }}</h1>
                  <p class="text-medium-emphasis">{{ $t('login.description') }}</p>
                  <div class="mb-3">
                    <div class="input-group ">
                      <span class="input-group-text">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 512 512" role="img">undefined<path fill="var(--ci-primary-color, currentColor)" d="M411.6,343.656l-72.823-47.334,27.455-50.334A80.23,80.23,0,0,0,376,207.681V128a112,112,0,0,0-224,0v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L116.4,343.656A79.725,79.725,0,0,0,80,410.732V496H448V410.732A79.727,79.727,0,0,0,411.6,343.656ZM416,464H112V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,184,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L296.5,307.007l97.662,63.479h0A47.836,47.836,0,0,1,416,410.732Z" class="ci-primary"></path></svg>
                      </span>
                      <input v-model="email" :placeholder="$t('login.email.placeholder')" class="form-control" name="email" required />
                    </div>
                    <div class="error-message" v-if="errorMessages.email">{{ errorMessages.email }}</div>
                  </div>
                  <div>
                    <div class="input-group ">
                      <span class="input-group-text">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 512 512" role="img">undefined<path fill="var(--ci-primary-color, currentColor)" d="M411.6,343.656l-72.823-47.334,27.455-50.334A80.23,80.23,0,0,0,376,207.681V128a112,112,0,0,0-224,0v79.681a80.236,80.236,0,0,0,9.768,38.308l27.455,50.333L116.4,343.656A79.725,79.725,0,0,0,80,410.732V496H448V410.732A79.727,79.727,0,0,0,411.6,343.656ZM416,464H112V410.732a47.836,47.836,0,0,1,21.841-40.246l97.66-63.479-41.64-76.341A48.146,48.146,0,0,1,184,207.681V128a80,80,0,0,1,160,0v79.681a48.146,48.146,0,0,1-5.861,22.985L296.5,307.007l97.662,63.479h0A47.836,47.836,0,0,1,416,410.732Z" class="ci-primary"></path></svg>
                      </span>
                      <input v-model="password" :placeholder="$t('login.password.placeholder')" class="form-control" type="password" name="password" required />
                    </div>
                    <div class="error-message" v-if="errorMessages.password">{{ errorMessages.password }}</div>
                  </div>
                  <span class="error-message">{{ this.loginFailedMessage }}</span>
                  <div class="row mt-4">
                    <div class="col-6">
                      <button class="btn btn-primary px-4">{{ $t('login.sign_in') }}</button>
                    </div>
                    <div class="col-6 text-right">
                      <button class="btn btn-link px-0" type="button">{{ $t('login.forgot_password') }}</button>
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
  import AuthApi from "@/backend/auth";

  export default {
    data() {
      return {
        email: '',
        password: '',
        loginFailedMessage: '',
        errorMessages: []
      }
    },
    methods: {
      async login() {
        try {
          await AuthApi.login({email: this.email, password: this.password}).then((response) => {
            if(response.data.json.error){
              this.validateEmail(this.email)
              this.validatePassword(this.password)
              this.loginFailedMessage = this.$t('login.login_failed')
              return;
            } else {
              window.localStorage.setItem('token', response.data.json.token);
              this.$router.push({ name: 'home'})
            }
          })
        } catch (error) {
          console.log(error)
        }
      },

      onSubmit() {
        this.login()
      },

      validateEmail(value) {
        this.loginFailedMessage = ''
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
        if (!regex.test(value)) {
          this.errorMessages['email'] = this.$t('login.email.validate');
        }else {
          this.errorMessages['email'] = '';
        }
        return true;
      },

      validatePassword(value) {
        this.loginFailedMessage = ''
        if (value.length < 6) {
          this.errorMessages['password'] = this.$t('login.password.validate')
        } else {
          this.errorMessages['password'] = '';
        }
        return true;
      },
    },
  }
</script>

<style scoped>
  .error-message {
    color: red;
  }
  .logo-area {
    background-color: black;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
