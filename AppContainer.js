'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  TabBarIOS,
  Text,
  View
} from 'react-native';

export class AppContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedTab: 'feed'
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
                fontSize: 30,
                textAlign: 'center',
                margin: 10
            }
        });

        return (
            <TabBarIOS style={styles.container}>
                <TabBarIOS.Item
                    title='Feed'
                    selected={this.state.selectedTab == 'feed'}
                    // icon={require('image!pilar')}
                    onPress={() => this.setState({selectedTab: 'feed'})}
                >
                    <Text style={styles.welcome}>This is the feed</Text>
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title='Search'
                    selected={this.state.selectedTab == 'search'}
                    // icon={require('image!pilar')}
                    onPress={() => this.setState({selectedTab: 'search'})}
                >
                    <Text style={styles.welcome}>This is the search tab</Text>
                </TabBarIOS.Item>

            </TabBarIOS>
        );
    }
}