import styled from "styled-components";

export const WithDrawStyled = styled.section`
    padding-top: 20px; /* 페이지 상단에 여백 추가 */
    display: flex;
    justify-content: flex-start; /* 페이지 중앙에 정렬 */
    padding: 0 0px; /* 좌우 여백 */
    display: flex;
    flex-direction: column;
    align-items: left; /* 가운데 정렬 */
    gap: 20px; /* 요소 간 간격 */

    .withdrawPhrase {
        padding-top: 30px;
        text-align: left;
        font-size: 16px;
        line-height: 1.5;
        color: #333;
    }

    .withdrawButton {
        margin-top: 10px;
        button {
            padding: 10px 20px;
            background-color: #ff4d4d;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;

            &:hover {
                background-color: #d43f3f;
            }
        }
    }
`;
