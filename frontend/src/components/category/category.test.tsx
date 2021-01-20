import { Category } from './category';
import { REQUEST_STATUSES } from 'common/consts';
import type { ICategory, IProduct } from '../interfaces';

export const category = JSON.parse(
    `{"category":{"_id":"6005cd587fdd6366ba3a1cad","name":"Desktop Apps","slug":"desktop-apps","__v":0},"products":[{"_id":"6005cd587fdd6366ba3a1cae","name":"b0006se5bq","number":"singing coach unlimited","description":"singing coach unlimited - electronic learning products (win me nt 2000 xp)","images":[{"_id":"6005cd587fdd6366ba3a1caf","url":"http://lorempixel.dupa/200/200/technics/","name":"singing coach"},{"_id":"6005cd587fdd6366ba3a1cb0","url":"http://lorempixel.com/200/200/abstract/","name":"front side"}],"category":"6005cd587fdd6366ba3a1cad","slug":"b0006se5bq","__v":0},{"_id":"6005cd587fdd6366ba3a1cb1","name":"b00021xhzw","number":"adobe after effects professional 6.5 upgrade from standard to professional","description":"upgrade only; installation of after effects standard new disk caching tools speed up your interactive work save any combination of animation parameters as presets","images":[],"category":"6005cd587fdd6366ba3a1cad","slug":"b00021xhzw","__v":0},{"_id":"6005cd587fdd6366ba3a1cb2","name":"b00021xhzw1","number":"domino designer/developer v5.0","description":"reference domino designer/developer r5 doc pack includes the following titles: application development with domino designer (intermediate-advanced) 536 pages it explains building applications creating databases using forms fields views folders navi","images":[{"_id":"6005cd587fdd6366ba3a1cb3","url":"http://lorempixel.com/200/200/people/","name":"cover"}],"category":"6005cd587fdd6366ba3a1cad","slug":"b00021xhzw1","__v":0}]}`,
) as { category: ICategory; products: IProduct[] };

const mockedProductComponent = (productName: string) => <>{productName}</>;

describe('Category', () => {
    it('renders properly links on provided props', () => {
        const { queryAllByRole } = render(
            <Category
                category={category.category}
                products={category.products}
                status={REQUEST_STATUSES.SUCCESS}
                productComponent={mockedProductComponent}
            />,
        );
        expect(queryAllByRole('link')).toHaveLength(3);
    });
});
