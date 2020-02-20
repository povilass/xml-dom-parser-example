import * as React from "react";
import SingleForm from "./partials/single-form";
import TablesContent from "./partials/tables-content";


class MainPage extends React.Component {
    render() {
        return (
            <>
                <div className="form">
                    <div className="form-title">
                        Fubar form
                    </div>
                    <div className="form-content">
                        <SingleForm/>
                    </div>
                </div>
                <TablesContent/>
            </>
        );
    }
}

export default MainPage;