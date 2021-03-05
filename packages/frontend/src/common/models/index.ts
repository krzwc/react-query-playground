import { ENTITY_TYPES } from 'common/consts';
import { DesktopAppsModel } from './desktop-apps';
import { DesktopAppsProductModel } from './desktop-apps-product';

export const MODELS = {
    [ENTITY_TYPES.DESKTOP_APPS]: DesktopAppsModel,
    [ENTITY_TYPES.DESKTOP_APPS_PRODUCT]: DesktopAppsProductModel,
};
