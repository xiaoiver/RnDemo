'use strict';

import React, { Component } from 'react';

import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  ActionSheetIOS
} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import ImagePicker from 'react-native-image-picker';

import { formatDateToNow } from '../../../utils/Date';

const MORE_BUTTONS = [
    '删除',
    '分享',
    '取消'
];

const CANCEL_INDEX = 2;
const DESTRUCTIVE_INDEX = 0;

class GameListItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            avatarSource: null
        };

        this._onMore = this._onMore.bind(this);
        this._onCamera = this._onCamera.bind(this);
    }

    _onMore() {
        ActionSheetIOS.showActionSheetWithOptions({
            options: MORE_BUTTONS,
            // title: this.props.info,
            cancelButtonIndex: CANCEL_INDEX,
            destructiveButtonIndex: DESTRUCTIVE_INDEX
        },
        (buttonIndex) => {
            
        });
    }

    _onCamera() {
        ImagePicker.showImagePicker({
            title: '添加图片',
            cancelButtonTitle: '取消',
            takePhotoButtonTitle: '拍照',
            chooseFromLibraryButtonTitle: '从相册中选择',
            storageOptions: {
                skipBackup: true,
                path: 'images'
            }
        }, (response) => {
            let source = { uri: 'data:image/jpeg;base64,' + response.data };
            this.setState({
                avatarSource: source
            });
        });
    }

    render() {
        const { game, viewGame } = this.props;
        const gallery = game.gallery ? game.gallery.map((source, i) => {
            return (
                <Image key={i} source={{uri: source}} style={{width: 40, height: 40}} />
            );
        }) : <Text>暂无</Text>;
        return (
            <TouchableOpacity activeOpacity={0.9} onPress={viewGame.bind(this, game)}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <View>
                            <View style={styles.time}>
                                <Icon name="ios-time-outline" size={16}/>
                                <Text style={{marginLeft: 8}}>{game.baseInfo.datetime}</Text>
                            </View>
                            <View style={styles.location}>
                                <Icon name="ios-locate-outline" size={16}/>
                                <Text style={{marginLeft: 8}}>{game.baseInfo.location}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={this._onMore} activeOpacity={0.5}>
                            <Icon name="ios-more" size={24} color="black"/>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                    style={{height: 120}}
                    horizontal={true}>
                        {gallery}
                        <Image source={this.state.avatarSource} style={{height: 100, width: 100}}/>
                    </ScrollView>
                    <View style={styles.footer}>
                        <TouchableOpacity onPress={this._onCamera} activeOpacity={0.5}>
                            <Icon name="ios-images-outline" size={24} color="black"/>
                        </TouchableOpacity>
                        <Text>{formatDateToNow(game.createTime)}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#bbb',
    },
    header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    time: {
        flex: 1,
        flexDirection: 'row'
    },
    location: {
        flex: 1,
        flexDirection: 'row'
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
});


export default GameListItem;