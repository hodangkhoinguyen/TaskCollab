import http from '../http.js';

async function signin(user) {
    const result = await http.post('auth/signin', user);
    return result.data;
}

async function signup(user) {
    const result = await http.post('auth/signup', user);
    return result.data;
}

async function getInfo(user) {
    const result = await http.get('auth/getInfo', {}, {
        headers: {
            'x-access-token': user.accessToken
        }
    });
    return result.data;
}

const auth = {
    signin,
    signup,
    getInfo
};

export default auth;