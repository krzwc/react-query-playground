import DesktopApps from '../components/desktop-apps';
import { ENTITY_TYPES, REQUEST_STATUSES } from 'common/consts';
import { FunctionComponent } from 'react';
import { Product, Department } from '../interfaces';
import { assertExpectedArrayShape, isProductsArr } from './helpers';
import { useDataProvider } from 'common/hooks/data-provider';
import { Loader } from 'components/loader/loader';
import { Empty } from 'components/empty/empty';

const ConnectedDesktopApps: FunctionComponent = () => {
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

    return data ? <DesktopApps status={status} products={data.products} /> : <Empty requestFailure={false} />;
};

export default ConnectedDesktopApps;
