import sax from "sax";

export function parseDom(htmlOrXml: string, callback: (currentTag: string, path: string[]) => void, onEnd: () => void, onError: (e: Error) => void) {

    if (!(htmlOrXml && htmlOrXml.length > 0)) {
        onEnd();
        return;
    }

    const isXml = htmlOrXml.startsWith('<?xml version="1.0" encoding="UTF-8"?>');

    let wellFormedContent = htmlOrXml;

    if (!isXml) {
        let doc = new DOMParser().parseFromString(htmlOrXml, "text/html");
        wellFormedContent = new XMLSerializer().serializeToString(doc);
    }

    const parser = sax.parser(true, {lowercase: true});

    let paths: string[] = [];

    parser.onopentag = (tag) => {
        paths.push(tag.name);
        callback(tag.name, [...paths]);
    };

    parser.onclosetag = (tag) => {
        paths.pop();
    };

    parser.onend = onEnd;
    parser.onerror = onError;

    parser.write(wellFormedContent);
    parser.end();
}