import styled from 'styled-components';

export const StyledTableCompany = styled.table`
    width: 90%;

    th,
    td {
        border-bottom: 1px solid #ddd;
        text-align: center;
        padding: 10px;
    }

    th {
        vertical-align: middle;
        // background-color: #fafafa;
        font-size: 18px;
        text-align: left;
        padding-left: 40px;
        min-width: 180px;
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
        width: 120px;
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

export const StyledCompanyDetail = styled.table`
    width: 100%;

    th,
    td {
        border-bottom: 1px solid #ddd;
        text-align: center;
        padding: 10px;
    }

    th {
        vertical-align: middle;
        background-color: #fafafa;
        font-size: 18px;
        text-align: center;
        min-width: 180px;
    }

    .font_red {
        vertical-align: middle;
        padding: 2px;
        margin: 2px;
    }

    td {
        font-size: 18px;
        height: 50px;
    }

    .divComGrpCodList {
        margin-top: 50px;
    }

    .btnGroup {
        text-align: right;
        margin: 50px 0px 30px;
    }

    .btnGroup > button {
        margin: 5px;
        width: 230px;
        font-size: 18px;
    }
`;