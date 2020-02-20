import {parseDom} from "../../utils/xml-dom-parser";
import {invalidXml, validXml, validHTML} from "../fixtures/xml-example";

test('Should fail while parsing invalid xml', () => {
    const mockFn = jest.fn();

    parseDom(invalidXml, () => {

    }, () => {}, mockFn);

    expect(mockFn).toBeCalled();
});

test('Should not fail while parsing valid xml', () => {
    const mockFn = jest.fn();

    parseDom(validXml, () => {

    }, () => {}, mockFn);

    expect(mockFn).not.toBeCalled();
});

test('Should not fail while parsing valid html', () => {
    const mockFn = jest.fn();

    parseDom(validHTML, () => {

    }, () => {}, mockFn);

    expect(mockFn).not.toBeCalled();
});

test('Should do nothing on empty content', () => {
    const mockCallbackFn = jest.fn();
    const mockOnEndFn = jest.fn();
    const mockOnErrorFn = jest.fn();

    parseDom("", mockCallbackFn, mockOnEndFn, mockOnErrorFn);

    expect(mockCallbackFn).not.toBeCalled();
    expect(mockOnErrorFn).not.toBeCalled();
    expect(mockOnEndFn).toBeCalled();
});