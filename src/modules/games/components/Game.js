'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';

class Game extends Component {
    static navigatorButtons = {
        // leftButtons: [
        //     {
        //         title: '返回',
        //         id: 'goBack'
        //     }
        // ],
        rightButtons: [
            {
                title: 'Edit',
                id: 'edit'
            }
        ]
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'edit') {
            }
            else if (event.id == 'goBack') {
                this.props.navigator.pop({
                    animated: true
                });
            }
        }
    }

    render() {
        return (
            <View />
        );
    }
}

const styles = StyleSheet.create({

});


export default Game;