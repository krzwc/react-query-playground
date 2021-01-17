import { FunctionComponent } from 'react';
import { Modal, ModalInside, ModalContentContainer, CloseCross, CrossLink } from './product-styled-components';
import { ProductField } from './product-field';
import { Loader } from 'components/loader/loader';
import type { Product as IProduct } from '../interfaces';
import { QueryStatus, QueryClient, UseMutationResult } from 'react-query';
import { Input, Form, Button, notification, Space } from 'antd';
import { stripProtocolFromFDQN, isNotEmpty } from 'common/helpers';
import { REQUEST_STATUSES } from 'common/consts';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const transformValuesToSend = (values: Record<string, any>) => ({
    ...values,
    images: values.images.map((image) => ({ ...image, url: 'http://' + image.url })),
});

export const Product: FunctionComponent<{
    product: IProduct;
    status: QueryStatus;
    mutation: UseMutationResult<any, Error, any, unknown>;
    queryClient: QueryClient;
}> = ({ product, status, mutation, queryClient }) => {

    const onFinish = async (values: any) => {
        const valuesToSend = transformValuesToSend(values);
        try {
            await mutation.mutateAsync(valuesToSend);
        } catch (error) {
            notification[REQUEST_STATUSES.ERROR]({
                message: 'Update notification',
                description: 'Update not successful',
            });
        } finally {
            notification[REQUEST_STATUSES.SUCCESS]({
                message: 'Update notification',
                description: 'Successfully updated',
            });
            queryClient.invalidateQueries(product.name);
        }
    };

    const initialValues = {
        ...product,
        images: isNotEmpty(product.images)
            ? product.images.map((image) => ({ ...image, url: stripProtocolFromFDQN(image.url) }))
            : [],
    };

    return (
        <Modal>
            <ModalInside>
                <ModalContentContainer>
                    <CrossLink to="/">
                        <CloseCross>&times;</CloseCross>
                    </CrossLink>
                    {status !== REQUEST_STATUSES.LOADING && status !== REQUEST_STATUSES.ERROR ? (
                        <Form name="product_form" onFinish={onFinish} initialValues={initialValues}>
                            <ProductField field={'name'} value={product['name']} />
                            <ProductField field={'number'} value={product['number']} />
                            <ProductField field={'description'} value={product['description']} textArea={true} />
                            <Form.List name="images">
                                {(fields, { add, remove }) => (
                                    <>
                                        {fields.map((field) => (
                                            <Space
                                                style={{ display: 'flex', marginBottom: 8 }}
                                                key={field.key}
                                                align="center"
                                            >
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'url']}
                                                    fieldKey={[field.fieldKey, 'url']}
                                                    rules={[{ required: true, message: 'Missing URL' }]}
                                                >
                                                    <Input addonBefore="http://" />
                                                </Form.Item>
                                                <Form.Item
                                                    {...field}
                                                    name={[field.name, 'name']}
                                                    fieldKey={[field.fieldKey, 'name']}
                                                    rules={[{ required: true, message: 'Missing name' }]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                                <MinusCircleOutlined onClick={() => remove(field.name)} />
                                            </Space>
                                        ))}
                                        <Form.Item>
                                            <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                                Add URL
                                            </Button>
                                        </Form.Item>
                                    </>
                                )}
                            </Form.List>
                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    ) : (
                        <Loader />
                    )}
                </ModalContentContainer>
            </ModalInside>
        </Modal>
    );
};
