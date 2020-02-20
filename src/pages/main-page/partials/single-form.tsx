import {bindActionCreators, compose, Dispatch} from "redux";
import {Form, InjectedFormProps, reduxForm} from "redux-form";
import * as React from "react";
import {connect} from "react-redux";
import {InputField, Button, ButtonsGroup} from "../../../components";
import actions from "../redux/actions";
import {requiredField} from "../../../utils/validators";

type DispatchProps = typeof actions;

interface Props extends InjectedFormProps, DispatchProps {

}

const validations = {
    value: [requiredField]
};

class SingleForm extends React.Component<Props> {
    render() {
        const {handleSubmit, submitting, onSubmit, error} = this.props;
        return (
            <Form onSubmit={handleSubmit(onSubmit)} noValidate>

                {error && (
                    <div className="form-error">
                        {error}
                    </div>
                )}

                <InputField
                    name="value"
                    id="value"
                    label={"Field value"}
                    validate={validations.value}
                    disabled={submitting}
                    required
                />
                <ButtonsGroup centered className="form-buttons">
                    <Button type="submit" big loading={submitting}>Submit</Button>
                </ButtonsGroup>
            </Form>
        );
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default compose<any>(
    connect(undefined, mapDispatchToProps),
    reduxForm({
        form: "single-form",
        touchOnChange: true,
        initialValues: {
            value: 'https://www.google.com/'
        }
    })
)(SingleForm);