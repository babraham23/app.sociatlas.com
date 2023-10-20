import axios from 'axios';

export const HTTP = ({ Method, Url, Data, Headers }: any) => {
    let DATA: any = {
        method: Method,
        url: Url,
    };
    if (Headers) DATA.headers = Headers;
    if (Data) DATA.data = Data;
    return axios(DATA);
};