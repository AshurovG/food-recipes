import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'utils/useLocalStore';

export type PrivateFields = '_isBurgerMenuOpen' | '_isAuthFormOpen';

export default class HeaderStore implements ILocalStore {
    private _isBurgerMenuOpen = false;
    private _isAuthFormOpen = false;

    public setIsBurgerMenuOpen = () => {
        this._isBurgerMenuOpen = !this._isBurgerMenuOpen;
    }

    public setIsAuthFormOpen = () => {
        console.log('ФОРМА РЕГИСТРАЦИИ')
        this._isAuthFormOpen = true
    }

    constructor() {
        makeObservable<HeaderStore, PrivateFields>(this, {
            _isBurgerMenuOpen: observable,
            _isAuthFormOpen: observable,
            isBurgerMenuOpen: computed,
            isAuthFormOpen: computed,
            setIsBurgerMenuOpen: action,
            setIsAuthFormOpen: action
        })
    };

    get isBurgerMenuOpen(): boolean {
        return this._isBurgerMenuOpen;
    };
    
    get isAuthFormOpen(): boolean {
        return this._isAuthFormOpen;
    };

    reset(): void {}

    destroy(): void {}
}