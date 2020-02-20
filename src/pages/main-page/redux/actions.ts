import {Dispatch} from "redux";
import {SubmissionError} from "redux-form";
import {getDomOrXml} from "../../../rest/api";
import {parseDom} from "../../../utils/xml-dom-parser";
import {createAction} from "redux-actions";
import {TagsMap} from "./reducer";


export const actionsExecutor = {
    setTagsMap: createAction<TagsMap>('MAIN_PAGE__SET_TAGS_MAP'),
};

export default {
    onSubmit: (formValues: any, dispatch: Dispatch) => () => {
        return new Promise((resolve, reject) =>

            getDomOrXml(formValues.value).then(({data}) => {
                let tagsMap: TagsMap = {};

                let failedParsing = false;

                parseDom(data, (currentTag, paths) => {
                        const tagValue = tagsMap[currentTag];
                        if (tagValue) {
                            tagsMap[currentTag] = {
                                count: tagValue.count + 1,
                                paths: [...tagValue.paths, paths]
                            };
                        } else {
                            tagsMap[currentTag] = {
                                count: 1,
                                paths: [paths]
                            };
                        }
                    },
                    () => {
                        if (failedParsing) {
                            dispatch(actionsExecutor.setTagsMap({}));
                            reject(new SubmissionError({_error: 'Failed to parse!'}));
                        } else {
                            dispatch(actionsExecutor.setTagsMap(tagsMap));
                            resolve();
                        }
                    },
                    () => {
                        failedParsing = true;
                    });
            }).catch((reason) => {
                dispatch(actionsExecutor.setTagsMap({}));
                reject(new SubmissionError({_error: reason ? reason.toString() : 'Failed request'}));
            })
        );
    }
}