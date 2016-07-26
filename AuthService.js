import buffer from 'buffer';
import {AsyncStorage} from 'react-native';
import _ from 'lodash';

const authKey = 'auth';
const userKey = 'user';

class AuthService {

    getAuthInfo(cb) {
        AsyncStorage.multiGet([authKey, userKey], (err, val) => {
            if (err) {
                return cb(err);
            }
            if (!val) {
                return cb("No values");
            }

            let unpacked = {
                auth: val[0][1],
                user: val[1][1]
            };

            //let zippedObj = _.zipObject(val);   //zips two arrays -- the first with prop names and the second with corresponding values

            if (!unpacked[authKey]) {
                return cb("No auth key");
            }

            let authInfo = {
                header: {
                    Authorization: 'Basic ' + unpacked[authKey]
                },
                user: JSON.parse(unpacked[userKey])
            };

            cb(null, authInfo);
        });
    }

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
                return response.json();
            }

            if (response.status == 401) {
                throw { loginError: 'Unknown username or password!!' };
            }

            throw { loginError: 'Unknown error ' + response.status };
        })
        .then(userData => {
            console.log('Saving ' + JSON.stringify(userData));

            AsyncStorage.multiSet([
                [authKey, encodedAuth],
                [userKey, JSON.stringify(userData)]
            ], (err) => {
                if (err) {
                    throw err;
                }
                cb({
                    loginError: null,
                    results: userData
                });
            });
        })
        .catch(err => cb(err));
    }
}

module.exports = new AuthService();