import { FunctionComponent, ReactNode } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { QueryStatus } from 'react-query';
import { PageHeader, Image, Empty as Antdmpty } from 'antd';
import { Loader } from 'components/loader';
import { isNotEmpty } from 'common/helpers';
import { Empty } from 'components/empty';
import { REQUEST_STATUSES } from 'common/consts';
import { StyledLink, Grid, Container } from './category-styled-components';
import type { ICategory, IProduct } from '../interfaces';

export const Category: FunctionComponent<{
    category: ICategory;
    products: IProduct[];
    status: QueryStatus;
    productComponent: (productName: string) => ReactNode;
}> = ({ category: { name: categoryName, slug: categorySlug }, products = [], status, productComponent }) => (
    <Router>
        <Container>
            <PageHeader title={categoryName} />
            <Grid>
                {status !== REQUEST_STATUSES.LOADING && status !== REQUEST_STATUSES.ERROR ? (
                    products.map(({ name: productName, slug: productSlug, images, number }) => (
                        <StyledLink to={`/${categorySlug}/${productSlug}`} key={productName}>
                            {isNotEmpty(images) ? (
                                <Image
                                    width={200}
                                    height={200}
                                    src={images[0].url}
                                    preview={false}
                                    placeholder={Antdmpty.PRESENTED_IMAGE_SIMPLE}
                                />
                            ) : (
                                <Empty />
                            )}
                            <h3>{productName}</h3>
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
                products.map(({ name: productName, slug: productSlug }) => (
                    <Route path={`/${categorySlug}/${productSlug}`} key={productName}>
                        {productComponent(productName)}
                    </Route>
                ))}
        </Switch>
    </Router>
);
