import {tableContentSelector} from "../../../pages/main-page/redux/selector";
import {TagsMap} from "../../../pages/main-page/redux/reducer";


test('Should return error message', () => {

    const tagsMap: TagsMap = {
        "div": {
            paths: [['html', 'div', "div"], ['html', 'div', "div"], ['html', 'head', 'div'], ['html', 'head', 'body', 'div']],
            count: 4
        }
    };

    // const expected: ReturnType<typeof tableContentSelector> = {
    const expected: any = {
        "allTagsMap": [
            {
                "count": 4,
                "name": "div",
                "pathItems": [
                    {
                        "path": [
                            "html",
                            "div",
                            "div",
                        ],
                        "pathRepeats": 2,
                        "tagRepeats": 2,
                    },
                    {
                        "path": [
                            "html",
                            "head",
                            "div",
                        ],
                        "pathRepeats": 1,
                        "tagRepeats": 1,
                    },
                    {
                        "path": [
                            "html",
                            "head",
                            "body",
                            "div",
                        ],
                        "pathRepeats": 1,
                        "tagRepeats": 1,
                    },
                ],
            },
        ],
        "commonlyUsedTagLongestPathItem": {
            "item": {
                "path": [
                    "html",
                    "head",
                    "body",
                    "div",
                ],
                "pathRepeats": 1,
                "tagRepeats": 1,
            },
            "name": "div",
        },
        "commonlyUsedTags": [
            {
                "count": 4,
                "name": "div",
                "pathItems": [
                    {
                        "path": [
                            "html",
                            "div",
                            "div",
                        ],
                        "pathRepeats": 2,
                        "tagRepeats": 2,
                    },
                    {
                        "path": [
                            "html",
                            "head",
                            "div",
                        ],
                        "pathRepeats": 1,
                        "tagRepeats": 1,
                    },
                    {
                        "path": [
                            "html",
                            "head",
                            "body",
                            "div",
                        ],
                        "pathRepeats": 1,
                        "tagRepeats": 1,
                    },
                ],
            },
        ],
        "uniqueTagsMap": [],
    };

    const actual = tableContentSelector({
        mainPage: {
            tagsMap
        }
    });
    expect(actual).toStrictEqual(expected);
});