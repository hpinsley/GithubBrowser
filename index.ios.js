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
  View
} from 'react-native';

import {Login} from './Login';
import AuthService from './AuthService';
import {AppContainer} from './AppContainer';

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
          <AppContainer />
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
  loader: {
      marginTop: 20
  }
});

AppRegistry.registerComponent('GithubBrowser', () => GithubBrowser);
