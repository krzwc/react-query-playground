import { FunctionComponent, Fragment } from 'react';
// import { Link } from "react-router-dom";
import { Modal, ModalMain, ModalGrid, CloseCross, ProductImg, CrossLink } from './product-styled-components';
import { ProductDescription } from './product-description';
import { Loader } from 'components/loader/loader';
import { Empty } from 'components/empty/empty';
import { Product } from '../interfaces';
import { QueryStatus, useMutation } from 'react-query';
import { Input, Carousel, Form, Button } from 'antd';
import { stripProtocolFromFDQN, isNotEmpty, stripNonNumerics, stripNumerics } from 'common/helpers';
import groupBy from 'lodash-es/groupBy';
import { useDataMutator } from 'common/hooks/data-mutator';
import { ENTITY_TYPES, ACTION_TYPES } from 'common/consts';
import { MODELS } from 'common/models';

const transformValuesToSend = (values: Record<string, any>) => {
    const keysContainingNumbers = Object.keys(values).filter((key) => stripNonNumerics(key) !== '');
    const keysGroupedByNumber = groupBy(keysContainingNumbers, stripNonNumerics);
    const mappedValues = Object.entries(keysGroupedByNumber)
        .map(([_, v]) => v)
        .map(([url, name]) => ({ [stripNumerics(url)]: 'http://' + values[url], [stripNumerics(name)]: values[name] }));
    return mappedValues;
};

const DesktopAppProduct: FunctionComponent<{
    product: Product;
    status: QueryStatus;
}> = ({
    product = {
        name: '',
        number: '',
        images: [],
        department: '',
        description: '',
        slug: '',
    } as Product,
    status,
}) => {
    /* const mutation = useMutation((data) =>
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify(data),
        }),
    ); */
    const mutation = useDataMutator(ENTITY_TYPES.DESKTOP_APPS_PRODUCT, ACTION_TYPES.UPDATE, {
        id: product.name,
    });

    const onFinish = (values: any) => {
        const { name, number, description } = values;
        const valuesToSend = {
            name,
            number,
            description,
            images: transformValuesToSend(values),
        };
        mutation.mutate(valuesToSend);
    };

    const initialValues = {
        ...product,
        ...(isNotEmpty(product.images) &&
            product.images
                .map(({ url, name }, index) => ({
                    [`url${index}`]: stripProtocolFromFDQN(url),
                    [`name${index}`]: name,
                }))
                .reduce((acc, cur) => Object.assign(acc, cur), {})),
    };

    return (
        <Modal>
            <ModalMain>
                <ModalGrid>
                    <CrossLink to="/">
                        <CloseCross>&times;</CloseCross>
                    </CrossLink>
                    {status !== 'loading' && status !== 'error' ? (
                        <>
                            <Form
                                name="product_form"
                                onFinish={onFinish}
                                className="login-form"
                                initialValues={initialValues}
                            >
                                {['name', 'number', 'description'].map((field, index) => (
                                    <ProductDescription
                                        field={field}
                                        value={product[field as keyof Product]}
                                        key={index}
                                    />
                                ))}
                                <ProductImg url={product.images[0]?.url} />
                                {/* <div style={{ gridArea: 'img', width: '100%', height: '100%' }}>
                                {isNotEmpty(product.images) ? (
                                    <Carousel>
                                        {product.images.map((image, index) => (
                                            <ProductImg key={index} url={image.url} />
                                        ))}
                                    </Carousel>
                                ) : (
                                    <Empty />
                                )}
                            </div> */}
                                <div style={{ gridArea: 'imgDesc' }}>
                                    {product.images.map((_, index) => (
                                        <Fragment key={index}>
                                            <Form.Item label="Url" name={`url${index}`}>
                                                <Input addonBefore="http://" />
                                            </Form.Item>
                                            <Form.Item label="Url name" name={`name${index}`}>
                                                <Input />
                                            </Form.Item>
                                        </Fragment>
                                    ))}
                                </div>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>
                        </>
                    ) : (
                        <Loader />
                    )}
                </ModalGrid>
            </ModalMain>
        </Modal>
    );
};

export default DesktopAppProduct;
