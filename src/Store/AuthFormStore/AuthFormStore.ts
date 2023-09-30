import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { ILocalStore } from 'utils/useLocalStore';
import {SentUserInfo, ReceivedUserInfo} from './types'
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
    private _sentUserInfo: SentUserInfo  = {
        username: '',
        fullname: '',
        password: ''
    };
    private _receivedUserInfo: ReceivedUserInfo  = null;


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
        // this._sentUserInfo.username = this._usernameValue;
        // this._sentUserInfo.password = this._passwordValue;
        // if (!this._isLoginForm) {
        //     this._sentUserInfo.fullname = this._fullnameValue
        // }
        console.log(111111111111111)
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
        // const requestBody: SentUserInfo = {
        //     username: this._usernameValue,
        //     password: this.passwordValue,
        //   };
          
        //   if (this._fullnameValue) {
        //     requestBody.fullname = this._fullnameValue;
        //   }
        // console.log(requestBody)
        // const response = await axios({
        //     method: 'POST',
        //     url: `https://api.spoonacular.com/users/connect&apiKey=${apiKey}`
        // });

        // console.log(response.data);

        // const response = await axios({
        //     method: 'get',
        //     url: `https://api.spoonacular.com/recipes/complexSearch?query=${newInputValue}&apiKey=${apiKey}&addRecipeNutrition=true&offset=${this._offset}&number=6&type=${newTypesValue}`
        // });

        // runInAction(() => {
        //     // if (response.status === 200) {
        //     //     return
        //     // }
        // })
    }

    reset(): void {}

    destroy(): void {}
}