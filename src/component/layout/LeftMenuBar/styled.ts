import { Link } from "react-router-dom";
import styled from "styled-components";

export const LeftMenuBarStyled = styled.div`
  padding-bottom: 100%;
  a {
    cursor: pointer;
  }

  button {
    background-color: white;
    color: black;
    border: none;
    border-radius: 50px;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, transform 0.2s;
    &:hover {
      background-color: #ffffff;
      transform: translateY(-2px);
    }
    &:active {
      background-color: ivory;
      transform: translateY(0);
    }
  }

  .logo-box {
    background: #2676bf;
    border-radius: 10px;
    img {
      top: 22px;
      left: 14px;
      width: 66px;
      height: 66px;
      padding: 10px;
    }

    .user-info {
      position: relative;
      right: 20px;
      top: 20px;
      float: right;
    }
    .user-info span {
        color: white;
        font-weight: bold;
    }
  }
  ul {
    border-radius: 10px;
    background: skyblue;
    list-style-type: none;
    padding: 0;
  }

  .parent-menu {
    font-weight: bold;
    padding-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #d6effc;
    color: #602e2e;

    &:hover {
      transition: 1s;
      .child-menu-box {
        opacity: 1;
        display: block;
        height: 100%;
        margin-top: 30px;
      }
    }

    .child-menu-box {
      display: none;
      opacity: 0;
      transition: opacity 0.2s, visibility 0s;
      background: #2e9acc;
      height: 0;
      padding-left: 20px;
      padding-top: 10px;
      padding-bottom: 10px;
      margin: 0;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      div {
        margin: 10px 0 10px 0;
        &:hover {
          text-decoration: underline;
          color: white;
        }
      }
    }

    .active {
      opacity: 1;
      display: block;
      height: 100%;
      margin-top: 30px;
    }

    .active-link {
      text-decoration: underline;
      color: white;
    }

    img {
      padding-left: 10px;
      padding-right: 10px;
    }
  }
`;

export const StyledLink = styled(Link)`
  color: #602e2e;
  text-decoration: none;

  visibility: visible;
  height: 100%;
  margin-top: 30px;
`;
