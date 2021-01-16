import { PropsWithChildren, ReactNode } from 'react';
import { ENTITY_TYPES } from 'common/consts';
import { MODELS } from 'common/models';
import { useQuery, QueryStatus } from 'react-query';
import { HttpService } from 'common/services/http-service/http-service';
import type { SingleItemData, ModelURL } from 'common/interfaces';
interface DataProviderProps<T> {
    entityType: ENTITY_TYPES;
    entityData?: { id: string };
    children: ({ status, data }: { status: QueryStatus; data: T }) => ReactNode;
}

const http = HttpService.getInstance();

const isUrlAFunction = (url: ModelURL): url is ((data: SingleItemData) => URL) => {
    return url instanceof Function;
};

/**
 * To be used in case of need of data fetching within a class component, where 
 * useDataProvider hook has no use
 */

export function DataProvider<T>({ entityType, children, entityData }: PropsWithChildren<DataProviderProps<T | undefined>>) {
    const url = MODELS[entityType].url;

    const { status, data } = useQuery<T, Error, T>(entityData?.id || entityType, () => {
        const getUrl = isUrlAFunction(url) && entityData ? url(entityData) : url as string | URL;

        return http.request<T>({ url: getUrl });
    });

    return <>{children({ status, data })}</>;
}
