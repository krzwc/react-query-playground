import { Product } from '../components/product';
import { ENTITY_TYPES, REQUEST_STATUSES, ACTION_TYPES } from 'common/consts';
import { FunctionComponent } from 'react';
import type { Product as IProduct } from '../interfaces';
import { assertExpectedObjectShape, isProductObj } from './helpers';
import { useDataProvider } from 'common/hooks/data-provider';
import { Loader } from 'components/loader/loader';
import { Empty } from 'components/empty/empty';
import { useQueryClient } from 'react-query';
import { useDataMutator } from 'common/hooks/data-mutator';

export const DesktopAppsProduct: FunctionComponent<{
    productName: string;
}> = ({ productName }) => {
    const { status, data } = useDataProvider<{ product: IProduct }>(ENTITY_TYPES.DESKTOP_APPS_PRODUCT, {
        id: productName,
    });
    const queryClient = useQueryClient();
    const mutation = useDataMutator(ENTITY_TYPES.DESKTOP_APPS_PRODUCT, ACTION_TYPES.UPDATE, {
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