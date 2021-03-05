import { ModelWithActions } from 'common/interfaces';
import { HttpService } from '../services/http-service/http-service';
import { URLS, ACTION_TYPES, REQUEST_METHODS } from 'common/consts';

export const DesktopAppsProductModel: ModelWithActions = {
    url: (data) => HttpService.toURL([URLS.DESKTOP_APPS, URLS.SINGLE_ITEM(data)]),
    actions: {
        [ACTION_TYPES.UPDATE]: {
            url: (data) => HttpService.toURL([URLS.DESKTOP_APPS, URLS.SINGLE_ITEM(data)]),
            requestMethod: REQUEST_METHODS.PUT,
        },
    },
};
