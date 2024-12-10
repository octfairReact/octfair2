import styled from 'styled-components';

export const StyledResume = styled.div`
    th {
        font-size: 17px;
    }

    tr td {
        font-size: 16px;
    }

    .inputBtnGroup > button {
        margin: 5px;
        width: 100px;
    }

    .inputBtnGroup {
        text-align: right;
    }

    .tdCrrDesc, .tdSkillDetail {
        white-space: pre-wrap;
        text-align: left;
    }

    .admDate, .grdDate, .startDate, .endDate, .acqDate {
        width: 70%;
        float: right;
    }

    .tdSpan {
        margin: 6px;
        float: left;
    }
`;

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
        // font-size: 14px;
    }

    #resumetitle {
        margin: 30px 5px 20px;
        font-size: 35px;
        width: 90%;
    }

    #userName, #userEmail, #userPhone {
        margin: 10px 5px;
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
        margin: 20px 0px;
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
        font-size: 16px;
        margin: 10px 0px 15px;
    }

    .btnGroup {
        width: 90%;
        text-align: center;
        margin: 100px 0px 30px;
    }

    .btnGroup > button {
        width: 120px;
        margin: 5px;
        font-size: 17px;
    }

    #fileName {
        margin: 10px;
    }

    #deleteIcon {
        margin-left: 10px;
    }
`;

export const StyledTableResumeMain = styled.table`
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
        font-size: 21px;
        font-weight: 500;
    }

    .detailFile {
        margin: 0px 0px 3px;
        font-size: 15px;
        font-weight: 500;
        color: #2c6dd4;
    }

    .input-box > button {
        margin: 5px;
        width: 100px;
    }

    .tdUpdateDate{
        // font-size: 16px;
        color: gray;
    }
`;
