import { ENTITY_TYPES, ACTION_TYPES, REQUEST_METHODS } from 'common/consts';
import { MODELS } from 'common/models';
import { useMutation, UseMutationResult } from 'react-query';
import { HttpService } from 'common/services/http-service/http-service';
import type { SingleItemData, ModelURL } from 'common/interfaces';
import get from 'lodash-es/get';

const isUrlAFunction = (url: ModelURL): url is (data: SingleItemData) => URL => {
    return url instanceof Function;
};

const http = HttpService.getInstance();

export function useDataMutator<T>(
    entityType: ENTITY_TYPES,
    actionType: ACTION_TYPES,
    entityData?: { id: string },
): UseMutationResult<T, Error, T, unknown> {
    const { requestMethod: method, url } = get(MODELS, [entityType, 'actions', actionType], {
        requestMethod: REQUEST_METHODS.PUT,
        url: '',
    });

    const headers = {
        'Content-type': 'application/json; charset=UTF-8',
    };
    const computedUrl = isUrlAFunction(url) && entityData ? url(entityData) : (url as string | URL);

    const mutation = useMutation<T, Error, T>(entityData?.id || entityType, (body: T) => {
        return http.request<T>({ url: computedUrl, method, headers, body: JSON.stringify(body) });
    });

    return mutation;
}
