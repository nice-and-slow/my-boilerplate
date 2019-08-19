const authToken = 'authToken';

export const isLoggedIn = () => {
    return localStorage.getItem(authToken);
};
