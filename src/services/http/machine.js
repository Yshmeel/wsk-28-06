import http from './index'

const validate = (data) => {
    return http.post(`/api/verify-compatibility`, data);
};

const create = (data) => {
    return http.post(`/api/machines`, data);
};

const machineRequests = { validate, create };

export default machineRequests;
