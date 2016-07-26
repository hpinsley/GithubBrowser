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
                    Authorization: unpacked[authKey]
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

                let userData = response.json();

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