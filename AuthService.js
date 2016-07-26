import buffer from 'buffer';
import {AsyncStorage} from 'react-native';

class AuthService {
    login(cred, cb) {
        let b = new buffer.Buffer(cred.username + ':' + cred.password);
        let encodedAuth = b.toString('base64');

        fetch('https://api.github.com/user', {
                headers: {
                    Authorization: 'Basic ' + encodedAuth
                }
        })
        .then(response => {
            if (response.status >= 200 && response.status < 300) {

                let userData = response.json();

                AsyncStorage.multiSet([
                    ['auth', encodedAuth],
                    ['user', JSON.stringify(userData)]
                ], (err) => {
                    if (err) {
                        throw err;
                    }
                    cb({
                        loginError: null,
                        results: userData
                    });
                });
            }
            else if (response.status == 401) {
                cb({
                    loginError: 'Unknown username or password!!'
                });
            }
            else {
                cb({
                    loginError: 'Unknown error ' + response.status}
                );
            }
        })
        .catch(err => {
            cb({
                loginError: 'Unknown login error ' + err.toString()
            });
        });
    }
}

module.exports = new AuthService();