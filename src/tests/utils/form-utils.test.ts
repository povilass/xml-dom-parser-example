import {mapErrorsFromMeta} from "../../utils/form-utils";

const mockData = {
    autofilled: false,
    asyncValidating: false,
    dirty: true,
    dispatch: (): any => null,
    form: "TEST",
    initial: "",
    invalid: false,
    pristine: false,
    submitting: false,
    submitFailed: false,
    touched: true,
    valid: false,
    visited: false,
};

test('Should return error message', () => {
    expect(mapErrorsFromMeta({ ...mockData, error: "ERROR", })).toBe("ERROR");
});