import { GetData } from './asyncStorage';

let base_url = 'https://dev-site2-api.sitesq.net/api/Client';

type Props = {
    query?: any;
    endpoint?: any;
};

export const fetchFunction = async (endpoint: any, query: any) => {
    let accessToken = await GetData('@accessToken');
    try {
        const res = await fetch(endpoint + query, {
            method: 'get',
            headers: new Headers({
                Authorization: `Bearer ${accessToken}`,
            }),
        });
        return await res.json();
    } catch (err) {
        // NEED A RESPONSE MODEL
        console.log('fetch error -->', err);
        // return err;
        return 'Error';
    }
};
