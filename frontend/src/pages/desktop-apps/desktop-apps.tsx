import { FunctionComponent } from 'react';
import { ENTITY_TYPES, REQUEST_STATUSES } from 'common/consts';
import type { IProduct, ICategory } from 'components/interfaces';
import { useDataProvider } from 'common/hooks';
import { Loader } from 'components/loader';
import { Empty } from 'components/empty';
import { Category } from 'components/category';
import { DesktopAppsProductUpdater } from '../desktop-apps-product';
import { assertExpectedArrayShape, assertExpectedObjectShape, isProductsArr, isCategoryObj } from '../helpers';

const productComponent = (productName: string) => <DesktopAppsProductUpdater productName={productName} />;

export const DesktopApps: FunctionComponent = () => {
    const { status, data } = useDataProvider<{ category: ICategory; products: IProduct[] }>(ENTITY_TYPES.DESKTOP_APPS);
    if (status === REQUEST_STATUSES.LOADING) {
        return <Loader />;
    }
    if (status === REQUEST_STATUSES.ERROR) {
        return <Empty requestFailure={true} />;
    }
    if (data && status === REQUEST_STATUSES.SUCCESS) {
        const { products, category } = data;
        assertExpectedArrayShape(products, isProductsArr);
        assertExpectedObjectShape(category, isCategoryObj);
    }

    return data ? (
        <Category
            status={status}
            products={data.products}
            category={data.category}
            productComponent={productComponent}
        />
    ) : (
        <Empty requestFailure={false} />
    );
};
