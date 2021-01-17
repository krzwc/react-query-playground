import { FunctionComponent, Suspense, ReactNode } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProductGridImg, StyledLink, Grid, Container } from './desktop-apps-styled-components';
import { Product } from '../interfaces';
import { Loader } from 'components/loader/loader';
import { QueryStatus } from 'react-query';
import { isNotEmpty } from 'common/helpers';
import { Empty } from 'components/empty/empty';
import { REQUEST_STATUSES } from 'common/consts';

export const Category: FunctionComponent<{
    products: Product[];
    status: QueryStatus;
    productComponent: (productName: string) => ReactNode;
}> = ({ products = [], status, productComponent }) => {
    return (
        <Router>
            <Container>
                <Grid>
                    {status !== REQUEST_STATUSES.LOADING && status !== REQUEST_STATUSES.ERROR ? (
                        products.map(({ name, slug, images, number }) => (
                            <StyledLink to={`/details/${slug}`} key={name}>
                                {isNotEmpty(images) ? <ProductGridImg url={images[0].url} /> : <Empty />}
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
