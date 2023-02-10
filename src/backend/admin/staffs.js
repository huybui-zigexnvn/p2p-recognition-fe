import ApiService from './../api_services';

const StaffApi = {
    getList: function( params ) {
        return ApiService.get('/staffs', { params: params });
    },

    create: function (staffParams) {
        return ApiService.post('/create_staff', { staff: staffParams });
    }
}

export default StaffApi;
