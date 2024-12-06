import { useContext, useEffect, useState } from "react";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ILoginInfo } from "../../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../../stores/userInfo";
import { useRecoilState } from "recoil";
import {
  IBizDetail,
  IPostdetailResponse,
  IPostDetail,
  IisClicked,
} from "../../../../../models/interface/IPost";
import { postApi } from "../../../../../api/postApi";
import { Post, Scrap } from "../../../../../api/api";
import { ISaveScrapResponse } from "../../../../../models/interface/IScrap";
import { modalState } from "../../../../../stores/modalState";
import { Portal } from "../../../../common/potal/Portal";
import { ResumeModalApplication } from "../../../Resume/ResumeModal/ResumeModalApplication";
import swal from "sweetalert";
import { PostDetailContext } from "../../../../../api/provider/PostDetailProvider";

const PostDetailBody = () => {
  const { postIdx } = useParams();
  const [{ userType }] = useRecoilState<ILoginInfo>(loginInfoState);
  const navigate = useNavigate();
  const [postDetail, setPostDetail] = useState<IPostDetail | null>(null);
  const [bizDetail, setBizDetail] = useState<IBizDetail | null>(null);
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [isClicked, setIsClicked] = useState<IisClicked>();
  const { setBizImagePath, setPostImagePath } = useContext(PostDetailContext);

  useEffect(() => {
    postDetailData(postIdx);
    console.log("postDetailData");
  }, [postIdx]);

  useEffect(() => {
    if (bizDetail && postDetail) {
      const bizImagePath = bizDetail?.logicalPath || null;
      const postImagePath = postDetail?.logicalPath || null;
      setBizImagePath(bizImagePath);
      setPostImagePath(postImagePath);
    }
  }, [bizDetail, postDetail, setBizImagePath, setPostImagePath]);

  const postDetailData = async (postIdx: string) => {
    const params = { postIdx };

    const response = await postApi<IPostdetailResponse>(Post.getDetail, params);

    console.log("API Response: ", response);
    if (response) {
      setPostDetail(response.postDetail);
      setBizDetail(response.bizDetail);
      setIsClicked(response.isClicked);
      console.log(isClicked);
    }
  };

  const postUpdateAppStatus = async (postIdx: string, appStatus: string) => {
    const params = { postIdx, appStatus };

    const response = await postApi("/api/manage-post/statusUpdate.do", params);

    console.log("API Response: ", response);
    if (response) {
      swal(`${appStatus}이(가) 처리되었습니다.`, "", "success");
    } else {
      swal(
        `${appStatus}이(가) 처리되지 않았습니다.`,
        "잠시 후 다시 한 번 시도해주세요.",
        "fail"
      );
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
      swal("스크랩이 성공적으로 저장되었습니다.", "", "success");
      setIsClicked((prev) => ({ ...prev, isScraped: true }));
    } else {
      swal("이미 스크립된 공고입니다.", "", "error");
    }
  };

  const handlerModal = (postDetail, bizDetail) => {
    setModal(!modal);
    setPostDetail(postDetail);
    setBizDetail(bizDetail);
    setIsClicked((prev) => ({ ...prev, isApplyed: true }));
    console.log(postDetail);
    console.log(bizDetail);
  };

  const onPostSuccess = () => {
    setModal(!modal);
  };

  const handlerUpdateAppStatus = (postIdx, appStatus) => {
    postUpdateAppStatus(postIdx, appStatus);

    if (appStatus === "승인") {
      navigate("/react/jobs/posts.do");
    } else if (appStatus === "불허") {
      navigate("/react/manage-post/approval.do");
    }
  };

  return (
    <>
      <Container className="mt-2">
        <div>
          <Stack direction="horizontal" gap={3} className="me-3">
            <div className="p-2" style={{ width: "60%" }}>
              <Row>
                <h1>{postDetail?.title}</h1>
                <Row className="my-1">
                  <Col>
                    <Link
                      to={`/react/company/companyDetailPage.do/${postIdx}/${bizDetail?.bizIdx}`}
                      className="text-dark"
                    >
                      <h4>{bizDetail?.bizName}</h4>
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <Col className="d-flex align-items-center">
                    <span>
                      {postDetail?.workLocation} | {postDetail?.expRequired}{" "}
                    </span>
                  </Col>
                </Row>
              </Row>
            </div>
            {userType === "A" ? (
              <>
                <div className="p-2 d-flex justify-content-center">
                  {isClicked?.isScraped ? (
                    <Button
                      variant="warning"
                      size="lg"
                      style={{ width: "150px", marginRight: "20px" }}
                      onClick={handlerSaveScrap}
                    >
                      스크랩
                    </Button>
                  ) : (
                    <Button
                      variant="outline-warning"
                      size="lg"
                      style={{
                        width: "150px",
                        marginRight: "20px",
                        color: "#ffc107",
                        borderColor: "#ffc107",
                      }}
                      onClick={handlerSaveScrap}
                    >
                      스크랩
                    </Button>
                  )}
                  {isClicked?.isApplyed ? (
                    <Button
                      variant="primary"
                      size="lg"
                      style={{ width: "150px" }}
                      onClick={() => handlerModal(postDetail, bizDetail)}
                    >
                      입사지원
                    </Button>
                  ) : (
                    <Button
                      variant="outline-primary"
                      size="lg"
                      style={{
                        width: "150px",
                        color: "#007bff",
                        borderColor: "#007bff",
                      }}
                      onClick={() => handlerModal(postDetail, bizDetail)}
                    >
                      입사지원
                    </Button>
                  )}
                </div>
              </>
            ) : (
              <></>
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
        {userType === "B" ? (
          <div className="d-flex justify-content-center mt-5 ">
            <span style={{ color: "red" }}>
              '대기중' 공고만 수정 및 삭제 가능합니다.
            </span>
          </div>
        ) : (
          <></>
        )}
        <div className="d-flex justify-content-center m-2">
          {userType === "B" && postDetail?.appStatus === "대기중" ? (
            <div>
              <Button
                variant="primary"
                size="lg"
                className="mx-1"
                onClick={() =>
                  navigate(`/react/manage-hire/update-post.do/${postIdx}`)
                }
              >
                수정하기
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate("/react/manage-hire/post.do")}
              >
                뒤로가기
              </Button>
            </div>
          ) : userType === "M" ? (
            <>
              <Button
                variant="outline-success"
                className="me-2"
                onClick={() => handlerUpdateAppStatus(postIdx, "승인")}
              >
                승인
              </Button>
              <Button
                variant="outline-danger"
                className="me-2"
                onClick={() => handlerUpdateAppStatus(postIdx, "불허")}
              >
                불허
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => navigate(-1)}
              >
                뒤로가기
              </Button>
            </>
          ) : (
            <Button variant="secondary" size="lg" onClick={() => navigate(-1)}>
              뒤로가기
            </Button>
          )}
        </div>
      </Container>
      {modal && (
        <Portal>
          <ResumeModalApplication
            onSuccess={onPostSuccess}
            scrap={null}
            post={postDetail}
            biz={bizDetail}
          />
        </Portal>
      )}
    </>
  );
};

export default PostDetailBody;
