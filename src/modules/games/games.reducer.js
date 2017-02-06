import * as types from '../../constants/actionTypes';
import initialState from '../../reducers/initialState';

export default function (state = initialState.games, action) {
    switch (action.type) {

        case types.RETRIEVE_GAMES_LIST_SUCCESS:
            return {
                ...state,
                list: action.list
            };

        default:
            return state;
    }
}
