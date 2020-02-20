const required = (message = 'Required') => (value: any) => {
    if (!value || value.length === 0) {
        return message;
    }

    return undefined;
};

const requiredField = (value: string) => required()(value);

export {
    requiredField,
}