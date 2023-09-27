import QueryParamsStore from "./QueryParamsStore";
import PreviousUrlStore from "./PreviousUrlStore";

export default class RootStore {
    readonly query = new QueryParamsStore();
    prevUrl = new PreviousUrlStore()
}