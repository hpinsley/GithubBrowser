'use strict';

import React, { Component } from 'react';
import {
    Image,
    ListView,
    StyleSheet,
    Text,
    View
} from 'react-native';

import moment from 'moment';

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

    render() {
        return (
            <View style={{
                flex: 1,
                paddingTop: 80,
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <Text>Search for {this.state.searchText}</Text>
            </View>
        );
    }
}