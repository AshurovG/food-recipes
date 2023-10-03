import axios from 'axios';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { ILocalStore } from 'utils/useLocalStore';
import {UserInfo} from './types'
import { apiKey } from '../../../consts.config';
import rootStore from 'Store/RootStore/instance';

export interface IAuthFormStore {
    postUserData(): Promise<void>;
}

export type PrivateFields = '_usernameValue' | '_fullnameValue' | '_passwordValue' | '_isLoginForm' | '_isModalWindow' | '_isExistError' | '_isIncorrectError' | '_usernameValid' | '_fullnameValid' | '_passwordValid';

export default class AuthFormStore implements IAuthFormStore, ILocalStore {
    private _usernameValue = '';
    private _fullnameValue = '';
    private _passwordValue = '';
    private _isLoginForm = false;
    private _isModalWindow = false;
    private _isExistError = false;
    private _isIncorrectError = false;
    private _usernameValid = '';
    private _fullnameValid = '';
    private _passwordValid = '';

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

    public handleLoginButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        this.validation();
        if (this._usernameValid === '' && this._passwordValid === '') {
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
        }
    };

    public handleRegisterButtonClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
      
        this.validation();
        if (this._fullnameValid === '' && this._usernameValid === '' && this._passwordValid === '') {
          const userInfoString = localStorage.getItem('userInfo');
          if (userInfoString) {
            const userInfo = JSON.parse(userInfoString);
            if (this._usernameValue === userInfo.username) {
              this._isExistError = true;
            } else {
              this._isModalWindow = true;
              this.postUserData();
            }
          }
        }
      };

    public handleCloseButtonClick = (): void => {
        rootStore.auth.setIsLogin(true)
    }

    public validation = (): void => {
        if ((this._usernameValue.length < 6 || this._usernameValue.length > 15) && this._usernameValue.length !== 0) {
            this._usernameValid = 'User name must be between 6 and 15 characters';
        } else if (this._usernameValue.length === 0) {
            this._usernameValid = 'This is a required field';
        } else {
            this._usernameValid = ''
        }

        if ((this._passwordValue.length < 8 || this._passwordValue.length > 20) && this._passwordValue.length !== 0) {
            this._passwordValid = 'Password must be between 8 and 20 characters';
        } else if (this._passwordValue.length === 0) {
            this._passwordValid = 'This is a required field';
        } else {
            this._passwordValid = '';
        }

        if (!this._isLoginForm) {
            const words = this._fullnameValue.split(" ");
            console.log(words.length)
            console.log(`words ${words}`)
            if ((words.length < 2 || words.length > 5) && this._fullnameValue.length !== 0) {
                this._fullnameValid = 'The name should be from 2 to 5 words'
            } else if (this._fullnameValue.length === 0) {
                this._fullnameValid = 'This is a required field'
            } else {
                this._fullnameValid = ''
            }
        }
    }

    constructor() {
        makeObservable<AuthFormStore, PrivateFields>(this, {
            _usernameValue: observable,
            _fullnameValue: observable,
            _passwordValue: observable,
            _isLoginForm: observable,
            _isModalWindow: observable,
            _isExistError: observable,
            _isIncorrectError: observable,
            _usernameValid: observable,
            _fullnameValid: observable,
            _passwordValid: observable,
            usernameValue: computed,
            fullnameValue: computed,
            passwordValue: computed,
            isLoginForm: computed,
            isModalWindow: computed,
            isExistError: computed,
            isIncorrectError: computed,
            usernameValid: computed,
            fullnameValid: computed,
            passwordValid: computed,
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

    get usernameValid(): string {
        return this._usernameValid;
    }

    get fullnameValid(): string {
        return this._fullnameValid;
    }

    get passwordValid(): string {
        return this._passwordValid;
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