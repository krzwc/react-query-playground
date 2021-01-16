import styled from 'styled-components';
import { BasicImg } from './desktop-apps-styled-components';
import { centerMixin, mediaForMixin } from 'common/styles/css-mixins';
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

export const ModalMain = styled.section`
    position: fixed;
    background: white;
    width: 80%;
    height: 80%;
    overflow: scroll;
    padding: 30px;
    border-radius: 5px;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.7), 0 6px 20px 0 rgba(0, 0, 0, 0.7);
`;

export const ModalGrid = styled.section`
    width: 100%;
    height: 100%;
    position: relative;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-column-gap: 10px;
    grid-template-rows: auto;
    grid-template-areas:
        'img number'
        'img description'
        'img name'
        'imgDesc imgDesc';
`;

export const CrossLink = styled(Link)`
    position: absolute;
    top: -20px;
    right: -10px;
    display: table;
    text-decoration: none;
`;

export const CloseCross = styled.span`
    color: black;
    /* text-decoration: none; */
    font-size: 30px;
`;

export const ProductImg = styled(BasicImg)`
    background-size: auto 100%;
    ${mediaForMixin(['800px'], 'background-size: 100% auto;')}
`;
