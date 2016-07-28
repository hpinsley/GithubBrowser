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

export class RepoRow extends Component {

    constructor(props) {
        super(props);

        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.state = {
            repo: props.repo
        };
    }

    render() {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'center'
            }}>
                <Image source={{uri: this.state.repo.owner.avatar_url}}
                    style={{
                        height: 36,
                        width: 36,
                        borderRadius: 18
                    }} />

                <Text style={{
                    paddingTop: 20,
                    paddingBottom: 20,
                    fontSize: 20
                }}>
                   Created {moment(this.state.repo.created_at).fromNow()}
                </Text>
                <Text>Url: <Text style={styles.bold}>{this.state.repo.html_url}</Text></Text>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    bold: {
        fontWeight: '800',
        fontSize: 16
    }
});