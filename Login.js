'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableHighlight,
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
                }
            });

        return (
            <View style={styles.container}>
                <Image style={styles.logo}
                    source={require('image!pilar')} />
                <Text style={styles.heading}>
                    Github Browser
                </Text>
                <TextInput style={styles.input} placeholder="Github Username" />
                <TextInput secureTextEntry={true} style={styles.input} placeholder="Github Password" />
                <TouchableHighlight style={styles.button}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableHighlight>
            </View>
        );
    }
}