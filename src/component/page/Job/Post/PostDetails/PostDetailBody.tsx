import React from "react";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ILoginInfo } from "../../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../../stores/userInfo";
import { useRecoilState } from "recoil";

const PostDetailBody = () => {
  const [{ userType }] = useRecoilState<ILoginInfo>(loginInfoState);
  const navigate = useNavigate();
  return (
    <>
      <Container className="mt-2">
        <div>
          <Stack direction="horizontal" gap={3} className="me-3">
            <div className="p-2">
              <Row>
                <h1>채용명</h1>
                <Row className="my-1">
                  <Col>
                    <Link to={"#"} className="text-dark">
                      <h4>기업명</h4>
                    </Link>
                  </Col>
                  <Col className="d-flex align-items-center">
                    <span>∙ 근무지 | ∙ 신입 </span>
                  </Col>
                </Row>
              </Row>
            </div>
            {userType === "B" ? (
              <div></div>
            ) : (
              <div className="p-2 ms-auto">
                <Button variant="warning mx-1" size="lg">
                  스크랩
                </Button>
                <Button variant="primary mx-1" size="lg">
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
            <span className="p-4">{}asdfasdfsdf</span>
          </div>
          <div className="mt-5">
            <h5>■ 주요업무 </h5>
            <span className="p-4">{}</span>
          </div>
          <div className="mt-5">
            <h5>■ 자격요건 </h5>
            <span className="p-4">{}</span>
          </div>
          <div className="mt-5">
            <h5>■ 급여 </h5>
            <span className="p-4">{}</span>
          </div>
          <div className="mt-5">
            <h5>■ 모집인원 </h5>
            <span className="p-4">{} 명</span>
          </div>
          <div className="mt-5">
            <h5>■ 우대사항 </h5>
            <span className="p-4">{}</span>
          </div>
          <div className="mt-5">
            <h5>■ 혜택 & 복지 </h5>
            <span className="p-4">{}</span>
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
