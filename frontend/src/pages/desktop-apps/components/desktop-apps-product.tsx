import { FunctionComponent } from 'react';
import { Modal, ModalInside, ModalContentContainer, CloseCross, CrossLink } from './product-styled-components';
import { ProductField } from './product-field';
import { Loader } from 'components/loader/loader';
import { Product } from '../interfaces';
import { QueryStatus, useQueryClient } from 'react-query';
import { Input, Form, Button, notification, Space } from 'antd';
import { stripProtocolFromFDQN } from 'common/helpers';
import { useDataMutator } from 'common/hooks/data-mutator';
import { ENTITY_TYPES, ACTION_TYPES, REQUEST_STATUSES } from 'common/consts';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

const transformValuesToSend = (values: Record<string, any>) => ({
    ...values,
    images: values.images.map((image) => ({ ...image, url: 'http://' + image.url })),
});

const DesktopAppProduct: FunctionComponent<{
    product: Product;
    status: QueryStatus;
}> = ({ product, status }) => {
    const queryClient = useQueryClient();
    const mutation = useDataMutator(ENTITY_TYPES.DESKTOP_APPS_PRODUCT, ACTION_TYPES.UPDATE, {
        id: product.name,
    });

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
        images: product.images.map((image) => ({ ...image, url: stripProtocolFromFDQN(image.url) })),
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
                            <Form
                                name="product_form"
                                onFinish={onFinish}
                                className="login-form"
                                initialValues={initialValues}
                            >
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

export default DesktopAppProduct;
