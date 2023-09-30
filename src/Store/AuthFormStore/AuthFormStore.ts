import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { ILocalStore } from 'utils/useLocalStore';
import {UserInfo} from './types'
import { apiKey } from '../../../consts.config';

export interface IMealPlanStore {
    postUserData(): Promise<void>;
}

export type PrivateFields = '_usernameValue' | '_fullnameValue' | '_passwordValue' | '_isLoginForm';

export default class AuthFormStore implements IMealPlanStore, ILocalStore {
    private _usernameValue = '';
    private _fullnameValue = '';
    private _passwordValue = '';
    private _isLoginForm = false;

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

    };

    public handleRegisterButtonClick = (): void => {
        this.postUserData()
    };

    constructor() {
        makeObservable<AuthFormStore, PrivateFields>(this, {
            _usernameValue: observable,
            _fullnameValue: observable,
            _passwordValue: observable,
            _isLoginForm: observable,
            usernameValue: computed,
            fullnameValue: computed,
            passwordValue: computed,
            isLoginForm: computed,
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
        return this._isLoginForm
    }

    async postUserData(): Promise<void> {
        // const requestBody = {
            // username: this._usernameValue,
            // fullname:  this._fullnameValue,
            // password: this.passwordValue,
        // };

        // const response = await axios({
        //     method: 'POST',
        //     url: `https://api.spoonacular.com/users/connect?apiKey=${apiKey}`
        // });

        // console.log(response.data);

        const url = `https://api.spoonacular.com/users/connect?apiKey=${apiKey}`;
        const requestBody = {
            username: this._usernameValue,
            fullname:  this._fullnameValue,
            password: this.passwordValue,
        };

        const response = await axios.post(url, requestBody);

        runInAction(() => {
            console.log('sjdksjdksljdkl')
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

    reset(): void {}

    destroy(): void {}
}