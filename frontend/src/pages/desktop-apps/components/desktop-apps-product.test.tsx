import DesktopAppProduct from './desktop-apps-product';
import { product } from './mocks';
import { BrowserRouter } from 'react-router-dom';

describe('DesktopAppProduct', () => {
    it('renders properly based on provided props', () => {
        const { container } = render(
            <BrowserRouter>
                <DesktopAppProduct product={product} status="success" />
            </BrowserRouter>,
        );

        expect(container).toHaveTextContent('singing coach unlimited');
    });
});
