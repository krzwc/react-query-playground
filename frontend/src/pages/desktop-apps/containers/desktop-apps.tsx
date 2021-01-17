import { ENTITY_TYPES, REQUEST_STATUSES } from 'common/consts';
import { FunctionComponent } from 'react';
import { Product, Department } from '../interfaces';
import { assertExpectedArrayShape, isProductsArr } from './helpers';
import { useDataProvider } from 'common/hooks/data-provider';
import { Loader } from 'components/loader/loader';
import { Empty } from 'components/empty/empty';
import { Category } from '../components/category';
import { DesktopAppsProduct } from './desktop-apps-product';

const productComponent = (productName: string) => <DesktopAppsProduct productName={productName} />;

export const DesktopApps: FunctionComponent = () => {
    const { status, data } = useDataProvider<{ department: Department; products: Product[] }>(
        ENTITY_TYPES.DESKTOP_APPS,
    );
    if (data) {
        assertExpectedArrayShape(data.products, isProductsArr);
    }
    if (status === REQUEST_STATUSES.LOADING) {
        return <Loader />;
    }
    if (status === REQUEST_STATUSES.ERROR) {
        return <Empty requestFailure={true} />;
    }

    return data ? (
        <Category status={status} products={data.products} productComponent={productComponent} />
    ) : (
        <Empty requestFailure={false} />
    );
};
