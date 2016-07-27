'use strict';

import React, { Component } from 'react';
import {
    ActivityIndicator,
    ListView,
    Text,
    View
} from 'react-native';
import AuthService from './AuthService';

export class Feed extends Component {

    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: ds.cloneWithRows([]),
            showProgress: true
        };
    }

    componentDidMount() {
        this.fetchFeed();
    }

    fetchFeed() {
        AuthService.getAuthInfo((err, authInfo) => {
            var url = `https://api.github.com/users/${authInfo.user.login}/received_events`;
            console.log(`Fetching feed from ${url}`);

            fetch(url, {
                headers: authInfo.header
            })
            .then(response => {
                return response.json();
            })
            .then(responseData => {
                console.log(responseData);
                let feedData = responseData.filter(ev => ev.type == 'PushEvent');
                console.log('feeddata', feedData);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(feedData),
                    showProgress: false
                });
            });
        });
    }
    renderRow(rowData) {
        console.log('Rendering a row', rowData);

        return <Text style={{
            color: '#333',
            backgroundColor: '#fff',
            alignSelf: 'center'
        }}>
        {rowData.actor.login}
        </Text>
    }

    render() {

        if (this.state.showProgress) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center'
                }}>
                <ActivityIndicator
                    animating={true}
                    size="large"
                    style={{
                        marginTop: 20
                    }} />
                </View>
            );
        }

        return (
            <View style={{
                flex: 1,
                justifyContent: 'flex-start'
            }}>
                <ListView
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)} />
            </View>
        );
    }
}