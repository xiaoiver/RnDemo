'use strict';

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as gamesActions from './games.actions';
import GameListItem from './components/GameListItem';
import ProgressBar from '../_global/ProgressBar';
import {
    StyleSheet,
    Text,
    View,
    RefreshControl,
    ListView,
    Platform
} from 'react-native';
import { iconsMap, iconsLoaded } from '../../utils/AppIcons';

class GameList extends Component {

    static navigatorStyle = {
        navBarBackgroundColor: '#3684C1',
        drawUnderNavBar: true,
        navBarTranslucent: true
    };

    constructor(props) {
        super(props);

        iconsLoaded.then(() => {
            this.props.navigator.setButtons({
                rightButtons: [
                    {
                        icon: iconsMap['ios-add-circle'],
                        id: 'newGame'
                    }
                ]
            });
        });

        this.state = {
            isLoading: true,
            isRefreshing: false,
            currentPage: 1,
            list: {
                results: []
            }
        };

        this._viewGame = this._viewGame.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this.props.navigator.setOnNavigatorEvent(this._onNavigatorEvent.bind(this));
    }

    componentWillMount() {
        this._retrieveGamesList();
    }

    _retrieveGamesList(isRefreshed) {
        this.props.actions.retrieveGamesList(this.state.currentPage)
            .then(() => {
                const ds = new ListView.DataSource({ rowHasChanged: (row1, row2) => row1 !== row2 });
                const dataSource = ds.cloneWithRows(this.props.list.results);
                this.setState({
                    list: this.props.list,
                    dataSource,
                    isLoading: false
                });
            });
        if (isRefreshed && this.setState({ isRefreshing: false }));
    }

    _retrieveNextPage() {
        if (this.state.currentPage !== this.props.list.total_pages) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });

            let page;
            if (this.state.currentPage === 1) {
                page = 2;
                this.setState({ currentPage: 2 });
            } else {
                page = this.state.currentPage + 1;
            }

            // axios.get(`${TMDB_URL}/movie/${type}?&page=${page}`)
            //     .then(res => {
            //         const data = this.state.list.results;
            //         const newData = res.data.results;

            //         newData.map((item, index) => data.push(item));

            //         this.setState({
            //             dataSource: this.state.dataSource.cloneWithRows(this.state.list.results)
            //         });
            //     }).catch(err => {
            //         console.log('next page', err); // eslint-disable-line
            //     });
        }
    }

    _viewGame({gameId, gameName = '一局游戏'}) {
        this.props.navigator.push({
            screen: 'WerewolfReplayer.Game',
            title: gameName,
            passProps: {
                gameId
            }
        });
    }

    _onRefresh() {
        this.setState({ isRefreshing: true });
        this._retrieveGamesList('isRefreshed');
    }

    _onNavigatorEvent(event) {
        if (event.type === 'NavBarButtonPress') {
            if (event.id === 'newGame') {
                this.props.navigator.showModal({
                    screen: 'WerewolfReplayer.GameCreator',
                    title: '创建新游戏'
                });
            }
        }
    }

    render() {
        return (
            this.state.isLoading ? <View style={styles.progressBar}><ProgressBar /></View> :
            <ListView
                style={styles.container}
                enableEmptySections
                onEndReached={() => this._retrieveNextPage()}
                onEndReachedThreshold={1200}
                dataSource={this.state.dataSource}
                renderRow={rowData => <GameListItem game={rowData} viewGame={this._viewGame} />}
                renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.seperator} />}
                renderFooter={() => <View style={{ height: 50 }}><ProgressBar /></View>}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.isRefreshing}
                        onRefresh={this._onRefresh}
                        colors={['#fff']}
                        tintColor="black"
                        title="加载中..."
                        titleColor="black"
                        progressBackgroundColor="black"
                    />
                }
            />
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee',
        ...Platform.select({
            ios: {
                paddingTop: 83
            }
        })
    },
    progressBar: {
        backgroundColor: '#0a0a0a',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    seperator: {
        marginTop: 10,
        backgroundColor: '#8E8E8E'
    }
});

GameList.propTypes = {
    actions: PropTypes.object.isRequired,
    list: PropTypes.object.isRequired,
    navigator: PropTypes.object
};

function mapStateToProps(state, ownProps) {
    return {
        list: state.games.list
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(gamesActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GameList);