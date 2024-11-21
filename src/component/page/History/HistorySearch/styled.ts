import styled from 'styled-components';

export const HistorySearchStyled = styled.div`
    margin-bottom: 10px;
    float: inline-end;
    input {
        display: inline-block;
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        margin-right: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;

        position: relative;
    }
    select {
    display: inline-block;
    width: 110px;
    height: 30px;
    border: 1px solid #bbc2cd;
    padding-left: 2px;
    border-radius: 4px;
    border: 1px solid #bbc2cd;
    }

    #reset {
    background-color: gray;
    width: unset;
    height: unset;
    border: none;
    color: white;
    padding: 50px;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 4px 2px;
    cursor: pointer;
    border-radius: 12px;
    box-shadow: 0 4px #999;
    }
    
    @media (max-width: 1000px) {
    }
`;
