/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useRef, useState } from "react";
import { ContentBox } from "../../../common/ContentBox/ContentBox";
import {
  Table,
  Form,
  Button,
  InputGroup,
  Row,
  Col,
  Container,
  ButtonGroup,
} from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./NewHirePost.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  IPostdetailResponse,
  IPostDetail,
  IBizDetail,
} from "../../../../models/interface/IPost";
import axios from "axios";
import { useRecoilState } from "recoil";
import { ILoginInfo } from "../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../stores/userInfo";
import { postApi } from "../../../../api/postApi";
import { Post } from "../../../../api/api";

const NewHirePost = () => {
  const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
  const [postData, setPostData] = useState<IPostDetail>({
    expYears: 0,
  } as IPostDetail);
  const [bizData, setBizData] = useState<IBizDetail>();
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [fileData, setFileData] = useState<File>();
  const [currentProc, setCurrentProc] = useState<string>("");
  const navigate = useNavigate();
  const [postIdx, setPostIdx] = useState<string | null>(null);
  const params = useParams();

  useEffect(() => {
    const fetchedPostIdx = params.postIdx ? params.postIdx : null;
    if (fetchedPostIdx) {
      setPostIdx(fetchedPostIdx);
      getPostDetail(fetchedPostIdx);
    }
  }, [params.postIdx, postIdx]);

  const getPostDetail = async (postIdx: string) => {
    const params = { postIdx };

    const response = await postApi<IPostdetailResponse>(Post.getDetail, params);

    if (response) {
      setPostData(response.postDetail);
      setBizData(response.bizDetail);
      setStartDate(new Date(response.postDetail.startDate));
      setEndDate(new Date(response.postDetail.startDate));
      setImageUrl(response.postDetail.logicalPath);
    }
  };

  const getMinEndDate = (startDate: Date | null) => {
    if (!startDate) return new Date();
    const minEndDate = new Date(startDate);
    minEndDate.setDate(minEndDate.getDate() + 30);
    return minEndDate;
  };

  const resetDate = () => {
    setEndDate(null);
    setStartDate(null);
  };

  const validateForm = (): boolean => {
    const requiredFields = [
      postData.title,
      postData.expRequired,
      postData.expYears,
      postData.salary,
      postData.openings,
      postData.workLocation,
      postData.posDescription,
      postData.reqQualifications,
      postData.duties,
      postData.hirProcess,
      postData.startDate,
      postData.endDate,
    ];

    return requiredFields.every((field) => Boolean(field));
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateForm();
    const postWithLoginId = { ...postData, loginId: userInfo.loginId };
    const formData = new FormData();

    fileData && formData.append("attachFile", fileData);

    formData.append(
      "postContent",
      new Blob([JSON.stringify(postWithLoginId)], { type: "application/json" })
    );

    try {
      let response;
      if (postIdx) {
        response = await axios.post("/api/manage-hire/post-update", formData);
        if (response.data.result === "success") {
          // const createdPostIdx = response.data.postIdx; // 서버에서 반환된 postIdx
          // setPostIdx(createdPostIdx); // `postIdx`를 상태에 저장
          alert("채용공고가 수정되었습니다.");

          navigate(`/react/jobs/post-detail/${postIdx}`);
        }
      } else {
        response = await axios.post("/api/manage-hire/post-new", formData);
        if (response.data.result === "success") {
          const createdPostIdx = response.data.postIdx; // 서버에서 반환된 postIdx
          setPostIdx(createdPostIdx); // `postIdx`를 상태에 저장
          alert("채용공고가 등록되었습니다.");

          navigate(`/react/jobs/post-detail/${createdPostIdx}`);
        }
      }
    } catch (error) {
      alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요. " + error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

      if (!validTypes.includes(file.type)) {
        alert("올바른 이미지 파일을 업로드해주세요.");
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
        return;
      } else {
        setImageUrl(URL.createObjectURL(file));
      }

      setFileData(file);
    }
  };

  const handleHiringProc = () => {
    if (!currentProc.trim()) {
      alert("과정을 입력해주세요!");
      return;
    }
    setPostData((prev) => ({
      ...prev,
      hirProcess: prev.hirProcess
        ? `${prev.hirProcess} -> ${currentProc.trim()}`
        : currentProc.trim(),
    }));
  };

  const resetHiringProc = () => {
    setPostData((prev) => ({
      ...prev,
      hirProcess: "",
    }));
    setCurrentProc("");
  };

  const handleImageRemove = () => {
    fileInputRef.current.value = "";
    setImageUrl("");
  };

  const deletePost = async (postIdx: string) => {
    try {
      const param = { bizIdx: bizData.bizIdx };
      const response = await axios.post(
        `/api/manage-hire/deleteHirePost/${postIdx}`,
        param
      );
      if (response.data.result === "success") {
        alert("채용공고가 삭제되었습니다.");
        navigate("/react/manage-hire/post.do");
      } else {
        alert("채용공고 삭제에 실패했습니다.");
      }
    } catch (error) {
      alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  const deleteAttach = async (postIdx: string) => {
    try {
      const param = { ...postData };
      const response = await axios.post(
        `/api/manage-hire/deleteAttachment/${postIdx}`,
        param,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      if (response.data.result === "success") {
        alert("첨부파일이 삭제되었습니다.");
        getPostDetail(postIdx);
      } else {
        alert("첨부파일 삭제에 실패했습니다.");
      }
    } catch (error) {
      alert("오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div>
        <ContentBox>{postIdx ? "채용공고 수정" : "채용공고 등록"}</ContentBox>
        <div className="mt-5"></div>
        <Form onSubmit={handleFormSubmit}>
          <Table bordered className="input-table">
            <tbody>
              <tr>
                <th>
                  채용 제목 <span className="font_red">*</span>
                </th>
                <td colSpan={3}>
                  <Form.Control
                    type="text"
                    placeholder="채용 제목을 입력하세요"
                    value={postData.title || ""}
                    required
                    onChange={(e) =>
                      setPostData({ ...postData, title: e.target.value })
                    }
                  />
                  {!postData.title && (
                    <Form.Text className="text-danger">
                      채용 제목을 입력해주세요.
                    </Form.Text>
                  )}
                </td>
              </tr>

              <tr>
                <th>
                  경력여부 <span className="font_red">*</span>
                </th>
                <td>
                  <div>
                    <Row>
                      <Col>
                        <Form.Check
                          type="radio"
                          label="신입"
                          value="신입"
                          checked={postData.expRequired === "신입"}
                          onChange={(e) =>
                            setPostData({
                              ...postData,
                              expRequired: e.target.value,
                              expYears: 0,
                            })
                          }
                        />
                      </Col>
                      <Col>
                        <Form.Check
                          type="radio"
                          label="경력"
                          value="경력"
                          checked={postData.expRequired === "경력"}
                          onChange={(e) =>
                            setPostData({
                              ...postData,
                              expRequired: e.target.value,
                            })
                          }
                        />
                      </Col>
                      <Col>
                        <Form.Check
                          type="radio"
                          label="경력무관"
                          value="경력무관"
                          checked={postData.expRequired === "경력무관"}
                          onChange={(e) =>
                            setPostData({
                              ...postData,
                              expRequired: e.target.value,
                              expYears: 0,
                            })
                          }
                        />
                      </Col>
                    </Row>
                  </div>
                  {!postData.expRequired && (
                    <Form.Text className="text-danger">
                      경력을 선택해주세요.
                    </Form.Text>
                  )}
                </td>
                <th>
                  필요경력 <span className="font_red">*</span>
                </th>
                <td>
                  <Form.Select
                    value={
                      postData.expRequired === "신입"
                        ? 0
                        : postData.expYears || 0
                    }
                    onChange={(e) =>
                      setPostData({
                        ...postData,
                        expYears: Number(e.target.value),
                      })
                    }
                    disabled={postData.expRequired === "신입"}
                    required={postData.expRequired === "경력"}
                  >
                    <option value="0">최소경력 선택</option>
                    <option value="1">1년</option>
                    <option value="3">3년</option>
                    <option value="5">5년</option>
                    <option value="7">7년</option>
                    <option value="10">10년</option>
                    <option value="15">15년</option>
                  </Form.Select>
                  {postData.expRequired === "경력" && !postData.expYears && (
                    <Form.Text className="text-danger">
                      필요경력을 선택해주세요.
                    </Form.Text>
                  )}
                </td>
              </tr>

              <tr>
                <th>
                  급여 <span className="font_red">*</span>
                </th>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="급여를 입력하세요"
                    value={postData.salary || ""}
                    required
                    onChange={(e) =>
                      setPostData({ ...postData, salary: e.target.value })
                    }
                  />
                  {!postData.salary && (
                    <Form.Text className="text-danger">
                      급여을 입력해주세요.
                    </Form.Text>
                  )}
                </td>
                <th>
                  모집 인원 <span className="font_red">*</span>
                </th>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="모집 인원을 입력하세요"
                    value={postData.openings || ""}
                    required
                    onChange={(e) =>
                      setPostData({
                        ...postData,
                        openings: e.target.value,
                      })
                    }
                  />
                  {!postData.openings && (
                    <Form.Text className="text-danger">
                      모집인원을 입력해주세요.
                    </Form.Text>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  근무 지역 <span className="font_red">*</span>
                </th>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="근무 지역을 입력하세요"
                    value={postData.workLocation || ""}
                    onChange={(e) =>
                      setPostData({ ...postData, workLocation: e.target.value })
                    }
                    required
                  />
                  {!postData.workLocation && (
                    <Form.Text className="text-danger">
                      근무지역을 입력해주세요.
                    </Form.Text>
                  )}
                </td>
                <th>
                  포지션 설명 <span className="font_red">*</span>
                </th>
                <td>
                  <Form.Control
                    type="text"
                    placeholder="포지션에 대한 설명을 입력하세요"
                    value={postData.posDescription || ""}
                    onChange={(e) =>
                      setPostData({
                        ...postData,
                        posDescription: e.target.value,
                      })
                    }
                    required
                  />
                  {!postData.posDescription && (
                    <Form.Text className="text-danger">
                      채용 포지션에 대해 자세히 입력해주세요.
                    </Form.Text>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  채용 기간 <span className="font_red">*</span>
                </th>
                <td colSpan={3}>
                  <Container>
                    <Row className="justify-content-center align-items-center">
                      <Col
                        sm={5}
                        className="d-flex flex-column align-items-center"
                      >
                        <Form.Group
                          controlId="startDate"
                          className="text-center"
                        >
                          <DatePicker
                            id="startDate"
                            selected={startDate}
                            onChange={(date: Date) => {
                              setStartDate(date);
                              setPostData((prev) => ({
                                ...prev,
                                startDate: formatDate(date),
                              }));
                            }}
                            placeholderText="시작 날짜 선택"
                            dateFormat="yyyy년 MM월 dd일"
                            className="form-control"
                            minDate={new Date()}
                            required
                          />
                          {!startDate && (
                            <Form.Text className="text-danger">
                              시작 날짜를 선택해주세요.
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>
                      <Col
                        sm={5}
                        className="d-flex flex-column align-items-center"
                      >
                        <Form.Group controlId="endDate" className="text-center">
                          <DatePicker
                            id="endDate"
                            selected={endDate}
                            onChange={(date: Date) => {
                              setEndDate(date);
                              setPostData((prev) => ({
                                ...prev,
                                endDate: formatDate(date),
                              }));
                            }}
                            placeholderText="최소 게시기간: 한달"
                            dateFormat="yyyy년 MM월 dd일"
                            className="form-control"
                            minDate={getMinEndDate(startDate)}
                            disabled={!startDate}
                            required
                          />
                          {!endDate && startDate && (
                            <Form.Text className="text-danger">
                              종료 날짜를 선택해주세요.
                            </Form.Text>
                          )}
                        </Form.Group>
                      </Col>
                      <Col
                        sm={2}
                        className="d-flex justify-content-center align-items-center"
                      >
                        <Button variant="outline-secondary" onClick={resetDate}>
                          날짜 초기화
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </td>
              </tr>
              <tr>
                <th>
                  채용 절차 <span className="font_red">*</span>
                </th>
                <td colSpan={3}>
                  <InputGroup>
                    <Form.Control
                      id="hireProcess"
                      type="text"
                      placeholder="과정을 입력하세요"
                      value={currentProc || ""}
                      onChange={(e) => setCurrentProc(e.target.value)}
                      onFocus={() => setCurrentProc("")}
                    />
                    <Button
                      variant="outline-primary"
                      onClick={handleHiringProc}
                    >
                      절차 등록
                    </Button>
                    <Button
                      variant="outline-secondary"
                      onClick={resetHiringProc}
                    >
                      절차 초기화
                    </Button>
                  </InputGroup>
                  <Form.Label className="pt-3" htmlFor="hireProcess">
                    채용절차 : {postData.hirProcess || ""}
                  </Form.Label>
                  {!postData.hirProcess && (
                    <Form.Text className="text-danger">
                      채용 절차에 대해 자세히 입력해주세요.
                    </Form.Text>
                  )}
                </td>
              </tr>

              <tr>
                <th>
                  자격 조건 <span className="font_red">*</span>
                </th>
                <td colSpan={3}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="자격 조건 입력"
                    value={postData.reqQualifications || ""}
                    onChange={(e) =>
                      setPostData({
                        ...postData,
                        reqQualifications: e.target.value,
                      })
                    }
                    required
                  />
                  {!postData.reqQualifications && (
                    <Form.Text className="text-danger">
                      자격 요건에 대해 자세히 입력해주세요.
                    </Form.Text>
                  )}
                </td>
              </tr>
              <tr>
                <th>
                  업무 <span className="font_red">*</span>
                </th>
                <td colSpan={3}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={postData.duties || ""}
                    placeholder="업무 내용 입력"
                    onChange={(e) =>
                      setPostData({ ...postData, duties: e.target.value })
                    }
                    required
                  />
                  {!postData.duties && (
                    <Form.Text className="text-danger">
                      업무 내용에 대해 자세히 입력해주세요.
                    </Form.Text>
                  )}
                </td>
              </tr>
              <tr>
                <th>우대 사항</th>
                <td colSpan={3}>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="우대 사항 입력"
                    value={postData.prefQualifications || ""}
                    onChange={(e) =>
                      setPostData({
                        ...postData,
                        prefQualifications: e.target.value,
                      })
                    }
                  />
                </td>
              </tr>
              <tr>
                <th>혜택 & 복지</th>
                <td colSpan={3}>
                  <Form.Control
                    id="attachment"
                    as="textarea"
                    rows={3}
                    placeholder="혜택 및 복지 내용 입력"
                    value={postData.benefits || ""}
                    onChange={(e) =>
                      setPostData({ ...postData, benefits: e.target.value })
                    }
                  />
                </td>
              </tr>
              <tr>
                <th>첨부파일</th>
                {postData.fileName ? (
                  <td colSpan={3}>
                    <Form.Label
                      className="d-flex justify-content-start text-muted"
                      htmlFor="attachment"
                    >
                      채용공고 이미지 486 * 300 px (파일형식 .jpg, .jpeg, .png,
                      .gif)
                    </Form.Label>
                    <div className="py-3 d-flex justify-content-start">
                      <img src={imageUrl} style={{ height: "100px" }} />
                      <Button
                        variant="outline-danger"
                        onClick={() => deleteAttach(postIdx)}
                      >
                        삭제
                      </Button>
                    </div>
                  </td>
                ) : (
                  <td colSpan={3}>
                    <Form.Label
                      className="d-flex justify-content-start text-muted"
                      htmlFor="attachment"
                    >
                      채용공고 이미지 486 * 300 px (파일형식 .jpg, .jpeg, .png,
                      .gif)
                    </Form.Label>
                    <Form.Control
                      type="file"
                      accept=".jpg, .jpeg, .png, .gif"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                    {imageUrl ? (
                      <div className="py-3 d-flex justify-content-start">
                        <img src={imageUrl} style={{ height: "100px" }} />

                        <Link
                          to="#"
                          onClick={handleImageRemove}
                          style={{
                            color: "red",
                            textDecoration: "none",
                            cursor: "pointer",
                          }}
                        >
                          X
                        </Link>
                      </div>
                    ) : (
                      ""
                    )}
                  </td>
                )}
              </tr>
            </tbody>
          </Table>
          <div className="buttonWrap">
            {postIdx ? (
              <ButtonGroup>
                <Button
                  variant="secondary"
                  onClick={() => {
                    navigate("/react/manage-hire/post.do");
                  }}
                >
                  뒤로
                </Button>
                <Button variant="danger" onClick={() => deletePost(postIdx)}>
                  삭제
                </Button>
                <Button variant="primary" type="submit">
                  수정
                </Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup>
                <Button
                  variant="secondary"
                  onClick={() => {
                    navigate("/react/manage-hire/post.do");
                  }}
                >
                  뒤로
                </Button>
                <Button variant="primary" type="submit">
                  등록
                </Button>
              </ButtonGroup>
            )}
          </div>
        </Form>
      </div>
    </>
  );
};

export default NewHirePost;
