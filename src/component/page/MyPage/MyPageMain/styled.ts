import styled from "styled-components";

export const StyledMypage = styled.section`
    width: 80%;

    .table {
        width: 80%;
        max-width: 800px;
        min-width: 500px;
        margin: 30px;
    }

    th,
    td {
        border-bottom: 1px solid #ddd;
        text-align: left;
    }

    th {
        // padding: 0px 0px 0px 20px;
        padding: 18px;
        vertical-align: middle;
        font-size: 18px;
        text-align: left;
        width: 150px;
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

    .btn {
        font-weight: 600;
        width: 130px;
    }

    .btnGroup {
        width: 90%;
        text-align: center;
        margin: 50px 0px 30px;
    }

    .btnGroup > button {
        margin: 5px;
        width: 250px;
        font-size: 18px;
        font-weight: 600px;
    }

    .zipCode, .loginId {
        width: 230px;
        display: inline-block;
        margin: 0px 10px 0px 00px;
    }
`;


// 스타일 정의 (div 없이)
export const MyPageStyled = styled.section`
    padding-top: 20px; /* 페이지 상단에 여백 추가 */
    display: flex;
    justify-content: left; /* 페이지 중앙에 정렬 */
    padding: 0 0px; /* 좌우 여백 */
    width: 1200px;
    overflow: auto;

    .selectUserType {
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    .selectBirth {
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    .table {
        display: flex;
        flex-direction: column;
        width: 1000px;
        text-align: left;
        border-collapse: collapse;
        margin-bottom: 20px; /* 테이블과 버튼 사이에 여백 추가 */
    }

    td {
        width: 900px;
        padding: 10px;
        text-align: left;
        border: 1px solid #ddd;
    }

    th {
        padding: 20px;
        text-align: center;
        width: 150px;
        background-color: #dcdcdc;
        vertical-align: middle;
        position: relative; /* 가상요소 위치를 위한 설정 */

        &.required::after {
            content: "*";
            color: #ff0000;
            position: absolute;
            margin-left: 5px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.2em;
        }
    }

    input[type="text"],
    input[type="password"],
    input[name="userName"] {
        padding: 8px;
        width: 700px;
        margin-top: 5px;
        margin-bottom: 5px;
        border: 1px solid #ccc;
    }

    .input-with-button button {
        margin-left: 15px;
    }

    .address-container {
        display: flex;
        align-items: center;
        gap: 20px;
    }

    .footer {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 20px;
        gap: 20px;
    }

    button {
        background-color: #3bb2ea;
        border: none;
        color: white;
        padding: 10px 22px;
        text-align: center;
        font-size: 16px;
        cursor: pointer;
        border-radius: 12px;
        box-shadow: 0 4px #999;
        transition: 0.3s;
    }

    button:hover {
        background-color: #45a049;
    }

    button:active {
        background-color: #3e8e41;
        box-shadow: 0 2px #666;
        transform: translateY(2px);
    }
`;
