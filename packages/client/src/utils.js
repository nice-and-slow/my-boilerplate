export const isLoggedIn = function() {
    const token = localStorage.getItem('authToken');

    if (token) {
        //return jwt(token).userId;
        return true;
    }
    return false;
};
