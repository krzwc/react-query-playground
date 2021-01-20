import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { centerMixin, mediaForMixin } from 'common/styles/css-mixins';

export const StyledLink = styled(Link)`
    ${centerMixin};
    position: relative;
    color: black;
    text-decoration: none;
`;

export const Grid = styled.section`
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    ${mediaForMixin(['768px'], 'grid-template-columns: 1fr;')}
`;

export const Container = styled.article`
    width: 100vw;
    ${centerMixin};
`;
