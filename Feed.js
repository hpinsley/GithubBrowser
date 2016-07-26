'use strict';

import React, { Component } from 'react';
import {
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
            dataSource: ds.cloneWithRows(['A', 'B', 'C'])
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
                this.setState({dataSource: this.state.dataSource.cloneWithRows(feedData)});
            });
        });
    }
    renderRow(rowData) {
        return <Text style={{
            color: '#333',
            backgroundColor: '#fff',
            alignSelf: 'center'
        }}>
        {rowData}
        </Text>
    }

    render() {

        return (
            <View style={{
                flex: 1,
                //justifyContext: 'flex-start'
            }}>
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)} />
            </View>
        );
    }
}