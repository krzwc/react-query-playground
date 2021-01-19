import { FunctionComponent } from 'react';
import { Product } from 'components/product/product';
import { ENTITY_TYPES, REQUEST_STATUSES, ACTION_TYPES } from 'common/consts';
import type { IProduct } from 'components/interfaces';
import { useDataProvider, useDataMutator } from 'common/hooks';
import { Loader } from 'components/loader';
import { Empty } from 'components/empty';
import { useQueryClient } from 'react-query';
import { assertExpectedObjectShape, isProductObj } from '../helpers';

export const DesktopAppsProduct: FunctionComponent<{
    productName: string;
}> = ({ productName }) => {
    const { status, data } = useDataProvider<{ product: IProduct }>(ENTITY_TYPES.DESKTOP_APPS_PRODUCT, {
        id: productName,
    });
    const queryClient = useQueryClient();
    const mutation = useDataMutator<IProduct>(ENTITY_TYPES.DESKTOP_APPS_PRODUCT, ACTION_TYPES.UPDATE, {
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
    return data ? <Product status={status} product={data.product} queryClient={queryClient} mutation={mutation} /> : <Empty requestFailure={false} />;
};

export default DesktopAppsProduct;