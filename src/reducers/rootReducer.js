import { combineReducers } from 'redux';
import games from '../modules/games/games.reducer';

const rootReducer = combineReducers({
    games
});

export default rootReducer;
