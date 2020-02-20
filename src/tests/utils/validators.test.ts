import {requiredField} from "../../utils/validators";

const message = "Required";

test('Should be required on empty value', () => {
    expect(requiredField("")).toBe(message);
});

test('Should be required on null/undefined value', () => {
    expect(requiredField(undefined)).toBe(message);
    expect(requiredField(null)).toBe(message);
});

test('Should not be required on passing value', () => {
    expect(requiredField("test")).toBe(undefined);
});