import styled from "styled-components";

export const PostDetailStyled = styled.div`
  .bizDetailContainer {
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
  }

  .postDetailContainer {
    padding: 20px;
    background-color: #f9fafb;
    border-radius: 8px;
  }

  // 기본 버튼 스타일
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

  // 스크랩 버튼
  .scrapButton {
    background-color: #007bff;

    &:hover {
      background-color: #0056b3;
    }
  }

  // 입사지원 버튼
  .applyButton {
    background-color: #ffc107;

    &:hover {
      background-color: #ffa000;
    }
  }

  //    기업정보 버튼
  .bizInfoButton {
    background-color: #eeeeee;
    color: #333;
    border: 1px solid #ccc;

    &:hover {
      background-color: #e0e0e0;
      color: #333;
      border-color: #bbb;
    }
  }

  //    뒤로가기 버튼
  .backButton {
    background-color: #6c757d;

    &:hover {
      background-color: #5a6268;
    }
  }
`;
