<template>
  <div class="container-lg">
    <div class="staff-avatar mb-4">
      <img :src="staff.avatar_path" width="200" height="200" v-if="staff.avatar_path">
      <img src="@/assets/images/blank-profile-picture.png" width="200" height="200" v-else>
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

export default {
  name: 'Staff Profile',
  mixins: [FormatDate],
  components: { InvalidFieldErrorMessage, Datepicker },
  data() {
    return {
      isEditing: false,
      errorMessages: {},
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
      let paramsProfile = {
        first_name: this.staff.first_name,
        last_name: this.staff.last_name,
        phone_numbers: this.staff.phone_numbers,
        birth_day: this.staff.birth_day,
        status: this.staff.status,
      }
      await StaffApi.update(this.staff.id, paramsProfile).then(() => {
        this.showSatff(this.staff.id)
        this.errorMessages = {}
        this.isEditing = false
      }).catch(error => {
        this.errorMessages = error.response.data.message
      })
    },
    cancelUpdate() {
      this.showSatff(this.staff.id)
      this.errorMessages = {}
      this.isEditing = false
    }
  },
  created() {
    this.showSatff(this.$route.params.id)
  }
}
</script>

<style lang="scss" scoped>
  @import '@/styles/admin/show_staff'
</style>
