import ApiService from './api_services';

const AuthApi = {
  login: function( params ) {
    return ApiService.post('/authen', params );
  },
  changePassword: function( params ){
    return ApiService.put('/change_password', params)
  },
  getCurrentUser: function(){
    return ApiService.get('/me')
  }
}

export default AuthApi;
