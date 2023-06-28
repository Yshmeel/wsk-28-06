import http from './index'

const login = (username, password) => {
    return http.post("/api/login", {
        username, password
    });
};

const logout = () => {
    return http.delete("/api/logout");
};

const userRequests = {
    login,
    logout
};

export default userRequests;
