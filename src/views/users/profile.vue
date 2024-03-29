<template>
  <div class='col-md-12'>
    <div class='d-flex'>
      <div id='area-avatar'>
        <div class='display-avatar d-flex justify-content-center align-item-center'>
          <img :src="this.previewAvatar" class='uploading-image' name='avatar' />
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
              {{ this.currentUser.full_name }}
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
              {{ this.birth_day }}
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
      <router-link to="/edit-profile">
        <button type="button" class="btn btn-info button-edit">{{ $t('profile.button.edit') }}</button>
      </router-link>

      <router-link to="/edit-password">
        <button type="button" class="btn btn-warning button-edit-password">{{ $t('profile.button.edit_password') }}</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
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
      errorMessages: {},
      defaultAvatar: defaultAvatar,
      previewAvatar: null,
      birth_day: ''
    }
  },
  computed: {
    ...mapGetters({
      currentUser: 'currentUser/current_user',
    }),
  },
  async mounted() {
      this.turnOnLoading()
      await this.getCurrentUser()
      this.previewAvatar = this.currentUser.avatar_url || this.defaultAvatar
      this.date_of_birth(this.currentUser.birth_day)
      this.turnOffLoading()
    },
  methods: {
    ...mapActions({
      getCurrentUser: 'currentUser/getCurrentUser',
      turnOnLoading: 'loader/turnOn',
      turnOffLoading: 'loader/turnOff',
    }),
    date_of_birth(date) {
      if (date) { this.birth_day = this.defaultDateFormat(new Date(this.currentUser.birth_day)) }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/user/profile'
</style>
