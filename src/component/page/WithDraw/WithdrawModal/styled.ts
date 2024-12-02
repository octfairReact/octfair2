import styled from "styled-components";

export const WithdrawModalStyled = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: auto;
    height: auto;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    background: white;
    justify-content: center;
    align-items: center;
    padding: 20px;
    gap: 20px; /* 요소 간 간격 설정 */
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);

    div {
        display: flex;
        align-items: center;
        gap: 15px; /* strong과 input 사이 간격 설정 */
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
        text-align: right;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        cursor: pointer;
        border-radius: 12px;
        box-shadow: 0 4px #999;
        transition: 0.3s;
        margin-top: 15px; /* 버튼과 위 요소 간 여백 추가 */

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
