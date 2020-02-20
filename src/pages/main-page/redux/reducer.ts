import {handleActions} from "redux-actions";
import {actionsExecutor} from "./actions";

type TagsItem = {
    count: number;
    paths: Array<Array<string>>;
};

export type TagsMap = Record<string, TagsItem>;

export interface MainPageReducerState {
    tagsMap: TagsMap;
}


const initialValue: MainPageReducerState = {
    tagsMap: {}
};

export const reducer = handleActions<MainPageReducerState, any>({
    [`${actionsExecutor.setTagsMap}`]: (state, {payload}: any) => {
        return {
            ...state,
            tagsMap: payload
        }
    },
}, initialValue);