import styled from 'styled-components';
import { centerMixin } from 'common/styles/css-mixins';
import { Link } from 'react-router-dom';

export const Modal = styled.article`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    ${centerMixin};
    transition: all 0.2s ease-in-out;
`;

export const ModalInside = styled.section`
    position: fixed;
    background: white;
    width: 80%;
    height: 80%;
    overflow: scroll;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.7);
`;

export const ModalContentContainer = styled.section`
    width: 100%;
    height: 100%;
    text-align: center;
    position: relative;
`;

export const CrossLink = styled(Link)`
    position: absolute;
    top: -40px;
    right: -25px;
    display: table;
    text-decoration: none;
`;

export const CloseCross = styled.span`
    color: black;
    font-size: 30px;
`;
