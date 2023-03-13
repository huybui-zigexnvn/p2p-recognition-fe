<template>
  <div v-if="this.loaded" class='col-md-12'>
    <div class='d-flex'>
      <div id='area-avatar'>
        <div class='display-avatar d-flex justify-content-center align-item-center'>
          <img :src="this.previewImage" class='uploading-image' name='avatar' />
        </div>
      </div>
      <div class='card information'>
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
            <div class='col-md-10'>
              {{ fullName }}
            </div>
          </div>
          <hr>
          <div class='row form-group'>
            <div class='col-md-2'>
              <label>{{ $t('profile.phone_number') }}</label>
            </div>
            <div class='col-md-10'>
              {{ this.currentUser.phone_numbers }}
            </div>
          </div>
          <hr>
          <div class='row form-group'>
            <div class='col-md-2'>
              <label>{{ $t('profile.birthday') }}</label>
            </div>
            <div class='col-md-10'>
              {{ this.defaultDateFormat(new Date(this.currentUser.birth_day)) }}
            </div>
          </div>
          <hr>
          <div class='row form-group'>
            <div class='col-md-2'>
              <label>{{ $t('profile.role') }}</label>
            </div>
            <div class='col-md-10'>
              {{ this.currentUser.role }}
            </div>
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
import FormatDate from '@/minxins/formatDate'
import defaultAvatar from '@/assets/images/blank-profile-picture.png'

export default {
  name: 'Profile',
  mixins: [FormatDate],
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
      previewImage: defaultAvatar
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
          console.log(this.currentUser.avatar_url)
          if(this.currentUser.avatar_url) {
            this.previewImage = this.currentUser.avatar_url
          }
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
