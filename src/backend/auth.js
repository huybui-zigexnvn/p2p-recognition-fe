import ApiService from './api_services';

const AuthApi = {
  login: function( params ) {
    return ApiService.post('/authen', params );
  },
}

export default AuthApi;
