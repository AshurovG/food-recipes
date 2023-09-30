import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { ILocalStore } from 'utils/useLocalStore';

export type PrivateFields = '_usernameValue' | '_fullnameValue' | '_passwordValue' | '_isLoginForm';

export default class AuthFormStore implements ILocalStore {
    private _usernameValue = '';
    private _fullnameValue = '';
    private _passwordValue = '';
    private _isLoginForm = false;

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
        console.log('fkldkls')
        this._isLoginForm = !this._isLoginForm;
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

    reset(): void {}

    destroy(): void {}
}