import { FunctionComponent } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { ProductUpdater } from 'components/product-updater';
import { ENTITY_TYPES, REQUEST_STATUSES, ACTION_TYPES } from 'common/consts';
import type { IProduct } from 'components/interfaces';
import { useDataProvider, useDataMutator } from 'common/hooks';
import { Loader } from 'components/loader';
import { Empty } from 'components/empty';
import { useQueryClient } from 'react-query';
import { assertExpectedObjectShape, isProductObj } from '../helpers';

export const DesktopAppsProductUpdater: FunctionComponent = () => {
    const match = useRouteMatch<{ slug: string }>({
        path: `/${ENTITY_TYPES.DESKTOP_APPS}/:slug`,
        strict: true,
        sensitive: true,
    });

    const { status, data } = useDataProvider<{ product: IProduct }>(ENTITY_TYPES.DESKTOP_APPS_PRODUCT, {
        id: match?.params?.slug ?? '',
    });
    const queryClient = useQueryClient();
    const mutation = useDataMutator<IProduct>(ENTITY_TYPES.DESKTOP_APPS_PRODUCT, ACTION_TYPES.UPDATE, {
        id: match?.params?.slug ?? '',
    });
    if (status === REQUEST_STATUSES.LOADING) {
        return <Loader />;
    }
    if (status === REQUEST_STATUSES.ERROR) {
        return <Empty requestFailure={true} />;
    }
    if (data && status === REQUEST_STATUSES.SUCCESS) {
        assertExpectedObjectShape(data.product, isProductObj);
    }
    return data ? (
        <ProductUpdater
            status={status}
            product={data.product}
            categoryName={ENTITY_TYPES.DESKTOP_APPS}
            queryClient={queryClient}
            mutation={mutation}
        />
    ) : (
        <Empty requestFailure={false} />
    );
};
