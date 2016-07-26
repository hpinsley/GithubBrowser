/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  ActivityIndicator,
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {Login} from './Login';
import AuthService from './AuthService';

export class GithubBrowser extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      checkingAuth: true
    };
  }

  componentDidMount() {
    AuthService.getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: !!authInfo
      });
    });
  }
  render() {
    if (this.state.checkingAuth) {
      return (
        <View style={styles.container}>
            <ActivityIndicator
                animating={true}
                size="large"
                style={styles.loader} />
        </View>
      );
    }
    else if (this.state.isLoggedIn) {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to Github Browser
          </Text>
        </View>
      );
    }
    else {
      return (
        <Login onLogin={this.onLogin.bind(this)} />
      );
    }
  }

  onLogin() {
    this.setState({isLoggedIn: true});
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  loader: {
      marginTop: 20
  }
});

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
