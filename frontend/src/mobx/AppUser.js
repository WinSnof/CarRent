import {makeAutoObservable} from 'mobx'

export default class AppUser {
    constructor() {
        //TODO: сделать сохранение пользователя что бы при перезагрузке он сохранялся и не нужно было заново входить
        this._isAuth = false;
        this._user = [];
        this._usersList = [];
        this._userInfo = [];
        makeAutoObservable(this);
    }


    setUserInfo(info) {
        this._userInfo = info;
    }

    get userInfo() {
        return this._userInfo;
    }

    setUsersList(users) {
        this._usersList = users;
    }

    get usersList() {
        return this._usersList;
    }

    setIsAuth(bool) {
        this._isAuth = bool;
    }

    get isAuth() {
        return this._isAuth;
    }

    setUser(user) {
        this._user = user;
    }

    get user() {
        return this._user;
    }
}