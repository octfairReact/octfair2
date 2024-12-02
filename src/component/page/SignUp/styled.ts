import styled from "styled-components";

export const SignUpModalStyled = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: auto;
    z-index: 1000;
    display: flex;
    background: white;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);

    input[type="text"] {
        padding: 8px;
        width: 350px;
        margin-top: 5px;
        margin-bottom: 5px;
        border: 1px solid #ccc;
    }

    input[type="password"] {
        padding: 8px;
        width: 350px;
        margin-top: 5px;
        margin-bottom: 5px;
        border: 1px solid #ccc;
    }

    input[name="userName"] {
        padding: 8px;
        width: 150px;
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
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
        width: auto;
        flex-direction: column;
        text-align: center;
        border-collapse: collapse;
    }

    th,
    td {
        padding: 10px; /* 내부 여백 */
        width: 500px;
        text-align: left; /* 텍스트 정렬 */
        border: 1px solid #ddd; /* 경계선 추가 */
    }

    th {
        min-width: 110px; /* 최소 너비를 지정 */
        text-align: center; /* 텍스트를 가운데 정렬 */
        vertical-align: middle; /* 텍스트를 세로로 가운데 정렬 */
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

    .input-with-button button {
        margin-left: 15px; /* 버튼에 왼쪽 여백을 추가 */
    }

    .address-container {
        display: flex; /* 가로로 배치 */
        align-items: center; /* 수직 가운데 정렬 */
        gap: 20px; /* 요소 간 간격 */
    }
    .address-container button {
        margin-left: 1px; /* 버튼에 왼쪽 여백을 추가 */
    }

    .address-container input {
        flex: 1; /* input이 버튼보다 넓게 차지하도록 설정 */
    }

    .modal-footer {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 20px; /* tbody와 modal-footer 사이에 여백 추가 */
        gap: 20px; /* 버튼 간 간격 추가 */
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
        text-align: right;
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
