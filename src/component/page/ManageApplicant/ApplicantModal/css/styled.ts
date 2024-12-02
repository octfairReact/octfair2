import styled from "styled-components";

export const ApplicantModalStyled = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 700px; /* 최대 너비 설정 */
    height: auto;
    max-height: 950px; /* 최대 높이를 화면의 80%로 설정 */
    z-index: 1000;
    display: flex;
    flex-direction: column; /* 세로로 정렬 */
    background: #dcdcdc;
    justify-content: flex-start; /* 내용 위쪽으로 정렬 */
    align-items: center;
    padding: 10px 20px; /* 좌우 여백을 줄임 */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border: 1px solid #ccc;
    overflow: auto; /* 내용이 넘치면 스크롤 생기게 설정 */

    .title-container {
        text-align: center;
        margin-bottom: 0px; /* 제목과 테이블 사이에 여백을 줄임 */
        font-size: 1.5em;
        font-weight: bold;
    }

    .strong {
        font-size: 1.5em;
        font-weight: bold;
        display: block;
        margin-bottom: 10px; /* 제목과 내용 사이 여백을 줄임 */
    }

    .selectUserType {
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }

    .table {
        display: flex;
        flex-direction: column;
        width: 100%;
        text-align: left;
        border-collapse: collapse;
        margin-bottom: 20px; /* 테이블과 버튼 사이에 여백 추가 */
    }

    th,
    td {
        padding: 10px;
        text-align: left;
        border: 1px solid #ddd;
    }

    th {
        background-color: #dcdcdc;
        vertical-align: middle;
    }

    input[type="text"],
    input[type="password"],
    input[name="userName"] {
        padding: 8px;
        width: 350px;
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
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 12px;
        box-shadow: 0 4px #999;
        transition: 0.3s;

        &:hover {
            background-color: #45a049;
        }

        &:active {
            background-color: #3e8e41;
            box-shadow: 0 2px #666;
            transform: translateY(2px);
        }
    }
`;