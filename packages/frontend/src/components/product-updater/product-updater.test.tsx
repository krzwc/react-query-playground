import { ProductUpdater } from './product-updater';
import { BrowserRouter } from 'react-router-dom';
import { REQUEST_STATUSES } from 'common/consts';
import { QueryClient, UseMutationResult } from 'react-query';
import type { IProduct } from '../interfaces';

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(), // deprecated
        removeListener: jest.fn(), // deprecated
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

export const product = JSON.parse(
    '{"product":{"_id":"6001f6cf6e656aeacba7ccb1","name":"b0006se5bq","number":"singing coach unlimited","description":"singing coach unlimited - electronic learning products (win me nt 2000 xp)","images":[{"_id":"6001f6cf6e656aeacba7ccb2","url":"http://lorempixel.com/200/200/technics/","name":"singing coach"},{"_id":"6001f6cf6e656aeacba7ccb3","url":"http://lorempixel.com/200/200/abstract/","name":"front side"}],"category":"6001f6cf6e656aeacba7ccb0","slug":"b0006se5bq","__v":0}}',
) as { product: IProduct };

const mutation = {} as UseMutationResult<IProduct, Error, IProduct, unknown>;

const queryClient = {} as QueryClient;

describe('Product', () => {
    it('renders product name', () => {
        const { getByText } = render(
            <BrowserRouter>
                <ProductUpdater
                    product={product.product}
                    status={REQUEST_STATUSES.SUCCESS}
                    mutation={mutation}
                    queryClient={queryClient}
                    categoryName={"test"}
                />
            </BrowserRouter>,
        );
        expect(getByText('b0006se5bq')).toBeInTheDocument();
    });
});
