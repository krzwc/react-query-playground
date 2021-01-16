import DesktopApps from './desktop-apps';
import { products } from './mocks';

describe('DesktopApps', () => {
    it('renders properly based on provided props', () => {
        const { queryAllByRole } = render(<DesktopApps products={products} status="success" />);
        expect(queryAllByRole('link')).toHaveLength(3);
    });
});
