import { FunctionComponent } from 'react';
import { Input, Form } from 'antd';
import { capitalize } from 'common/helpers';
import type { IProduct } from 'components/interfaces';

export const ProductInput: FunctionComponent<{
    field: string;
    value: IProduct['name' | 'number' | 'description'];
    textArea?: boolean;
}> = ({ field, value, textArea = false }) => (
    <Form.Item
        label={capitalize(field)}
        name={field}
        rules={[{ required: true, message: `Please input the ${field}!` }]}
        style={{ gridArea: field }}
    >
        {textArea ? <Input.TextArea rows={4} value={value} /> : <Input value={value} />}
    </Form.Item>
);
