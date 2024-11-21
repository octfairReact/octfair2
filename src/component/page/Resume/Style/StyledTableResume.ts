import styled from 'styled-components';

export const StyledTableResume = styled.table`
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
        
    }

    #resumetitle, #userName, #userEmail, #userPhone {
        margin: 5px 0px 5px;
    }

    .resumeDetail_body {
        margin: 20px 20px 60px;
    }

    .resumeDetail_body_basicInfo {
        margin: 20px;
    }

    .resumeDetail_body_haeder {
        margin-top: 15px;
        margin-bottom: 15px;
        padding: 5px;
        font-size: 25px;
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
`;

export const ResumeTh = styled.th<{ size?: number }>`
    background-color: #f4f4f4;
    padding: 12px;
    border: 1px solid #ddd;
    width: ${(props) => props.size}%;
`;

export const ResumeTd = styled.td`
    padding: 12px;
    border: 1px solid #ddd;
`;
