import React from "react";
import { IPostDetail } from "../../../../../models/interface/IPost";

interface IPostDetailProps {
  postDetail: IPostDetail;
}

export const PostDetail: React.FC<IPostDetailProps> = ({ postDetail }) => {
  return (
    <>
      <div className="postDetailContainer">
        <div>
          <strong>경력: </strong>
          <span>{postDetail.expRequired}</span>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <strong>급여: </strong>
          <span>{postDetail.salary}</span>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <strong>모집인원: </strong>
          <span>{postDetail.openings} 명</span>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <strong>근무지역: </strong>
          <span>{postDetail.workLocation}</span>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <strong>업무: </strong>
          <span>{postDetail.duties}</span>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <strong>포지션 소개: </strong>
          <span>{postDetail.posDescription}</span>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <strong>자격요건: </strong>
          <span>{postDetail.reqQualifications}</span>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <strong>우대사항: </strong>
          <span>{postDetail.prefQualifications}</span>
        </div>
        <br></br>
        <br></br>
        <br></br>
        <div>
          <strong>혜택 & 복지: </strong>
          <span>{postDetail.benefits}</span>
        </div>
      </div>
    </>
  );
};
