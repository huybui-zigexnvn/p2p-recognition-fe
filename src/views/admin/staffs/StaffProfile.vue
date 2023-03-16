<template>
  <div class="container-lg">
    <div class="row mb-4">
      <div class="staff-avatar d-flex justify-content-center">
        <img class="mb-4" :src="this.defaultImgSrc" id="img-preview">
        <label for="file-input" class="btn btn-primary" v-if="isEditing">{{ $t('admin.staff_profile.upload_image') }}</label>
        <input accept="image/*" type="file" id="file-input" class="d-none" @change="uploadImage" />
      </div>
    </div>
    <div class="row d-flex mb-4">
      <div class="col col-6">
        <label>{{ $t('admin.staff_profile.first_name') }}:</label>
        <input class="form-control" :disabled="!isEditing" v-model="staff.first_name">
        <InvalidFieldErrorMessage errorField="first_name" :errorMessages="errorMessages" v-if="isEditing"></InvalidFieldErrorMessage>
      </div>
      <div class="col col-6">
        <label>{{ $t('admin.staff_profile.last_name') }}:</label>
        <input class="form-control" :disabled="!isEditing" v-model="staff.last_name">
        <InvalidFieldErrorMessage errorField="last_name" :errorMessages="errorMessages" v-if="isEditing"></InvalidFieldErrorMessage>
      </div>
    </div>
    <div class="row d-flex mb-4">
      <div class="col col-6">
        <label>{{ $t('admin.staff_profile.email') }}:</label>
        <input class="form-control" :value="staff.email" :disabled="true">
      </div>
      <div class="col col-6">
        <label>{{ $t('admin.staff_profile.phone_numbers') }}:</label>
        <input class="form-control" :disabled="!isEditing" v-model="staff.phone_numbers">
        <InvalidFieldErrorMessage errorField="phone_numbers" :errorMessages="errorMessages" v-if="isEditing"></InvalidFieldErrorMessage>
      </div>
    </div>
    <div class="row d-flex">
      <div class="col col-6">
        <label>{{ $t('admin.staff_profile.birthday') }}:</label>
        <Datepicker v-model="staff.birth_day" :disabled="!isEditing" :enable-time-picker="false" :format="this.defaultDateFormat(new Date(staff.birth_day))"/>
        <InvalidFieldErrorMessage errorField="birth_day" :errorMessages="errorMessages" v-if="isEditing"></InvalidFieldErrorMessage>
      </div>
      <div class="col col-6 staff-status">
        <label>{{ $t('admin.staff_profile.status') }}:</label>
        <label class="toggle">
          <input class="toggle-checkbox" type="checkbox" v-model="staff.status" true-value="enable" false-value="disable" :disabled="!isEditing">
          <div class="toggle-switch"></div>
        </label>
      </div>
    </div>
    <div class="mt-3 mb-3">
      <button class="btn btn-sm btn-success" @click="isEditing = !isEditing" v-if="!isEditing">
        {{ $t('admin.staff_profile.edit') }}
      </button>
      <button class="btn btn-sm btn-success me-1" @click="updateStaff()" v-else-if="isEditing">
        {{ $t('admin.staff_profile.save') }}
      </button>
      <button class="btn btn-sm btn-danger" v-if="isEditing" @click="cancelUpdate()">{{ $t('admin.staff_profile.cancel') }}</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import StaffApi from "@/backend/admin/staffs";
import InvalidFieldErrorMessage from "@/views/shared/InvalidFieldErrorMessage";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import FormatDate from '@/minxins/formatDate';
import default_avatar_image from "@/assets/images/blank-profile-picture.png";
import { useToast } from 'vue-toastification';

export default {
  name: 'Staff Profile',
  mixins: [FormatDate],
  components: { InvalidFieldErrorMessage, Datepicker },
  setup() {
    const toast = useToast();
    return { toast }
  },
  data() {
    return {
      isEditing: false,
      errorMessages: {},
      defaultImgSrc: null,
      avatar_image: null,
    }
  },
  computed: {
    ...mapGetters({
      staff: 'adminStaffs/staff',
    }),
  },
  methods: {
    ...mapActions({
      showSatff: 'adminStaffs/showSatff',
    }),
    async updateStaff() {
      let data = new FormData()
      data.append("first_name", this.staff.first_name)
      data.append("last_name", this.staff.last_name)
      data.append("phone_numbers", this.staff.phone_numbers)
      data.append("birth_day", this.staff.birth_day)
      data.append("status", this.staff.status)
      if(this.avatar_image) {
        data.append("avatar", this.avatar_image)
      }

      await StaffApi.update(this.staff.id, data).then(() => {
        this.showSatff(this.staff.id)
        this.errorMessages = {}
        this.isEditing = false
        this.toast.success(`${this.$t('admin.staff_profile.update_success')}`,{
          timeout: 2000
        });
      }).catch(error => {
        this.errorMessages = error.response.data.message
      })
    },
    cancelUpdate() {
      const image = document.getElementById('img-preview')
      image.src = this.defaultImgSrc
      this.showSatff(this.staff.id)
      this.errorMessages = {}
      this.isEditing = false
    },
    uploadImage(e) {
      const imagePreview = document.getElementById('img-preview')
      if(e.target.files.length) {
        const imageFile = e.target.files[0]
        this.avatar_image = imageFile
        imagePreview.src = URL.createObjectURL(imageFile)
      }
    },
  },
  async mounted() {
    await this.showSatff(this.$route.params.id)
    if(this.staff.avatar_url){
      this.defaultImgSrc = this.staff.avatar_url
    }else{
      this.defaultImgSrc = this.default_avatar_image
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/admin/show_staff'
</style>
