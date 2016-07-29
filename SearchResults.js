'use strict';

import React, { Component } from 'react';
import {
    ActivityIndicator,
    Image,
    ListView,
    StyleSheet,
    Text,
    TouchableHighlight,
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
            searchText: props.searchText,
            showProgress: true
        };
    }

    componentDidMount() {
        this.doSearch();
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

    repoClick(repo) {
        console.log(`Please show detail for ${repo.html_url}!`);
    }

    renderRow(repo) {
        return (
            <View>
                <TouchableHighlight onPress={() => this.repoClick(repo)}>
                    <View>
                        <RepoRow repo={repo}></RepoRow>
                    </View>
                </TouchableHighlight>
            </View>
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
            })
            .finally(() => {
                this.setState({showProgress: false})
            });
        });
    }
}