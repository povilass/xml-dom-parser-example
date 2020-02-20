import {createSelector} from "reselect";
import * as R from "ramda";
import {MainPageReducerState} from "./reducer";
import {PathItem, Tag} from "../partials/tags-table";

const rawState = (state: any): MainPageReducerState => state.mainPage;

export const tableContentSelector = createSelector<any, MainPageReducerState, {
    allTagsMap: Array<Tag>;
    uniqueTagsMap: Array<Tag>;
    commonlyUsedTags: Array<Tag>;
    commonlyUsedTagLongestPathItem: {
        name: string;
        item: PathItem;
    };
}>(
    rawState,
    ({tagsMap}) => {

        const records: Array<Tag> = R.keys(tagsMap).map((name) => {
            const tag = tagsMap[name];

            const pathMap = tag.paths.reduce<Record<string, number>>((accum, items) => {
                let joined = items.join(',');
                if (R.isNil(accum[joined])) {
                    accum[joined] = 1;
                } else {
                    accum[joined] = accum[joined] + 1;
                }
                return accum;
            }, {});

            return {
                name,
                count: tag.count,
                pathItems: R.keys(pathMap).map((key) => ({
                    pathRepeats: pathMap[key],
                    path: key.split(','),
                    tagRepeats: key.split(',').filter((tag) => tag === name).length
                }))
            };
        });

        const sorted = R.sort<Tag>((a, b) => b.count - a.count, records);

        let commonlyUsedTags = [],
            commonlyUsedTagLongestPathItem = undefined;

        if (sorted.length > 0) {
            const tag = sorted[0];
            commonlyUsedTags.push(tag);
            commonlyUsedTagLongestPathItem = {
                name: tag.name,
                item: R.sort<PathItem>((a, b) => b.path.length - a.path.length, tag.pathItems)[0]
            }
        }

        return {
            allTagsMap: records,
            uniqueTagsMap: records.filter(({count}) => count === 1),
            commonlyUsedTags,
            commonlyUsedTagLongestPathItem
        }
    }
);