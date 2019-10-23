 import {authHeader} from '../_helpers';

export const userService = {
    login,
    logout,
    getAll
};

function login(userName, passWd){
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({userName, passWd})
    };

    return fetch('/users/authenticate', requestOptions)
        .then(console.log('user'))
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));
            return user;
        });
}

function logout(){
    localStorage.removeItem('user');
}

function getAll(){
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch('/users', requestOptions).then(handleResponse);
}

function handleResponse(response){
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if(!response.ok) {
            if(response.status === 401) {
                logout();
                window.location.reload(true);
            }
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}