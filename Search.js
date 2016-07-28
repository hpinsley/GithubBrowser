'use strict';

import React, { Component } from 'react';
import {
    Text,
    TouchableHighlight,
    View
} from 'react-native';

export class Search extends Component {

    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {

        return (
            <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                marginTop: 20
            }}>
                <Text style={{
                    fontSize: 20,
                    color: 'blue'
                }}>The Search Component</Text>
            </View>
        );
    }
}