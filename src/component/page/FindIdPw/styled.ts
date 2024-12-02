import styled from "styled-components";

export const FindIdPwModalStyled = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: auto;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    background: white;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);

    .modal-header {
        position: absolute;
        top: 5px;
        right: 10px;
    }

    .close-button {
        background-color: #c8c8c8;
        padding: 4px 13px;
        box-shadow: 0 4px;
    }

    .findButton {
        position: fixed;
        top: 45px;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;
        background-color: white; /* 버튼이 고정되어 있을 때 배경색 */
        z-index: 100; /* 다른 요소 위에 오도록 설정 */
        padding: 10px 0; /* 버튼의 여백 추가 */
    }

    .findArea {
        display: flex;
        flex-direction: column; /* 입력 양식이 세로로 정렬되도록 설정 */
        justify-content: center;
        text-align: center;
        align-items: center;
        padding: 10px;
        margin-top: 100px; /* findButton과 겹치지 않도록 상단 여백 추가 */
        z-index: 1;
    }

    .form-group {
        width: 100%;
        margin-bottom: 20px; /* 각 필드 간 간격 */
    }

    table {
        width: 100%;
        border-collapse: collapse; /* 테이블 셀 간 경계가 붙지 않도록 */
    }

    td {
        padding: 8px; /* 셀 내 여백 */
    }

    .form-label {
        text-align: center;
        justify-content: center;
        font-weight: bold;
        padding-right: 5px; /* 라벨과 입력창 간 간격 */
    }

    .form-input {
        width: 90%; /* 입력 필드 너비 */
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    .form-button {
        margin-top: 10px; /* 버튼과 위의 필드 간 간격 */
        padding: 10px 20px;
        text-align: center;
        color: white;
        cursor: pointer;
    }
    input[type="password"] {
        padding: 8px;
        width: 350px;
        margin-top: 5px;
        margin-bottom: 5px;
        border: 1px solid #ccc;
    }

    .button-container {
        text-align: right;
        margin-top: 10px;
    }
    button {
        background-color: #3bb2ea;
        border: none;
        color: white;
        padding: 10px 22px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
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
