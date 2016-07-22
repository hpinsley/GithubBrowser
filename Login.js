'use strict';

var React = require('react');
var ReactNative = require('react-native');

var Text = ReactNative.Text;
var View = ReactNative.View;
var StyleSheet = ReactNative.StyleSheet;

var Login = React.createClass({

    render: function() {
        return (
            <Text style={styles.container}>Hello</Text>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5FCFF'
    }
});
module.exports = Login;