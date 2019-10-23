import { userConstants } from '../_constants';
import {alertActions} from './alert.actions';
import {userService} from '../_services';
import {history} from '../_helpers';


export const userActions = {
    login,
    logout,
    getAll,
}

function login(userName, passWd){
    return dispatch => {
        dispatch(request({userName}));
        // Call Service login
        userService.login(userName, passWd)
        .then(
            user => {
                dispatch(success(user));
                history.push('/');
            },
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error));
            }
        )
    }
    function request(user) {
        return {type: userConstants.LOGIN_REQUEST, user}
    }
    function success(user) {
        return {type: userConstants.LOGIN_SUCCESS, user}
    }
    function failure(error) {
        return {type: userConstants.LOGIN_FAILURE, error}
    }
}

function logout(){
    // call service logout
    userService.logout();
    return {type: userConstants.LOGOUT};
}

function getAll(){

    return dispatch => {
        dispatch(request());
        //call service getAll
        userService.getAll()
        .then(
            users => dispatch(success(users)),
            error => {
                dispatch(failure(error));
                dispatch(alertActions.error(error))
            }
        );
    };
    
    function request() {
        return {type: userConstants.GETALL_REQUEST}
    }
    function success(user) {
        return {type: userConstants.GETALL_SUCCESS, user}
    }
    function failure(error) {
        return {type: userConstants.GETALL_FAILURE, error}
    }
}