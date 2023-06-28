import axios from "axios";

const _axios = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

const setAuthorization = (token) => {
    if(token === '') {
        delete  _axios.defaults.headers.common["Authorization"];
    } else {
        _axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
};

export default {
    get: _axios.get,
    post: _axios.post,
    put: _axios.put,
    "delete": _axios.delete,

    setAuthorization
};
