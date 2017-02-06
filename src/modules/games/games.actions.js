import * as types from '../../constants/actionTypes';
import { DB_URL } from '../../constants/api';

export function retrieveGamesList() {
    return function (dispatch) {
        return fetch(`${DB_URL}/games`)
        .then((response) => response.json())
        .then(responseJson => {
            dispatch({
                type: types.RETRIEVE_GAMES_LIST_SUCCESS,
                list: {
                    results: responseJson.result
                }
            });
        })
        .catch(error => {
            console.log(error); //eslint-disable-line
        });
    };
}
