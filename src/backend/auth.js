import ApiService from './api_services';

const AuthApi = {
  login: function( params ) {
    console.log(params)
    return ApiService.post('/authen', params );
  },
}

export default AuthApi;
