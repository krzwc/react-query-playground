import { FunctionComponent, Suspense, ReactNode } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CategoryImg, StyledLink, Grid, Container } from './category-styled-components';
import type { ICategory, IProduct } from '../interfaces';
import { Loader } from 'components/loader/loader';
import { QueryStatus } from 'react-query';
import { isNotEmpty } from 'common/helpers';
import { Empty } from 'components/empty/empty';
import { REQUEST_STATUSES } from 'common/consts';
import { PageHeader } from 'antd';

export const Category: FunctionComponent<{
    category: ICategory;
    products: IProduct[];
    status: QueryStatus;
    productComponent: (productName: string) => ReactNode;
}> = ({ category, products = [], status, productComponent }) => {
    return (
        <Router>
            <Container>
                <PageHeader title={category.name} />
                <Grid>
                    {status !== REQUEST_STATUSES.LOADING && status !== REQUEST_STATUSES.ERROR ? (
                        products.map(({ name, slug, images, number }) => (
                            <StyledLink to={`/details/${slug}`} key={name}>
                                {isNotEmpty(images) ? <CategoryImg url={images[0].url} /> : <Empty />}
                                <h3>{name}</h3>
                                <h5>{number}</h5>
                            </StyledLink>
                        ))
                    ) : (
                        <Loader />
                    )}
                </Grid>
            </Container>
            <Switch>
                {isNotEmpty(products) &&
                    products.map(({ name: productName, slug }) => (
                        <Route path={`/details/${slug}`} key={productName}>
                            <Suspense fallback={<Loader />}>{productComponent(productName)}</Suspense>
                        </Route>
                    ))}
            </Switch>
        </Router>
    );
};
