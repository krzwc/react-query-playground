import { ACTION_TYPES, REQUEST_METHODS } from 'common/consts';

export interface Model {
    url: ModelURL;
    dependencies?: (data: SingleItemData[]) => URL[];
    requestMethod?: REQUEST_METHODS;
}

export interface ModelWithActions extends Model {
    actions?: {
        [actionType in keyof typeof ACTION_TYPES]?: Model;
    };
}

export interface SingleItemData {
    id: string | number;
}

export type ModelURL = string | URL | ((data: SingleItemData) => URL);
