import { FunctionComponent } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ENTITY_TYPES, REQUEST_STATUSES } from 'common/consts';
import type { IProduct, ICategory } from 'components/interfaces';
import { useDataProvider } from 'common/hooks';
import { Loader } from 'components/loader';
import { Empty } from 'components/empty';
import { Category } from 'components/category';
import { DesktopAppsProductUpdater } from '../desktop-apps-product';
import { assertExpectedArrayShape, assertExpectedObjectShape, isProductsArr, isCategoryObj } from '../helpers';

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
        <Router>
            <Category
                status={status}
                products={data.products}
                category={data.category}
                productComponent={<DesktopAppsProductUpdater />}
            />
        </Router>
    ) : (
        <Empty requestFailure={false} />
    );
};
