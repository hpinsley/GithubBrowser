'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

export class Login extends Component {

    constructor(props) {
        super(props);
    }

    render() {
            let styles = StyleSheet.create({
                container: {
                    flex: 1,
                    backgroundColor: '#F5FCFF'
                },
                logo: {
                    width: 66,
                    height: 55
                }
            });

        return (
            <View style={styles.container}>
                <Image style={styles.logo}
                    source={require('image!pilar')} />
            </View>
        );
    }
}