/* eslint-disable import/prefer-default-export */
import { Navigation } from 'react-native-navigation';

// import Drawer from './modules/_global/Drawer';
import GameList from './modules/games/GameList';
import Game from './modules/games/components/Game';
import GameCreator from './modules/games/components/GameCreator';

export function registerScreens(store, Provider) {
    Navigation.registerComponent('WerewolfReplayer.GameList', () => GameList, store, Provider); // 列表页
    Navigation.registerComponent('WerewolfReplayer.Game', () => Game, store, Provider); // 详情页
    Navigation.registerComponent('WerewolfReplayer.GameCreator', () => GameCreator, store, Provider); // 创建游戏界面
}
