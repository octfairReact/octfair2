import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ILoginInfo } from "../../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../../stores/userInfo";
import { useRecoilState } from "recoil";
import {
  IBizDetail,
  IPostdatailResponse,
  IPostDetail,
} from "../../../../../models/interface/IPost";
import { postApi } from "../../../../../api/postApi";
import { Post, Scrap } from "../../../../../api/api";
import { ISaveScrapResponse } from "../../../../../models/interface/IScrap";

const PostDetailBody = () => {
  const { postIdx } = useParams();
  const [{ userType }] = useRecoilState<ILoginInfo>(loginInfoState);
  const navigate = useNavigate();
  const [postDetail, setPostDetail] = useState<IPostDetail | null>(null);
  const [bizDetail, setBizDetail] = useState<IBizDetail | null>(null);

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
      postIdx: postDetail.postIdx,
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

  return (
    <>
      <Container className="mt-2">
        <div>
          <Stack direction="horizontal" gap={3} className="me-3">
            <div className="p-2">
              <Row>
                <h1>{postDetail?.title}</h1>
                <Row className="my-1">
                  <Col>
                    <Link to={"#"} className="text-dark">
                      <h4>{bizDetail?.bizName}</h4>
                    </Link>
                  </Col>
                  <Col className="d-flex align-items-center">
                    <span>
                      {postDetail?.workLocation} | {postDetail?.expRequired}{" "}
                    </span>
                  </Col>
                </Row>
              </Row>
            </div>
            {userType === "B" ? (
              <div></div>
            ) : (
              <div className="p-2 d-flex justify-content-center">
                <Button
                  variant="warning"
                  size="lg"
                  style={{ width: "150px", marginRight: "20px" }}
                  onClick={handlerSaveScrap}
                >
                  스크랩
                </Button>
                <Button variant="primary" size="lg" style={{ width: "150px" }}>
                  입사지원
                </Button>
              </div>
            )}
          </Stack>
        </div>
      </Container>

      <Container className="mt-5">
        <div className="postDetailContainer">
          <div>
            <h5>■ 포지션 소개 </h5>
            <span className="p-4">{postDetail?.posDescription}</span>
          </div>
          <div className="mt-5">
            <h5>■ 주요업무 </h5>
            <span className="p-4">{postDetail?.duties}</span>
          </div>
          <div className="mt-5">
            <h5>■ 자격요건 </h5>
            <span className="p-4">{postDetail?.reqQualifications}</span>
          </div>
          <div className="mt-5">
            <h5>■ 급여 </h5>
            <span className="p-4">{postDetail?.salary}</span>
          </div>
          <div className="mt-5">
            <h5>■ 모집인원 </h5>
            <span className="p-4">{postDetail?.openings} 명</span>
          </div>
          <div className="mt-5">
            <h5>■ 우대사항 </h5>
            <span className="p-4">{postDetail?.prefQualifications}</span>
          </div>
          <div className="mt-5">
            <h5>■ 혜택 & 복지 </h5>
            <span className="p-4">{postDetail?.benefits}</span>
          </div>
        </div>
        <div className="d-flex justify-content-center m-5">
          {userType === "B" ? (
            <div>
              <Button
                variant="primary"
                size="lg"
                className="mx-1"
                onClick={() => navigate("")}
              >
                수정하기
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate(-1)}
              >
                뒤로가기
              </Button>
            </div>
          ) : (
            <Button variant="secondary" size="lg" onClick={() => navigate(-1)}>
              뒤로가기
            </Button>
          )}
        </div>
      </Container>
    </>
  );
};

export default PostDetailBody;
