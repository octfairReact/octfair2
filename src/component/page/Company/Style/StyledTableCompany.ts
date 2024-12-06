import styled from 'styled-components';

export const StyledTableCompany = styled.table`
    width: 100%;

    th,
    td {
        border-bottom: 1px solid #ddd;
        text-align: center;
    }

    th {
        vertical-align: middle;
        background-color: #f5f5f5;
        font-size: 18px;
        textAlign: center;
    }

    .font_red {
        vertical-align: middle;
        padding: 2px;
        margin: 2px;
    }

    td {
        font-size: 17px;
        height: 50px;
    }

    #currentFileName {
        text-align: left;
        margin: 8px 5px 0px;
    }

    .divComGrpCodList {
        margin-top: 50px;
    }

    .writeTable {
        margin-top: 30px;
    }

    .btnGroup {
        text-align: center;
        margin: 50px 0px 30px;
    }

    .btnGroup2 {
        text-align: right;
        margin: 50px 0px 30px;
    }

    .btnGroup > button {
        margin: 5px;
        width: 100px;
        font-size: 18px;
    }

    .btnGroup2 > button {
        margin: 5px;
        width: 230px;
        font-size: 18px;
    }

    #currentFileName {
        font-size: 16px;
    }
`;
