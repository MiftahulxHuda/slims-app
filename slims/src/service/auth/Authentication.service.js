import GuestClient from './GuestClient.service';

class Authentication {
    async signIn(username, password) {
        const data = await GuestClient.post('/auth/login', {
            username: username,
            password: password
        }).then(response => {
            return response.data;
        }).catch(error => {
            console.log(error);
            return null;
        });

        return data;
    };
}

export default new Authentication();