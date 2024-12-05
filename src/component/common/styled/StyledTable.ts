import styled from 'styled-components';

export const StyledTable = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0px 0px 0px;
    font-size: 18px;
    text-align: left;
    table-layout: fixed;

    th,
    td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        text-align: center;
    }

    th {
        background-color: #2676bf;
        color: #ddd;
    }

    /* 테이블 올렸을 때 */
    tbody tr:hover {
        // background-color: #d3d3d3;
        // opacity: 0.9;
        cursor: pointer;
    }
`;

export const StyledTh = styled.th<{ size?: number }>`
    background-color: #f4f4f4;
    padding: 12px;
    border: 1px solid #ddd;
    width: ${(props) => props.size}%;
`;

export const StyledTd = styled.td`
    padding: 12px;
    border: 1px solid #ddd;

    .detailTitle {
        margin: 10px 0px 12px;
        font-weight: 600;
    }

    .detailFile {
        margin: 0px 0px 3px;
        font-size: 13px;
        font-weight: 500;
        color: #2c6dd4;
    }

    .input-box > button {
        margin: 5px;
        width: 100px;
    }

    .tdUpdateDate{
        font-size: 15px;
        color: gray;
    }
`;
