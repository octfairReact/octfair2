import { useNavigate, useParams } from "react-router-dom";
import {
  IBizDetail,
  IPostDetail,
  IPostdatailResponse,
} from "../../../../../models/interface/IPost";
import { useEffect, useState } from "react";
import { postApi } from "../../../../../api/postApi";
import { ContentBox } from "../../../../common/ContentBox/ContentBox";
import { Post } from "../../../../../api/api";
import { PostDetail } from "./PostDetail";
import { BizDetail } from "./BizDetail";
import { PostDetailStyled } from "./styled";

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

  console.log("received params : ", { postIdx });

  return (
    <>
      <ContentBox>채용 공고</ContentBox> <br></br>
      <PostDetailStyled>
        {postDetail?.postIdx ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "3fr 1fr",
              gap: "20px",
              padding: "20px",
            }}
          >
            {/* 채용 공고 */}
            <div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <div>
                  <h1>{bizDetail.bizName}</h1>
                  <h2>{postDetail.title}</h2>
                </div>
                <div>
                  <button className="scrapButton">스크랩</button>
                  <button className="applyButton">입사지원</button>
                </div>
              </div>
              {/* PostDetail 넣을 곳 */}
              <PostDetail postDetail={postDetail} />
            </div>
            {/* 기업 정보 */}
            {/* BizDetail 넣을 곳 */}
            <BizDetail bizDetail={bizDetail} postDetail={postDetail} />
          </div>
        ) : (
          <p>로딩중...</p>
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
