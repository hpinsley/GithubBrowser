'use strict';

import React, { Component } from 'react';
import {
    Image,
    ListView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import AuthService from './AuthService';
import moment from 'moment';
import {RepoRow} from './RepoRow';

export class SearchResults extends Component {

    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: ds.cloneWithRows([]),
            searchText: props.searchText
        };
    }

    componentDidMount() {
        this.doSearch();
    }

    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: 80,
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <Text>Search for {this.state.searchText}</Text>

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

    renderRow(repo) {
        return (
            <RepoRow repo={repo}></RepoRow>
        );
    }
    doSearch() {
        AuthService.getAuthInfo((err, authInfo) => {
            let searchTerm = encodeURIComponent(this.state.searchText);
            var url = `https://api.github.com/search/repositories?q=${searchTerm}`;
            console.log(`Searching repositories with ${url}`);

            fetch(url, {
                headers: authInfo.header
            })
            .then(response => {
                return response.json();
            })
            .then(responseData => {
                console.log(responseData);
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData.items)
                })
            });
        });
    }
}