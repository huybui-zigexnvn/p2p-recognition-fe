import ApiService from './../api_services';

const StaffApi = {
  getList: function( params ) {
    return ApiService.get('/admin/staffs', params);
  },

  create: function (staffParams) {
    return ApiService.post('/admin/create_staff', { staff: staffParams });
  },

  update: function (staffId, staffParams) {
    return ApiService.put(`/admin/staffs/${staffId}/update`, { staff: staffParams });
  }
}

export default StaffApi;
