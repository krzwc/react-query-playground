import { FunctionComponent } from 'react';
import { Empty as AntdEmpty } from 'antd';
import styled from 'styled-components';
import { centerMixin } from 'common/styles/css-mixins';

export const EmptyWrapper = styled.div`
    width: 100%;
    height: 100%;
    ${centerMixin()};
`;

export const Empty: FunctionComponent<{
    requestFailure?: boolean;
    description?: string;
}> = ({ description: customDescription, requestFailure = false }) => {
    const failedDescription = requestFailure ? 'Request Failure' : 'No data';
    const description = customDescription || failedDescription;
    return (
        <EmptyWrapper>
            <AntdEmpty image={AntdEmpty.PRESENTED_IMAGE_SIMPLE} description={description} />
        </EmptyWrapper>
    );
};
