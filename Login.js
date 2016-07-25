'use strict';

import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import buffer from 'buffer';

export class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            showProgress: false
        };
    }

    render() {
            let styles = StyleSheet.create({
                container: {
                    flex: 1,
                    backgroundColor: '#F5FCFF',
                    paddingTop: 40,
                    alignItems: 'center',
                    padding: 10
                },
                logo: {
                    width: 66,
                    height: 55
                },
                heading: {
                    fontSize: 30,
                    marginTop: 10
                },
                input: {
                    height: 50,
                    marginTop: 10,
                    padding: 4,
                    fontSize: 18,
                    borderWidth: 1,
                    borderColor: '#48bbec'
                },
                button: {
                    height: 50,
                    backgroundColor: '#48bbec',
                    alignSelf: 'stretch',
                    marginTop: 10,
                    justifyContent: 'center'
                },
                buttonText: {
                    fontSize: 22,
                    color: '#fff',
                    alignSelf: 'center'
                },
                loader: {
                    marginTop: 20
                }
            });

        var errorCtrl = <View />

        if (this.state.badCredentials) {
            errorCtrl = <Text style={styles.error}>Unknown username or password</Text>
        }
        else if (this.state.unknownError) {
            errorCtrl = <Text style={styles.error}>Unknown error</Text>
        }
        return (
            <View style={styles.container}>
                <Image style={styles.logo}
                    source={require('image!pilar')} />
                <Text style={styles.heading}>
                    Github Browser
                </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.setState({username:text})}
                    placeholder="Github Username" />
                <TextInput
                    secureTextEntry={true}
                    style={styles.input}
                    onChangeText={(text) => this.setState({password:text})}
                    placeholder="Github Password" />
                <TouchableHighlight
                    onPress={this.onLoginPressed.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableHighlight>

                {errorCtrl}

                <ActivityIndicator
                    animating={this.state.showProgress}
                    size="large"
                    style={styles.loader} />
            </View>
        );
    }

    onLoginPressed() {
        console.log(`You are logging in with username: ${this.state.username} and password: ${this.state.password}`);
        this.setState({showProgress: true});

        let b = new buffer.Buffer(this.state.username + ':' + this.state.password);
        let encodedAuth = b.toString('base64');

        fetch('https://api.github.com/user', {
                headers: {
                    Authorization: 'Basic ' + encodedAuth
                }
            })
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    return response;
                }

                throw {
                    badCredentials: response.status == 401,
                    unknownError: response.status != 401
                }
            })
            .then(response => response.json())
            .then(result => {
                console.log(result);
                this.setState({showProgress: false});
            })
            .catch(err => {
                //console.error(err);
                this.setState(err);
            })
            .finally(() => {
                this.setState({showProgress: false});
            });
    }
}