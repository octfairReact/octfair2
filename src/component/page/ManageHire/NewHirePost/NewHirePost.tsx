/* eslint-disable jsx-a11y/alt-text */
import React, { useRef, useState } from "react";
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
import { Link, useNavigate } from "react-router-dom";
import { IPostDetail } from "../../../../models/interface/IPost";

const NewHirePost = () => {
  const [formData, setFormData] = useState<IPostDetail>({} as IPostDetail);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string>("");
  const [currentProc, setCurrentProc] = useState<string>("");
  const navigate = useNavigate();

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
      formData.title,
      formData.expRequired,
      formData.expYears,
      formData.salary,
      formData.openings,
      formData.workLocation,
      formData.posDescription,
      formData.reqQualifications,
      formData.duties,
      formData.hirProcess,
      formData.startDate,
      formData.endDate,
    ];

    return requiredFields.every((field) => Boolean(field));
  };

  const formatDate = (date: Date | null): string => {
    if (!date) return ""; // null 값 처리
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 1월은 0부터 시작하므로 +1
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    validateForm();
    console.log(formData);
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
    }
  };

  const handleHiringProc = () => {
    if (!currentProc.trim()) {
      alert("과정을 입력해주세요!");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      hirProcess: prev.hirProcess
        ? `${prev.hirProcess} -> ${currentProc.trim()}`
        : currentProc.trim(),
    }));
  };

  const resetHiringProc = () => {
    setFormData((prev) => ({
      ...prev,
      hirProcess: "",
    }));
    setCurrentProc("");
  };

  const handleImageRemove = () => {
    fileInputRef.current.value = "";
    setImageUrl("");
  };

  const handlerPreviewPost = () => {};

  return (
    <>
      <div>
        <ContentBox>채용공고 등록</ContentBox>
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
                    value={formData.title || ""}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                  {!formData.title && (
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
                          checked={formData.expRequired === "신입"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              expRequired: e.target.value,
                            })
                          }
                        />
                      </Col>
                      <Col>
                        <Form.Check
                          type="radio"
                          label="경력"
                          value="경력"
                          checked={formData.expRequired === "경력"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
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
                          checked={formData.expRequired === "경력무관"}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              expRequired: e.target.value,
                            })
                          }
                        />
                      </Col>
                    </Row>
                  </div>
                  {!formData.expRequired && (
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
                    value={formData.expYears || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        expYears: Number(e.target.value),
                      })
                    }
                    disabled={formData.expRequired !== "경력"}
                    required
                  >
                    <option value="0">최소경력 선택</option>
                    <option value="1">1년</option>
                    <option value="3">3년</option>
                    <option value="5">5년</option>
                    <option value="7">7년</option>
                    <option value="10">10년</option>
                    <option value="15">15년</option>
                  </Form.Select>
                  {!formData.expYears && (
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
                    value={formData.salary || ""}
                    required
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                  />
                  {!formData.salary && (
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
                    value={formData.openings || ""}
                    required
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        openings: e.target.value,
                      })
                    }
                  />
                  {!formData.openings && (
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
                    value={formData.workLocation || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, workLocation: e.target.value })
                    }
                    required
                  />
                  {!formData.workLocation && (
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
                    value={formData.posDescription || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        posDescription: e.target.value,
                      })
                    }
                    required
                  />
                  {!formData.posDescription && (
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
                          <Form.Label>시작 날짜</Form.Label>
                          <DatePicker
                            id="startDate"
                            selected={startDate}
                            onChange={(date: Date) => {
                              setStartDate(date);
                              setFormData((prev) => ({
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
                          <Form.Label>종료 날짜</Form.Label>
                          <DatePicker
                            id="endDate"
                            selected={endDate}
                            onChange={(date: Date) => {
                              setEndDate(date);
                              setFormData((prev) => ({
                                ...prev,
                                EndDate: formatDate(date),
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
                    채용절차 : {formData.hirProcess || ""}
                  </Form.Label>
                  {!formData.hirProcess && (
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
                    value={formData.reqQualifications || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        reqQualifications: e.target.value,
                      })
                    }
                    required
                  />
                  {!formData.reqQualifications && (
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
                    value={formData.duties || ""}
                    placeholder="업무 내용 입력"
                    onChange={(e) =>
                      setFormData({ ...formData, duties: e.target.value })
                    }
                    required
                  />
                  {!formData.duties && (
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
                    value={formData.prefQualifications || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
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
                    value={formData.benefits || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, benefits: e.target.value })
                    }
                  />
                </td>
              </tr>
              <tr>
                <th>첨부파일</th>
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
              </tr>
            </tbody>
          </Table>
          <div className="buttonWrap">
            <ButtonGroup>
              <Button
                variant="secondary"
                onClick={() => {
                  navigate(-1);
                }}
              >
                뒤로
              </Button>
              <Button variant="success" onClick={handlerPreviewPost}>
                미리보기
              </Button>
              <Button variant="primary" type="submit">
                등록
              </Button>
            </ButtonGroup>
          </div>
        </Form>
      </div>
    </>
  );
};

export default NewHirePost;
