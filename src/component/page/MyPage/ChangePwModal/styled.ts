import styled from "styled-components";

export const ChangePwModalStyled = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto; /* 최대 너비 설정 */
    height: auto;
    z-index: 1000;
    display: flex;
    flex-direction: column; /* 세로로 정렬 */
    background: #dcdcdc;
    justify-content: flex-start; /* 내용 위쪽으로 정렬 */
    align-items: center;
    padding: 10px 20px; /* 좌우 여백을 줄임 */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
    border: 1px solid #ccc;

    .changePwArea {
        background-color: white;
        padding: 30px;
        border-radius: 8px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        text-align: center;
        align-items: center;
    }

    label {
        display: inline-block;
        width: 90px; /* 라벨 고정 너비 */
        text-align: right;
        margin-right: 10px; /* 인풋과 간격 */
        font-weight: bold;
    }

    input[type="password"] {
        padding: 8px;
        width: 350px;
        margin-top: 5px;
        margin-bottom: 5px;
        border: 1px solid #ccc;
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
