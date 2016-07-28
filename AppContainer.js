'use strict';

import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  NavigatorIOS,
  TabBarIOS,
  Text,
  View
} from 'react-native';

import {Feed} from './Feed';
import {Search} from './Search';

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
            }
        });

        return (
            <TabBarIOS style={styles.container}>
                <TabBarIOS.Item
                    title='Feed'
                    selected={this.state.selectedTab == 'feed'}
                    //icon={require('image!pilar')}
                    onPress={() => this.setState({selectedTab: 'feed'})}
                >
                    <NavigatorIOS style={{
                        flex: 1
                    }}
                    initialRoute={{
                        title: 'Feed',
                        component: Feed
                    }}>

                    </NavigatorIOS>
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title='Search'
                    selected={this.state.selectedTab == 'search'}
                    // icon={require('image!pilar')}
                    onPress={() => this.setState({selectedTab: 'search'})}
                >
                    <NavigatorIOS style={{
                        flex: 1
                    }}
                    initialRoute={{
                        title: 'Search',
                        component: Search,
                    }}>

                    </NavigatorIOS>
                </TabBarIOS.Item>

            </TabBarIOS>
        );
    }
}