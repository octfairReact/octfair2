import styled from "styled-components";

export const SignUpModalStyled = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: auto;
    z-index: 1000;
    display: flex;
    background: white;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);

    label {
        display: flex;
        width: auto;
        flex-direction: column;
    }

    input[type="text"] {
        padding: 8px;
        width: 350px;
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    .selectUserType {
        padding: 8px;
        margin-top: 5px;
        margin-bottom: 5px;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    .container {
        background: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
        position: relative;
        width: 400px;
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
