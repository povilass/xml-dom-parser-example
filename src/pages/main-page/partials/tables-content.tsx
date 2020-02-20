import * as React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import TagsTable from "./tags-table";
import {tableContentSelector} from "../redux/selector";


interface TablesContentProps {

}

type Props = TablesContentProps & ReturnType<typeof tableContentSelector>;

class TablesContent extends React.Component<Props> {
    render() {
        const {allTagsMap, commonlyUsedTags, uniqueTagsMap, commonlyUsedTagLongestPathItem} = this.props;
        return (
            <div>
                <TagsTable tags={uniqueTagsMap} title={'1.Task of unique tags'}/>
                <TagsTable tags={commonlyUsedTags} title={'2.Task of most common used tag'}/>

                {commonlyUsedTagLongestPathItem && (<>
                    <div className="tag-result">
                        <div className="tag-result__title">
                            3. Longest path in the document tree where the most popular tag is used the most times
                        </div>
                        <div className="tag-result__body">
                            <div>
                                Tag name: {commonlyUsedTagLongestPathItem.name}
                            </div>
                            <div>
                                Path: {commonlyUsedTagLongestPathItem.item.path.join(' > ')} (repeats {commonlyUsedTagLongestPathItem.item.tagRepeats}, dept {commonlyUsedTagLongestPathItem.item.path.length})
                            </div>
                        </div>
                    </div>
                </>)}

                <TagsTable tags={allTagsMap} title={'Full tags list'}/>
            </div>
        );
    }
}

export default compose<React.ElementType<TablesContentProps>>(
    connect(tableContentSelector)
)(TablesContent);