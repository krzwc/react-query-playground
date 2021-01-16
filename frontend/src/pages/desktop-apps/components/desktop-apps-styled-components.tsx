import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { centerMixin, mediaForMixin } from 'common/styles/css-mixins';

export interface BasicImgProps {
    url?: string;
}

export const BasicImg = styled.div<BasicImgProps>`
    position: relative;
    background-image: url("${(props) => props.url || ''}");
    background-repeat: no-repeat;
    background-position: center center;
`;

export const ProductGridImg = styled(BasicImg)`
    width: 100%;
    background-size: 60%;
    padding-bottom: 100%;
    transition: all 0.2s ease-in-out;
    &:hover {
        transform: scale(1.1);
    }
    ${mediaForMixin(['768px'], 'background-size: 40%; padding-bottom: 60%;')}
`;

export const Div = styled.div`
    width: 100%;
    height: auto;
    ${centerMixin};
    cursor: pointer;
`;

export const StyledLink = styled(Link)`
    ${centerMixin};
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
