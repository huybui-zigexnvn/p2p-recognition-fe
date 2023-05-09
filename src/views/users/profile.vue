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
      this.turnOffLoading()
    },
  methods: {
    ...mapActions({
      getCurrentUser: 'currentUser/getCurrentUser',
      turnOnLoading: 'loader/turnOn',
      turnOffLoading: 'loader/turnOff',
    })
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/user/profile'
</style>
