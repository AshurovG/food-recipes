import QueryParamsStore from "./QueryParamsStore";
import PreviousUrlStore from "./PreviousUrlStore";
import AuthStore from "./AuthStore";

export default class RootStore {
    readonly query = new QueryParamsStore();
    prevUrl = new PreviousUrlStore();
    auth = new AuthStore();
}