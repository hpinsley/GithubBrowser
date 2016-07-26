'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View
} from 'react-native';

export class AppContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        let styles = StyleSheet.create({
            container: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#F5FCFF'
            },
            welcome: {
                fontSize: 20,
                textAlign: 'center',
                margin: 10
            }
        });

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Tabs coming soon!
                </Text>
            </View>
        );
    }
}