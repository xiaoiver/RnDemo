'use strict';

import React, { Component } from 'react';

import {
    StyleSheet,
    View,
} from 'react-native';

import {
    Container,
    Content,
    List,
    ListItem,
    Button,
    Input,
    InputGroup,
    Icon
} from 'native-base';

import Theme from '../../_global/styles/Theme';
import {
    ROLE_SIMPLE_VILLAGER,
    ROLES_MAP
} from '../../../constants/roleTypes';

class RoleItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            num: this.props.num
        };
    }

    render() {
        return (
            <ListItem>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                    <Icon name="ios-mail-outline" style={{ color: '#0A69FE' }} />
                    <Input placeholder="人数" keyboardType="numeric" value={this.state.num}
                        onChangeText={(num) => this.setState({num})}/>
                    <View style={{width: 120, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Button onPress={this.props.addRoleItemNum}>
                            <Icon name='ios-add-circle' />
                        </Button>
                        <Button onPress={this.props.removeRoleItemNum}>
                            <Icon name='ios-remove-circle' />
                        </Button>
                        <Button danger onPress={this.props.deleteRoleItem}>
                            <Icon name='ios-close-circle' />
                        </Button>
                    </View>
                </View>
            </ListItem>
        );
    }
}

class GameCreator extends Component {
    static navigatorButtons = {
        leftButtons: [
            {
                title: '关闭',
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
        this.state = {
            roles: {}
        };
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'close') {
                this.props.navigator.dismissModal();
            }
            if (event.id == 'save') {
                this.props.navigator.dismissModal();
            }
        }
    }

    _onAddRoleItemNum(roleType = ROLE_SIMPLE_VILLAGER) {
        if (!this.state.roles[roleType]) {
            this.setState({
                roles: {
                    [roleType]: {
                        num: 1
                    }
                }
            });
        }
        else {
            let {num} = this.state.roles[roleType];
            this.setState({
                roles: {
                    [roleType]: {
                        num: num++
                    }
                }
            });
        }
    }

    _onRemoveRoleItemNum(roleType = ROLE_SIMPLE_VILLAGER) {
        
    }

    _onDeleteRoleItem(roleType = ROLE_SIMPLE_VILLAGER) {

    }

    render() {
        const roleType = ROLE_SIMPLE_VILLAGER;
        return (
            <Container>
                <Content theme={Theme}>
                    <List>
                        <RoleItem
                            type={roleType}
                            num={'0'}
                            addRoleItemNum={this._onAddRoleItemNum.bind(this, roleType)}
                            removeRoleItemNum={this._onRemoveRoleItemNum.bind(this, roleType)}
                            deleteRoleItem={this._onDeleteRoleItem.bind(this, roleType)}
                        />
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({

});


export default GameCreator;