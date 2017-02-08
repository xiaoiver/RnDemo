/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import { View } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import { registerScreens } from './screens';

import { iconsMap, iconsLoaded } from './utils/AppIcons';
import configureStore from './store/configureStore';

import Theme from './modules/_global/styles/Theme';

const store = configureStore();

registerScreens(store, Provider);

const navigatorStyle = {
    navBarTranslucent: true,
    drawUnderNavBar: true,
    navBarTextColor: 'white',
    navBarButtonColor: 'white',
    statusBarTextColorScheme: 'light'
};

class App extends Component {
    constructor(props) {
        super(props);
        iconsLoaded.then(() => {
            this.startApp();
        });
    }

    startApp() {
        Navigation.startTabBasedApp({
            tabs: [
                {
                    label: '游戏',
                    screen: 'WerewolfReplayer.GameList',
                    icon: iconsMap['ios-film-outline'],
                    selectedIcon: iconsMap['ios-film'],
                    title: '游戏列表',
                    navigatorStyle
                },
                {
                    label: '设置',
                    screen: 'WerewolfReplayer.GameList',
                    icon: iconsMap['ios-desktop-outline'],
                    selectedIcon: iconsMap['ios-desktop'],
                    title: '我的',
                    navigatorStyle
                }
            ],
            tabsStyle: {
                tabBarButtonColor: 'white',
                tabBarSelectedButtonColor: 'white',
                tabBarBackgroundColor: Theme.brandPrimary
            }
        });
    }
}

export default App;
