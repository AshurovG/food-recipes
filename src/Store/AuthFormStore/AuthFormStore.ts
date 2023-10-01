import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { ILocalStore } from 'utils/useLocalStore';
import {UserInfo} from './types'
import { apiKey } from '../../../consts.config';

export interface IAuthFormStore {
    postUserData(): Promise<void>;
}

export type PrivateFields = '_usernameValue' | '_fullnameValue' | '_passwordValue' | '_isLoginForm' | '_isModalWindow' | '_isExistError' | '_isIncorrectError';

export default class AuthFormStore implements IAuthFormStore, ILocalStore {
    private _usernameValue = '';
    private _fullnameValue = '';
    private _passwordValue = '';
    private _isLoginForm = false;
    private _isModalWindow = false;
    private _isExistError = false;
    private _isIncorrectError = false


    private _userInfo: UserInfo  = null;


    public setUsernameValue = (value: string): void => {
        this._usernameValue = value;
    };

    public setFullnameValue = (value: string): void => {
        this._fullnameValue = value;
    };

    public setPasswordValue = (value: string): void => {
        this._passwordValue = value;
    };

    public setIsLoginForm = (): void => {
        this._isLoginForm = !this._isLoginForm;
    };

    public handleLoginButtonClick = (): void => {
        const userInfoString = localStorage.getItem('userInfo');
        if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);
            if (this._usernameValue === userInfo.username && this._passwordValue === userInfo.password) {
                localStorage.setItem('isLogin', 'true');
                this._isModalWindow = true;
            } else {
                this._isIncorrectError = true
            }
        }
    };

    public handleRegisterButtonClick = (): void => {
        const userInfoString = localStorage.getItem('userInfo');
        if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);
            if (this._usernameValue === userInfo.username) {
                this._isExistError = true
            } else {
                this._isModalWindow = true;
                this.postUserData()
            }
        }
    };

    constructor() {
        makeObservable<AuthFormStore, PrivateFields>(this, {
            _usernameValue: observable,
            _fullnameValue: observable,
            _passwordValue: observable,
            _isLoginForm: observable,
            _isModalWindow: observable,
            _isExistError: observable,
            _isIncorrectError: observable,
            usernameValue: computed,
            fullnameValue: computed,
            passwordValue: computed,
            isLoginForm: computed,
            isModalWindow: computed,
            isExistError: computed,
            isIncorrectError: computed,
            setUsernameValue: action,
            setFullnameValue: action,
            setPasswordValue: action,
            setIsLoginForm: action
        })
    };

    get usernameValue(): string {
        return this._usernameValue;
    };

    get fullnameValue(): string {
        return this._fullnameValue;
    };
    
    get passwordValue(): string {
        return this._passwordValue;
    };

    get isLoginForm(): boolean {
        return this._isLoginForm;
    }

    get isModalWindow(): boolean {
        return this._isModalWindow;
    }

    get isExistError(): boolean {
        return this._isExistError;
    }
    get isIncorrectError(): boolean {
        return this._isIncorrectError;
    }

    async postUserData(): Promise<void> {
        const url = `https://api.spoonacular.com/users/connect?apiKey=${apiKey}`;
        const requestBody = {
            username: this._usernameValue,
            fullname:  this._fullnameValue,
            password: this.passwordValue,
        };

        const response = await axios.post(url, requestBody);

        runInAction(() => {
            if (response.status === 200) {
                this._userInfo = {
                    username: this._usernameValue,
                    password: this._passwordValue,
                    fullname: this._fullnameValue,
                    spoonacularUsername: response.data.username,
                    spoonacularPassword: response.data.spoonacularPassword,
                    hash: response.data.hash
                }

                localStorage.setItem('userInfo', JSON.stringify(this._userInfo));
                localStorage.setItem('isLogin', 'true');
                return
            }
        })
    }

    reset(): void {
        this._isModalWindow = false;
        this._passwordValue = '';
        this._userInfo = null;
        this._usernameValue = '';
        this._fullnameValue = '';
        this._passwordValue = '';
        this._isExistError = false;
        this._isIncorrectError = false;
    }

    destroy(): void {}
}