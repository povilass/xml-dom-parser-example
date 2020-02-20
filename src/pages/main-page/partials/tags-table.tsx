import React from "react";

export type PathItem = {
    pathRepeats: number;
    path: Array<string>;
    tagRepeats: number;
};

export type Tag = {
    name: string;
    count: number;
    pathItems: Array<PathItem>;
};

interface TagsTableProps {
    tags: Array<Tag>;
    title: string;
}

class TagsTable extends React.Component<TagsTableProps> {

    render() {
        const {tags, title} = this.props;

        if (tags.length <= 0) {
            return null;
        }

        return (
            <div className="tags-table__wrap">
                <div className="tags-table__title">{title}</div>
                <table className="tags-table">
                    <thead className="tags-table__head">
                    <tr className="tags-table__head-row">
                        <td>Tag name</td>
                        <td>Tag count</td>
                        <td>Paths</td>
                    </tr>
                    </thead>
                    <tbody className="tags-table__body">
                    {tags.map((tag, index) =>
                        (
                            <tr key={`row-key-${index}`} className="tags-table__body-row">
                                <td>{tag.name}</td>
                                <td>{tag.count}</td>
                                <td>
                                    {
                                        tag.pathItems.map(({path, pathRepeats, tagRepeats}, index) => (
                                            <div key={index}>
                                                <span
                                                    className="tag-path">{index + 1}. {path.join(' > ')}</span> {`(dept ${path.length}${pathRepeats > 1 ? `, ${pathRepeats} path repeats` : ''}${tagRepeats > 1 ? `, tag repeats ${tagRepeats}` : ''})`}
                                            </div>
                                        ))
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default TagsTable;