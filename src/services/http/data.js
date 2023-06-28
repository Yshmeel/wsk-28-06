import http from './index'

const getList = (key) => {
    return http.get(`/api/${key}`);
};

const dataRequests = { getList };

export default dataRequests;
