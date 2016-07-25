import buffer from 'buffer';

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
                cb({
                    loginError: null,
                    results: response.json()
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
                loginError: 'Unknown login error'
            });
        });
    }
}

module.exports = new AuthService();