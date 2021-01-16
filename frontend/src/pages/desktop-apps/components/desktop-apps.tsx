import { FunctionComponent, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ProductGridImg, StyledLink, Grid, Container } from './desktop-apps-styled-components';
import { Product } from '../interfaces';
import { Loader } from 'components/loader/loader';
import { QueryStatus } from 'react-query';
import { isNotEmpty } from 'common/helpers';
import { Empty } from 'components/empty/empty';

const ConnectedDesktopAppsProduct = lazy(() => import('../containers/connected-desktop-apps-product'));

const DesktopApps: FunctionComponent<{ products: Product[]; status: QueryStatus }> = ({ products = [], status }) => {
    /*const [lastScrollingIndex, setLastScrollingIndex] = useState(20);

    const grid = document.querySelector<HTMLDivElement>('#grid');
     useEffect(() => {
        const callback = debounce(() => {
            if (window.scrollY + window.innerHeight - (grid.clientHeight + grid.offsetTop) < 50) {
                setLastScrollingIndex(lastScrollingIndex + 20);
            }
        }, 250);
        if (products.length && lastScrollingIndex + 20 >= products.length) {
            setLastScrollingIndex(products.length);
        } else {
            window.addEventListener('scroll', callback);
        }
        return () => {
            window.removeEventListener('scroll', callback);
        };
    }, [lastScrollingIndex, products.length]); */

    return (
        <Router>
            <Container>
                <Grid id="grid">
                    {status !== 'loading' && status !== 'error' ? (
                        products /* .slice(0, lastScrollingIndex) */
                            .map((product) => (
                                <StyledLink to={`/details/${product.slug}`} key={product.name}>
                                    {isNotEmpty(product.images) ? (
                                        <ProductGridImg url={product.images[0].url} />
                                    ) : (
                                        <Empty />
                                    )}
                                    <h3>{product.name}</h3>
                                    <h5>{product.number}</h5>
                                </StyledLink>
                            ))
                    ) : (
                        <Loader />
                    )}
                </Grid>
            </Container>
            <Switch>
                {isNotEmpty(products) &&
                    products.map((product) => (
                        <Route path={`/details/${product.slug}`} key={product.name}>
                            <Suspense fallback={<div>Loading...</div>}>
                                <ConnectedDesktopAppsProduct productName={product.name} />
                            </Suspense>
                        </Route>
                    ))}
            </Switch>
        </Router>
    );
};

export default DesktopApps;
