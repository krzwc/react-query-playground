import DesktopAppProduct from '../components/desktop-apps-product';
import { ENTITY_TYPES, REQUEST_STATUSES } from 'common/consts';
import { FunctionComponent } from 'react';
import { Product } from '../interfaces';
import { assertExpectedObjectShape, isProductObj } from './helpers';
import { useDataProvider } from 'common/hooks/data-provider';
import { Loader } from 'components/loader/loader';
import { Empty } from 'components/empty/empty';

const ConnectedDesktopAppsProduct: FunctionComponent<{
    productName: string;
}> = ({ productName }) => {
    const { status, data } = useDataProvider<{ product: Product }>(ENTITY_TYPES.DESKTOP_APPS_PRODUCT, {
        id: productName,
    });
    if (data) {
        assertExpectedObjectShape(data.product, isProductObj);
    }
    if (status === REQUEST_STATUSES.LOADING) {
        return <Loader />;
    }
    if (status === REQUEST_STATUSES.ERROR) {
        return <Empty requestFailure={true} />;
    }
    return data ? <DesktopAppProduct status={status} product={data.product} /> : <Empty requestFailure={false} />;
};

export default ConnectedDesktopAppsProduct;
