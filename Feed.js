'use strict';

import React, { Component } from 'react';
import {
    ActivityIndicator,
    Image,
    ListView,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

import AuthService from './AuthService';
import moment from 'moment';
import {PushPayload} from './PushPayload';

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

    pressRow(rowData) {
        console.log('You pressed on ' + rowData.actor.login);

        // Note that since we embedded the feed component as the initial route in the
        // Navigator component used in AppContainer, we can reference the very same navigator
        // in our props.
        this.props.navigator.push({
            title: 'Push Event',
            component: PushPayload,
            passProps: {
                pushEvent: rowData
            }
        });
    }

    renderRow(rowData) {
        return (
            <TouchableHighlight
                underlayColor='#ddd'
                onPress={() => this.pressRow(rowData)}>

                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    padding: 20,
                    alignItems: 'center',
                    borderColor: '#D7D7D7',
                    borderBottomWidth: 1
                }}>
                    <Image source={{ uri: rowData.actor.avatar_url }}
                        style={{
                            height: 36,
                            width: 36,
                            borderRadius: 18
                        }} />

                    <View style={{
                        paddingLeft: 20
                    }}>
                        <Text style={{ backgroundColor: '#fff'}}>
                            {moment(rowData.created_at).fromNow()}
                        </Text>
                        <Text style={{
                            backgroundColor: '#fff',
                            fontWeight: '600'
                        }}>
                            {rowData.actor.login}
                        </Text>
                        <Text style={{ backgroundColor: '#fff'}}>
                            {rowData.payload.ref.replace('refs/heads/', '')}
                        </Text>
                        <Text style={{ backgroundColor: '#fff'}}>
                            at <Text style={{fontWeight: '600'}}>{rowData.repo.name}</Text>
                        </Text>
                    </View>
                </View>
            </TouchableHighlight>
        );
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
                justifyContent: 'flex-start',
                backgroundColor: 'white',
                marginTop: 20
            }}>
                <ListView
                    style={{
                        marginTop: 40
                    }}
                    enableEmptySections={true}
                    dataSource={this.state.dataSource}
                    renderRow={this.renderRow.bind(this)} />
            </View>
        );
    }
}