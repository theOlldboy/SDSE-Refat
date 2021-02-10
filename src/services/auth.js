
export const USER_KEY = "@user-sdse";
export const isAuthenticated = () => localStorage.getItem(USER_KEY) !== null;

export const getToken = () => {
    const userStr = localStorage.getItem(USER_KEY);
    
    if (!userStr) {
        return null;
    }     

    const currentUser = JSON.parse(userStr);

    return currentUser.token;
};

export const getUser = () => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) {
        return null;
    }

    return JSON.parse(userStr);
};

// Atualizar mais pra frente
export const setUser = ({name, email, phones}) => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) {
        return null;
    }

    let user = JSON.parse(userStr);
    user.name = name;
    user.email = email;
    user.phones = phones;

    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const login = payload => {
    const currentUser = Object.assign({}, { token: payload.access_token, user:  payload.empresa });
    localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
    localStorage.setItem('@user-loc',JSON.stringify({lat : 0, lng : 0}));
};

export const logout = () => {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem('@user-loc');
}
;