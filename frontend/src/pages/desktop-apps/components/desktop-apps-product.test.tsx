import DesktopAppProduct from './desktop-apps-product';
import { product } from './mocks';
import { BrowserRouter } from 'react-router-dom';
import { REQUEST_STATUSES } from 'common/consts';

describe('DesktopAppProduct', () => {
    it('renders properly based on provided props', () => {
        const { container } = render(
            <BrowserRouter>
                <DesktopAppProduct product={product} status={REQUEST_STATUSES.SUCCESS} />
            </BrowserRouter>,
        );

        expect(container).toHaveTextContent('singing coach unlimited');
    });
});
