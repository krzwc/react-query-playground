import { FunctionComponent } from 'react';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Form, Button, notification, Space, PageHeader } from 'antd';
import { QueryStatus, QueryClient, UseMutationResult } from 'react-query';
import { stripProtocolFromFDQN, isNotEmpty } from 'common/helpers';
import { Loader } from 'components/loader';
import { ProductInput } from './product-input';
import { REQUEST_STATUSES } from 'common/consts';
import { Modal, ModalInside, ModalContentContainer, CloseCross, CrossLink } from './product-updater-styled-components';
import type { IProduct } from '../interfaces';

const httpPrefix = 'http://';

const transformValuesToSend = (values: IProduct) => ({
    ...values,
    images: values.images.map((image: { url: string; name: string }) => ({ ...image, url: httpPrefix + image.url })),
});

const notificationFacade = {
    sendSuccessNotification() {
        notification[REQUEST_STATUSES.SUCCESS]({
            message: 'Update notification',
            description: 'Successfully updated',
        });
    },
    sendErrorNotification() {
        notification[REQUEST_STATUSES.ERROR]({
            message: 'Update notification',
            description: 'Update not successful',
        });
    },
};

export const ProductUpdater: FunctionComponent<{
    product: IProduct;
    status: QueryStatus;
    mutation: UseMutationResult<IProduct, Error, IProduct, unknown>;
    queryClient: QueryClient;
    categoryName: string;
}> = ({ product, status, mutation, queryClient, categoryName }) => {
    const onFinish = async (values: IProduct) => {
        const valuesToSend = transformValuesToSend(values);
        try {
            const mutationResult = await mutation.mutateAsync(valuesToSend);
            if (mutationResult) {
                await queryClient.invalidateQueries(product.name);
                await queryClient.invalidateQueries(categoryName);
                notificationFacade.sendSuccessNotification();
            }
        } catch (error) {
            notificationFacade.sendSuccessNotification();
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
                        <>
                            <PageHeader title={product['name']} />
                            <Form name="product_form" onFinish={onFinish} initialValues={initialValues}>
                                <ProductInput field={'name'} value={product['name']} />
                                <ProductInput field={'number'} value={product['number']} />
                                <ProductInput field={'description'} value={product['description']} textArea={true} />
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
                                                        <Input addonBefore={httpPrefix} />
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
                                                <Button
                                                    type="dashed"
                                                    onClick={() => add()}
                                                    block
                                                    icon={<PlusOutlined />}
                                                >
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
                        </>
                    ) : (
                        <Loader />
                    )}
                </ModalContentContainer>
            </ModalInside>
        </Modal>
    );
};
