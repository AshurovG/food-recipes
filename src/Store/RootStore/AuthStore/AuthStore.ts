import { action, computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_isLogin';

export default class AuthStore {
    private _isLogin = localStorage.getItem('isLogin') === 'true';

    public setIsLogin = (value: boolean) => {
        console.log('set')
        this._isLogin = value;
    }

    constructor() {
        console.log('constructor')
        makeObservable<AuthStore, PrivateFields>(this, {
            _isLogin: observable,
            isLogin: computed,
            setIsLogin: action
        });
    }

    get isLogin(): boolean {
        return this._isLogin;
    }
}