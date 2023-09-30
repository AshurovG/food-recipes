import { action, computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'utils/useLocalStore';

export type PrivateFields = '_isBurgerMenuOpen';

export default class HeaderStore implements ILocalStore {
    private _isBurgerMenuOpen = false;

    public setIsBurgerMenuOpen = () => {
        this._isBurgerMenuOpen = !this._isBurgerMenuOpen;
    }

    constructor() {
        makeObservable<HeaderStore, PrivateFields>(this, {
            _isBurgerMenuOpen: observable,
            isBurgerMenuOpen: computed,
            setIsBurgerMenuOpen: action
        })
    };

    get isBurgerMenuOpen(): boolean {
        return this._isBurgerMenuOpen;
    };

    reset(): void {}

    destroy(): void {}
}