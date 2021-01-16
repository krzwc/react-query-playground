/* import styled from 'styled-components'; */
import { FunctionComponent } from 'react';
import { Product } from '../interfaces';
import { Input, Form } from 'antd';
import capitalize from 'lodash-es/capitalize';
/* 
const Description = styled.section<{ gridArea: string }>`
    grid-area: ${(props) => props.gridArea};
    font-size: 0.75rem;
`; */

export const ProductDescription: FunctionComponent<{
    field: string;
    value: Product['name' | 'number' | 'description'];
}> = ({ field, value }) => (
    <Form.Item
        label={capitalize(field)}
        name={field}
        rules={[{ required: true, message: `Please input the ${field}!` }]}
        style={{ gridArea: field }}
    >
        <Input value={value} />
    </Form.Item>
);
