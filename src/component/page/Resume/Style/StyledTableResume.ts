import styled from 'styled-components';

export const StyledTableResume = styled.table`
    width: 100%;

    th,
    td {
        padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        text-align: center;
    }

    th {
        background-color: #f5f5f5;
    }

    td {
        font-size: 14px;
    }

    #resumetitle, #userName, #userEmail, #userPhone {
        margin: 5px 0px 5px;
    }

    #resumetitle {
        font-size: 35px;
    }

    .res-comment {
        color: #6ab1eb;
        font-weight: bold;
        border-bottom: none;
        border-top: 1px solid #ddd;
    }

    .resumeDetail_body {
        margin-top: 70px;
    }

    .resumeDetail_body_basicInfo {
        margin-top: 20px;
    }

    .resumeDetail_body_haeder {
        margin-top: 15px;
        margin-bottom: 15px;
        padding-bottom: 10px;
        font-size: 25px;
        font-weight: 500;
        border-bottom: 0.5px solid black;
    }

    .resumeDetail_body_guide {
        font-size: 15px;
    }

    textarea {
        // overflow-y : hidden;
    }

    .showTableBtn {
        font-weight: 600;
        margin-bottom: 10px;
    }

    .btnGroup {
        textAlign: center;
        margin: 80px 0px 30px;
    }
`;
