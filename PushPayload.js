'use strict';

import React, { Component } from 'react';
import {
    Image,
    ListView,
    Text,
    View
} from 'react-native';

export class PushPayload extends Component {

    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            dataSource: ds.cloneWithRows([])
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
                <Text>
                Hello There {this.props.pushEvent.actor.login}
                </Text>
            </View>
        );
    }
}