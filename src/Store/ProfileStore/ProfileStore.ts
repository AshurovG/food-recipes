import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'utils/useLocalStore';
import rootStore from 'Store/RootStore/instance';
import {UserInfo} from './types'


export type PrivateFields = '_usernameValue' | '_fullnameValue';

export default class ProfileStore implements ILocalStore {
    private _usernameValue = '';
    private _fullnameValue = '';

    public handleButtonClick() {
        localStorage.setItem('isLogin', 'false');
        localStorage.removeItem('savedRecipes');
        rootStore.auth.setIsLogin(false)
    }

    constructor() {
        const userInfoString = localStorage.getItem('userInfo');
        console.log(userInfoString)
        if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);
            this._usernameValue = userInfo.username;
            this._fullnameValue = userInfo.fullname;
        }
        
        makeObservable<ProfileStore, PrivateFields>(this, {
            _usernameValue: observable,
            _fullnameValue: observable,
            usernameValue: computed,
            fullnameValue: computed
        })
    };

    get usernameValue(): string {
        return this._usernameValue;
    };

    get fullnameValue(): string {
        return this._fullnameValue;
    };



    reset(): void {}

    destroy(): void {}
}