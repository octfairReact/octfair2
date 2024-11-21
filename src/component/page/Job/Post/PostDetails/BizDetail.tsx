import React from "react";
import { IBizDetail, IPostDetail } from "../../../../../models/interface/IPost";
import { PostDetailStyled } from "./styled";

interface IBizDetailProps {
  bizDetail: IBizDetail;
  postDetail: IPostDetail;
}

export const BizDetail: React.FC<IBizDetailProps> = ({
  bizDetail,
  postDetail,
}) => {
  return (
    <>
      <PostDetailStyled>
        <div className="bizDetailContainer">
          <div>
            <img
              className="bizImg"
              src={bizDetail.logicalPath}
              alt="BizImage"
            />
            {/* {bizDetail?.bizLogo} */}
          </div>
          <br></br>
          <h4>기업 정보</h4>
          <div>
            <strong>기업명: </strong>
            <span>{bizDetail.bizName}</span>
          </div>
          <br></br>
          <div>
            <strong>연락처: </strong>
            <span>{bizDetail.bizContact}</span>
          </div>
          <br></br>
          <div>
            <strong>사원수: </strong>
            <span>{bizDetail.bizEmpCount}</span>
          </div>
          <br></br>
          <div>
            <strong>주소: </strong>
            <span>{bizDetail.bizAddr}</span>
          </div>
          <br></br>
          <div>
            <strong>대표명: </strong>
            <span>{bizDetail.bizCeoName}</span>
          </div>
          <br></br>
          <div style={{ textAlign: "center" }}>
            <button className="backbutton">기업정보→</button>
          </div>
          <br></br>
          <br></br>
          <div style={{ textAlign: "center" }}>
            <h4>남은 기간</h4>
            <p>시작일: {postDetail.startDate}</p>
            <p>마감일: {postDetail.endDate}</p>
          </div>

          <br></br>
          <br></br>
          <div>
            <h4>첨부파일</h4>
            {postDetail.fileName ? (
              <h1>123</h1>
            ) : (
              <div>{postDetail?.fileName}</div>
            )}
          </div>
        </div>
      </PostDetailStyled>
    </>
  );
};
