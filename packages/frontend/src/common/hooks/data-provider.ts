import { ENTITY_TYPES } from 'common/consts';
import { MODELS } from 'common/models';
import { useQuery, QueryStatus } from 'react-query';
import { HttpService } from 'common/services/http-service/http-service';
import type { SingleItemData, ModelURL } from 'common/interfaces';

const isUrlAFunction = (url: ModelURL): url is (data: SingleItemData) => URL => {
    return url instanceof Function;
};

const http = HttpService.getInstance();

export function useDataProvider<T>(
    entityType: ENTITY_TYPES,
    entityData?: { id: string },
): { status: QueryStatus; data: T | undefined } {
    const url = MODELS[entityType].url;
    const computedUrl = isUrlAFunction(url) && entityData ? url(entityData) : (url as string | URL);

    const { status, data } = useQuery<T, Error, T>(entityData?.id || entityType, () => {
        return http.request<T>({ url: computedUrl });
    });

    return {
        status,
        data,
    };
}
