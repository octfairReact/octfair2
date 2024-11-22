import { useNavigate, useParams } from "react-router-dom";
import {
  IBizDetail,
  IPostDetail,
  IPostdatailResponse,
} from "../../../../../models/interface/IPost";
import { useEffect, useState } from "react";
import { postApi } from "../../../../../api/postApi";
import { ContentBox } from "../../../../common/ContentBox/ContentBox";
import { Post, Scrap } from "../../../../../api/api";
import { PostDetail } from "./PostDetail";
import { BizDetail } from "./BizDetail";
import { PostDetailStyled } from "./styled";
import axios from "axios";
import { ISaveScrapResponse } from "../../../../../models/interface/IScrap";

export const PostDetails = () => {
  const { postIdx } = useParams();
  const [postDetail, setPostDetail] = useState<IPostDetail | null>(null);
  const [bizDetail, setBizDetail] = useState<IBizDetail | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    postDetailData(postIdx);
  }, [postIdx]);

  const postDetailData = async (postIdx: string) => {
    const params = { postIdx };

    const response = await postApi<IPostdatailResponse>(Post.getDetail, params);

    console.log("API Response: ", response);
    // console.log(response.)
    if (response) {
      setPostDetail(response.postDetail);
      setBizDetail(response.bizDetail);
    }
  };

  const handlerSaveScrap = async () => {
    console.log("handlerSaveScrap");
    const requestBody = {
      postIdx: postDetail?.postIdx,
    };

    const response = await postApi<ISaveScrapResponse>(
      Scrap.saveScrap,
      requestBody
    );
    console.log("saveScrapResponse : ", response);

    if (response?.result === "success") {
      alert("스크랩이 성공적으로 저장되었습니다.");
    } else {
      alert("이미 스크립된 공고입니다.");
    }
  };

  console.log("received params : ", { postIdx });

  return (
    <>
      <ContentBox>채용 공고</ContentBox> <br></br>
      <PostDetailStyled>
        {postDetail?.postIdx ? (
          <div className="postDetailsContainer">
            {/* 채용 공고 */}
            <div>
              <div className="postTitleAndButtonContainer">
                <div>
                  <h1>{bizDetail.bizName}</h1>
                  <h2>{postDetail.title}</h2>
                </div>
                <div>
                  <button className="scrapButton" onClick={handlerSaveScrap}>
                    스크랩
                  </button>
                  <button className="applyButton">입사지원</button>
                </div>
              </div>
              <PostDetail postDetail={postDetail} />
            </div>
            {/* 기업 정보 */}
            <BizDetail bizDetail={bizDetail} postDetail={postDetail} />
          </div>
        ) : (
          <p className="loadingText">로딩중...</p>
        )}
        <div style={{ textAlign: "center" }}>
          <button className="backButton" onClick={() => navigate(-1)}>
            뒤로가기
          </button>
        </div>
      </PostDetailStyled>
    </>
  );
};
