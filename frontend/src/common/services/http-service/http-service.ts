import { URL_SEPARATOR } from 'common/consts';
import { Headers, RequestParameters } from './interfaces';

export class HttpService {
    private static instance: HttpService;

    public static getInstance(): HttpService {
        if (!HttpService.instance) {
            HttpService.instance = new HttpService();
        }

        return HttpService.instance;
    }

    public static toURL(url: string | string[] | URL): URL {
        if (Array.isArray(url)) {
            return new URL(
                url
                    .map((itemToJoin, index) =>
                        index !== url.length - 1 && itemToJoin[itemToJoin.length - 1] === '/'
                            ? itemToJoin.slice(0, -1)
                            : itemToJoin,
                    )
                    .join(URL_SEPARATOR),
                window.location.origin,
            );
        }
        if (!(url instanceof URL)) {
            return new URL(url, window.location.origin);
        }

        return url;
    }

    public enhanceHeaders = (headers: Headers = {}): Headers => {
        return {
            'content-type': 'application/json',
            credentials: 'include',
            crossorigin: 'true',
            ...headers,
        };
    };

    public request = <T>({ url, headers, method, body }: RequestParameters): Promise<T> => {
        let hasFailed = false;
        const urlString = url instanceof URL ? url.toString() : encodeURI(url);

        return fetch(urlString, {
            headers,
            method,
            body,
        })
            .then((response) => {
                const { /* status, */ ok } = response;
                if (!ok) {
                    hasFailed = true;
                }

                return response.json();
            })
            .then((data) => (hasFailed ? Promise.reject(data) : Promise.resolve(data)))
            .catch((error) => {
                return hasFailed ? Promise.reject(error) : Promise.reject(new Error('Internal server error'));
            });
    };
}
