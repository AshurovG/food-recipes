import { computed, makeObservable, observable } from 'mobx';
import { ILocalStore } from 'utils/useLocalStore';

export type PrivateFields = '_isOpen' | '_isTyping' | '_filter';

export default class DropdownStore implements ILocalStore {
    private _isOpen = false;
    private _isTyping = false;
    private _filter = '';

    public setIsOpen = (value: boolean): void => {
        this._isOpen = value;
    };

    public setIsTyping = (value: boolean): void => {
        this._isTyping = value;
    };


    public setFilter = (value: string): void => {
        this._filter = value;
    };

    constructor() {
        makeObservable<DropdownStore, PrivateFields>(this, {
            _isOpen: observable,
            _isTyping: observable,
            _filter: observable,
            isOpen: computed,
            isTyping: computed,
            filter: computed,
        })
    };

    get isOpen(): boolean {
        return this._isOpen;
    };

    get isTyping(): boolean {
        return this._isTyping;
    };

    get filter(): string {
        return this._filter;
    };

    destroy(): void {
        this._isOpen = false
        this._isTyping = false;
        this._filter = '';
    }
}