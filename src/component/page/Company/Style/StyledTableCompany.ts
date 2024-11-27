import styled from 'styled-components';

export const StyledTableCompany = styled.table`
    width: 100%;
    // border-collapse: collapse;
    // margin: 20px 0px 0px 0px;
    // font-size: 18px;
    // text-align: left;
    // table-layout: fixed;

    th,
    td {
        // padding: 8px;
        text-align: left;
        border-bottom: 1px solid #ddd;
        text-align: center;
    }

    th {
        // vertical-align: center;
        background-color: #f5f5f5;
        font-size: 17px;
        // background-color: #2676bf;
        // color: #ddd;
    }

    td {
        font-size: 16px;
    }

    // /* 테이블 올렸을 때 */
    // tbody tr:hover {
        
    // }

    #resumetitle, #userName, #userEmail, #userPhone {
        margin: 5px 0px 5px;
    }

    #resumetitle {
        font-size: 35px;
    }

    .divComGrpCodList {
        margin-top: 50px;
    }

    .resumeDetail_body_basicInfo {
        margin-top: 20px;
    }

    // .res-comment {
    //     border-radius: 10px;
    // }

    .resumeDetail_body_haeder {
        margin-top: 15px;
        margin-bottom: 15px;
        padding: 5px;
        font-size: 23px;
        border-bottom: 0.5px solid black;
    }

    .resumeDetail_body_guide {
        font-size: 15px;
    }

    // .resumeDetail_body_guide {
    //     margin: 10px 0px;
    //     padding: 5px;
    //     background-color: #eaf2fe;
    //     border-radius: 5px;
    //     color: gray;
    // }

    textarea {
        // overflow-y : hidden;
    }

    .showTableBtn {
        font-weight: 600;
        margin-bottom: 10px;
    }

    .btnGroup {
        textAlign: center;
        margin: 30px 0px 30px;
    }
`;

export const ResumeTh = styled.th<{ size?: number }>`
    // background-color: #f4f4f4;
    // padding: 12px;
    // border: 1px solid #ddd;
    // width: ${(props) => props.size}%;
`;

export const ResumeTd = styled.td`
    // padding: 12px;
    // border: 1px solid #ddd;
`;
