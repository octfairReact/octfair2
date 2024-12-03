import styled from 'styled-components';

export const ContentBoxStyled = styled.div`
    background-color: #f5f5f5;
    padding: 15px 100% 15px 0px;
    border: 1px solid #ccc;
    box-sizing: border-box;
    display: block;
    + div {
        margin-top: -52px;
        margin-left: 450px;
    }
`;

export const ContentName = styled.div`
    width: max-content;
    font-size: 35px;
    margin-left: 20px;
    font-weight: bold;
    position: relative;
    z-index: 0px;
`;
