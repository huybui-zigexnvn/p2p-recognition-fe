import ApiService from './api_services';

const StaffApi = {
  checkTokenChangePassword: function( params ){
    return ApiService.get('/check_token_reset_password', params)
  },
  changePassword: function( params ){
    return ApiService.put('/change_password', params)
  },
  updateProfile: function( params ){
    return ApiService.put('/update_profile', params)
  },
  updatePassword: function( params ){
    return ApiService.put('/update_password', params)
  }
}

export default StaffApi;
