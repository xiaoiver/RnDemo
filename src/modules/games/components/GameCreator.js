'use strict';

import React, { Component } from 'react';

import update from 'immutability-helper';

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
import {
    ROLE_SIMPLE_VILLAGER,
    ROLE_WEREWOLF,
    ROLES_MAP
} from '../../../constants/roleTypes';

class RoleItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let {roleType, callbacks} = this.props;
        let {icon, name, single} = ROLES_MAP[roleType];
        let iconName = `ios-${icon}-outline`;
        let buttons;
        if (single) {
            buttons = (
                <View style={styles.roleItemButtonsSingle}>
                    <Button danger onPress={callbacks.delete.bind(null, roleType)}>
                        <Icon name='ios-close-circle' />
                    </Button>
                </View>
            );
        }
        else {
            buttons = (
                <View style={styles.roleItemButtons}>
                    <Button onPress={callbacks.add.bind(null, roleType)}>
                        <Icon name='ios-add-circle' />
                    </Button>
                    <Button onPress={callbacks.remove.bind(null, roleType)}>
                        <Icon name='ios-remove-circle' />
                    </Button>
                    <Button danger onPress={callbacks.delete.bind(null, roleType)}>
                        <Icon name='ios-close-circle' />
                    </Button>
                </View>
            );
        }
        return (
            <ListItem>
                <View style={styles.roleItem}>
                    <Icon name={iconName} style={styles.roleItemIcon} />
                    <Text style={{width: 80}}>{name}</Text>
                    <Icon name='ios-close' style={styles.roleItemTimes} />
                    <Input style={{flex: 1}} placeholder="人数" keyboardType="numeric"
                        editable={!single}
                        defaultValue={this.props.num.toString()}
                        onChangeText={(text) => callbacks.set.call(null, roleType, text)}
                    />
                    {buttons}
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
                title: '下一步',
                id: 'next'
            }
        ]
    };

    constructor(props) {
        super(props);
        
        this.initRoles();
        this._onAddRoleItemNum = this._onAddRoleItemNum.bind(this);
        this._onRemoveRoleItemNum = this._onRemoveRoleItemNum.bind(this);
        this._onDeleteRoleItem = this._onDeleteRoleItem.bind(this);
        this._onSetRoleItemNum = this._onSetRoleItemNum.bind(this);
        
        this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }

    initRoles() {
        let roles = {
            total: 5
        };
        Object.keys(ROLES_MAP).forEach(roleType => {
            roles[roleType] = {
                num: 1
            }
        });
        this.state = {
            roles
        };
    }

    onNavigatorEvent(event) {
        if (event.type == 'NavBarButtonPress') {
            if (event.id == 'close') {
                this.props.navigator.dismissModal();
            }
            if (event.id == 'next') {
                this.props.navigator.showModal({
                    screen: 'WerewolfReplayer.GameCreatorStep2',
                    title: '创建新游戏 2/2',
                    passProps: {
                        roles: this.state.roles
                    }
                });
            }
        }
    }

    _onSetRoleItemNum(roleType, numToSet) {
        numToSet = Number(numToSet);
        let {total = 0} = this.state.roles;
        let {num = 0} = this.state.roles[roleType] || {};
        this.setState(update(this.state, {
            roles: {
                [roleType]: {
                    num: {
                        $set: numToSet
                    }
                },
                total: {
                    $set: total - num + numToSet
                }
            }
        }));
    }

    _onAddRoleItemNum(roleType) {
        let {total = 0} = this.state.roles;
        let {num = 0} = this.state.roles[roleType] || {};
        this.setState(update(this.state, {
            roles: {
                [roleType]: {
                    num: {
                        $set: ++num
                    }
                },
                total: {
                    $set: ++total
                }
            }
        }));
    }

    _onRemoveRoleItemNum(roleType) {
        let {total} = this.state.roles;
        let {num} = this.state.roles[roleType];
        if (num === 1) {
            return;
        }
        this.setState(update(this.state, {
            roles: {
                [roleType]: {
                    num: {
                        $set: --num
                    }
                },
                total: {
                    $set: --total
                }
            }
        }));
    }

    _onDeleteRoleItem(roleType) {
        let {total} = this.state.roles;
        let {num} = this.state.roles[roleType];
        this.setState(update(this.state, {
            roles: {
                [roleType]: {
                    num: {
                        $set: 0
                    }
                },
                total: {
                    $set: total - num
                }
            }
        }));
    }

    _onToggleRole(roleType, toggle) {
        if (toggle) {
            this._onDeleteRoleItem(roleType);
        }
        else {
            this._onAddRoleItemNum(roleType);
        }
    }

    render() {
        let {total} = this.state.roles;
        let roleItems = Object.keys(ROLES_MAP).map((roleType, roleTypeIdx) => {
            let role = this.state.roles[roleType];
            return (role && role.num > 0 &&
                <RoleItem
                    key={roleTypeIdx}
                    roleType={roleType}
                    num={role.num}
                    callbacks={{
                        add: this._onAddRoleItemNum,
                        remove: this._onRemoveRoleItemNum,
                        delete: this._onDeleteRoleItem,
                        set: this._onSetRoleItemNum
                    }}
                />
            );
        });

        let roleCheckbox = Object.keys(ROLES_MAP).map((roleType, roleTypeIdx) => {
            let role = this.state.roles[roleType];
            let checked = role && role.num > 0;
            return (
                <ListItem key={roleTypeIdx}>
                    <CheckBox
                        checked={checked}
                        onPress={this._onToggleRole.bind(this, roleType, checked)}/>
                    <Text>{ROLES_MAP[roleType].name}</Text>
                    <Text style={styles.roleCheckboxDesc}>{ROLES_MAP[roleType].desc}</Text>
                </ListItem>
            );
        });

        return (
            <Container>
                <Content theme={Theme}>
                    <View style={styles.header}>
                        <Text style={styles.headerText}>选择板子</Text>
                        <Text style={styles.headerText}>{total}人局</Text>
                    </View>
                    <List>
                        {roleCheckbox}
                    </List>
                    <List>
                        {roleItems}
                    </List>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginLeft: 15,
        marginRight: 12,
        paddingTop: 8 
    },
    headerText: {
        fontSize: 18
    },
    roleCheckboxDesc: {
        color: '#999'
    },
    roleItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    roleItemIcon: {
        color: '#0A69FE',
        width: 30,
        height: 30,
        fontSize: 30
    },
    roleItemTimes: {
        color: '#0A69FE',
        width: 24,
        height: 24,
        fontSize: 24
    },
    roleItemButtons: {
        width: 120,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    roleItemButtonsSingle: {
        width: 36.5,
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});


export default GameCreator;