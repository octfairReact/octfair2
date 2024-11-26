import styled from "styled-components";

export const WithDrawStyled = styled.div`
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
        border-collapse: collapse;
    }

    th,
    td {
        padding: 10px; /* 내부 여백 */
        text-align: left; /* 텍스트 정렬 */
        border: 1px solid #ddd; /* 경계선 추가 */
    }

    th {
        min-width: 110px; /* 최소 너비를 지정 */
        text-align: center; /* 텍스트를 가운데 정렬 */
        white-space: nowrap; /* 텍스트 줄바꿈 방지 */
    }

    .address-container {
        display: flex; /* 가로로 배치 */
        align-items: center; /* 수직 가운데 정렬 */
        gap: 20px; /* 요소 간 간격 */
    }

    .address-container input {
        flex: 1; /* input이 버튼보다 넓게 차지하도록 설정 */
    }

    .modal-footer {
        margin-top: auto; /* 테이블 아래로 밀어내기 */
        display: flex;
        justify-content: center; /* 버튼을 가로로 중앙에 배치 */
        width: 100%;
    }

    img {
        width: 100px;
        height: 100px;
    }

    .img-label {
        margin-top: 10px;
        padding: 6px 25px;
        background-color: #ccc;
        border-radius: 4px;
        color: rgba(0, 0, 0, 0.9);
        cursor: pointer;

        &:hover {
            background-color: #45a049;
            color: white;
        }

        &:active {
            background-color: #3e8e41;
            box-shadow: 0 2px #666;
            transform: translateY(2px);
        }
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
