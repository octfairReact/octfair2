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
        font-size: 17px;
        textAlign: center;
    }

    .font_red {
        vertical-align: middle;
        padding: 2px;
        margin: 2px;
    }

    td {
        font-size: 16px;
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
        textAlign: center;
        margin: 30px 0px 30px;
    }
`;
