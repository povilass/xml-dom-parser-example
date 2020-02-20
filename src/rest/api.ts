import axios from "axios";

export const getDomOrXml = (url: string) => axios({
    url: '/api/html',
    params: {
        url
    },
    method: 'GET'
});
