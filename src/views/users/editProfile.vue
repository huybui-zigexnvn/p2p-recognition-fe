<template>
  <div class='col-md-12'>
    <form @submit.prevent="onSubmit">
      <div class='d-flex'>
        <div id='area-avatar'>
          <div class='display-avatar d-flex justify-content-center align-item-center'>
            <img :src="this.previewAvatar" class='uploading-image' name='avatar'/>
          </div>
          <div id='button-upload'>
            <div class='d-flex justify-content-center'>
              <label for='upload-avatar' class='modal-label'>
                Upload avatar
              </label>
              <input type='file' name='photo' id='upload-avatar' @change=uploadImage>
            </div>
            <InvalidFieldErrorMessage errorField="avatar" :errorMessages="errorMessages"></InvalidFieldErrorMessage>
          </div>
        </div>
        <div class='card information'>
          <div class='card-body'>
            <div class='row form-group'>
              <div class='col-md-2'>
                <label>{{ $t('profile.email') }}</label>
              </div>
              <div class='col-md-10'>
                {{ this.currentUser.email }}
              </div>
            </div>
            <hr>
            <div class='row form-group'>
              <div class='col-md-2'>
                <label>{{ $t('profile.full_name') }}</label>
              </div>
              <div class='col-md-10'>
                <div class='col-md-10  d-flex justify-content-between'>
                  <div class='first-name col-sm-5'>
                    <input type='text' class='form-control' id='first-name' placeholder='Nguyễn' v-model="this.currentUser.first_name">
                    <InvalidFieldErrorMessage errorField="first_name" :errorMessages="errorMessages"></InvalidFieldErrorMessage>
                  </div>
                  <div class='last-name col-sm-5'>
                    <input type='text' class='form-control' id='last-name' placeholder='Văn' v-model="this.currentUser.last_name">
                    <InvalidFieldErrorMessage errorField="last_name" :errorMessages="errorMessages"></InvalidFieldErrorMessage>
                  </div>
                </div>
              </div>
            </div>
            <hr>
            <div class='row form-group'>
              <div class='col-md-2'>
                <label>{{ $t('profile.phone_number') }}</label>
              </div>
              <div class='col-md-10'>
                <input type='text' class='form-control' id='phone-number' placeholder='phone number' v-model="this.currentUser.phone_numbers">
                <InvalidFieldErrorMessage errorField="phone_numbers" :errorMessages="errorMessages"></InvalidFieldErrorMessage>
              </div>
            </div>
            <hr>
            <div class='row form-group'>
              <div class='col-md-2'>
                <label>{{ $t('profile.birthday') }}</label>
              </div>

              <div class='col-md-10'>
                <Datepicker v-model="this.currentUser.birth_day" :enable-time-picker="false" :format="this.defaultDateFormat(new Date(this.currentUser.birth_day))"/>
                <InvalidFieldErrorMessage errorField="birth_day" :errorMessages="errorMessages"></InvalidFieldErrorMessage>
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
      </div>
      <div class='d-flex justify-content-center pt-5'>
        <button @click="updateProfile()" type='button' class='btn btn-info button-edit'>{{ $t('profile.button.update') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import InvalidFieldErrorMessage from "@/views/shared/InvalidFieldErrorMessage";
  import StaffApi from "@/backend/staff";
  import Datepicker from '@vuepic/vue-datepicker';
  import '@vuepic/vue-datepicker/dist/main.css';
  import { useToast } from 'vue-toastification'
  import FormatDate from '@/minxins/formatDate'
  import defaultAvatar from '@/assets/images/blank-profile-picture.png'

  export default {
    name: 'editProfile',
    mixins: [FormatDate],
    components: { InvalidFieldErrorMessage, Datepicker },
    setup() {
      const toast = useToast();
      return { toast }
    },
    data() {
      return {
        date: new Date(2016, 9,  16),
        avatar: null,
        defaultAvatar: defaultAvatar,
        previewAvatar: null,
        errorMessages: {},
      }
    },
    computed: {
      ...mapGetters({
        currentUser: 'currentUser/current_user'
      }),
    },
    async mounted() {
      this.turnOnLoading()
      await this.getCurrentUser()
      this.previewAvatar = this.currentUser.avatar_url || this.defaultAvatar
      this.turnOffLoading()
    },
    methods: {
      ...mapActions({
        getCurrentUser: 'currentUser/getCurrentUser',
        turnOnLoading: 'loader/turnOn',
        turnOffLoading: 'loader/turnOff',
      }),
      async updateProfile() {
        let data = new FormData();
        data.append('first_name', this.currentUser.first_name || '')
        data.append('last_name', this.currentUser.last_name || '')
        data.append('phone_numbers', this.currentUser.phone_numbers || '')
        data.append('birth_day', this.currentUser.birth_day || '')
        if(this.currentUser.avatar_url instanceof File) data.append('avatar', this.currentUser.avatar_url || null)

        await StaffApi.updateProfile(data).then(response => {
          this.$router.push({ name: 'profile' })
          this.toast.success(`${this.$t('profile.update_success')}`, {
            timeout: 2000
          });
        }).catch(error => {
          this.toast.error(`${this.$t('profile.update_failed')}`)
          if (error.response.data.message) {this.errorMessages = error.response.data.message}
        })
      },
      uploadImage(e){
        this.currentUser.avatar_url = e.target.files[0]
        const reader = new FileReader();
        reader.readAsDataURL(this.currentUser.avatar_url);
        reader.onload = e =>{
          this.previewAvatar = e.target.result;
          this.errorMessages = {}
        };
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
