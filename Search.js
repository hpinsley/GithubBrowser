'use strict';

import React, { Component } from 'react';
import {
    Text,
    TextInput,
    TouchableHighlight,
    View
} from 'react-native';

import {SearchResults} from './SearchResults';

export class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
            searchText: ''
        };
    }

    onSearchPressed() {
        console.log(`Start the search for ${this.state.searchText}`);
        this.setState({searchText: ''});
        this.props.navigator.push({
            title: 'Search Results',
            component: SearchResults,
            passProps: {
                searchText: this.state.searchText
            }
        });
    }

    render() {

        return (
            <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                marginTop: 80,
                alignItems: 'center',
                padding: 10
            }}>
                <TextInput style={{
                    height: 50,
                    marginTop: 10,
                    padding: 4,
                    fontSize: 18,
                    borderWidth: 1,
                    borderColor: '#48bbec'
                }} onChangeText={(text) => this.setState({searchText:text})}
                    value={this.state.searchText}
                    placeholder="Search for" />

                <TouchableHighlight
                    onPress={this.onSearchPressed.bind(this)}
                    style={{
                        height: 50,
                        backgroundColor: '#48bbec',
                        alignSelf: 'stretch',
                        marginTop: 10,
                        justifyContent: 'center'
                    }}>

                    <Text style={{fontSize: 22,color: '#fff',alignSelf: 'center'}}>Search</Text>

                </TouchableHighlight>
            </View>
        );
    }
}