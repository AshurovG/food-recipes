import { action, computed, makeObservable, observable } from 'mobx';

type PrivateFields = '_previousUrl';

export default class PreviousUrlStore {
    private _previousUrl = '';

    constructor() {
        makeObservable<PreviousUrlStore, PrivateFields>(this, {
            _previousUrl: observable,
            previousUrl: computed,
            setPreviousUrl: action
        });
    }

    get previousUrl(): string {
        return this._previousUrl;
    }

    setPreviousUrl(url: string) {
        console.log(`set ${url}`)
        this._previousUrl = url;
    }
}