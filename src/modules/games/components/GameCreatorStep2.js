'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Text
} from 'react-native';

import {
    Container,
    Content,
    List,
    ListItem,
    Button,
    Input,
    Icon,
    CheckBox
} from 'native-base';

import Theme from '../../_global/styles/Theme';

class GameCreatorStep2 extends Component {
    static navigatorButtons = {
        leftButtons: [
            {
                title: '上一步',
                id: 'close'
            }
        ],
        rightButtons: [
            {
                title: '保存',
                id: 'save'
            }
        ]
    };

    constructor(props) {
        super(props);
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'close') {
                this.props.navigator.dismissModal();
            }
            if (event.id == 'save') {
            }
        }
    }

    render() {
        return (
            <Container>
                <Content theme={Theme}>
                    <Text>{this.props.roles.total}</Text>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});


export default GameCreatorStep2;