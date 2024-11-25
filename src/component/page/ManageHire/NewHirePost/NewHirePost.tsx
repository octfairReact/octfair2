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
import { boolean } from "zod";

const NewHirePost = () => {
  const [formData, setFormData] = useState<IPostDetail>({} as IPostDetail);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [validated, setValidated] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string>();
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
    // 필수 필드 배열
    const requiredFields = [
      "title",
      "salary",
      "openings",
      "workLocation",
      "posDescription",
      "reqQualifications",
      "duties",
      "hirProcess",
    ];

    const areFieldsValid = requiredFields.every(
      (field) => !!formData[field as keyof typeof formData]
    );

    // 시작 날짜와 종료 날짜 확인
    if (!areFieldsValid || !startDate || !endDate) {
      return false;
    }

    return true;
  };

  const handleValidation = (event: React.FormEvent<HTMLFormElement>) => {
    setFormData((prev) => ({
      ...prev,
      startDate: startDate?.toString(),
      endDate: endDate?.toString(),
    }));

    event.preventDefault();

    if (validateForm()) {
      setValidated(true);
      console.log("폼 데이터:", formData);
    } else {
      setValidated(true);
      console.log("폼 데이터:", formData);
      console.log(validated);
      console.log(Boolean(formData.hirProcess));
      console.log(validated && Boolean(formData.hirProcess));
      console.log(validated && formData.hirProcess?.trim());
      alert("필수 항목을 모두 입력 해주세요.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const validTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];

      if (!validTypes.includes(file.type)) {
        alert("올바른 이미지 파일을 업로드해주세요.");
        fileInputRef.current.value = "";
        return false;
      } else {
        setImageUrl(URL.createObjectURL(file));
      }
    }
  };

  const handleHiringProc = () => {
    if (currentProc.trim() === "") {
      alert("과정을 입력해주세요!");
      return;
    }

    setFormData((prev) => ({
      ...prev,
      hirProcess: prev.hirProcess
        ? `${prev.hirProcess} -> ${currentProc}`
        : currentProc,
    }));

    setCurrentProc("");
  };

  const resetHiringProc = () => {
    setFormData((prev) => ({
      ...prev,
      hirProcess: "",
    }));
  };

  const handleImageRemove = () => {
    fileInputRef.current.value = "";
    setImageUrl("");
  };

  const handlerPreviewPost = () => {};

  return (
    <div>
      <ContentBox>채용공고 등록</ContentBox>
      <div className="mt-5"></div>
      <Form noValidate validated={validated} onSubmit={handleValidation}>
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
                  value={formData.title}
                  required
                  isInvalid={validated && !formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  채용 제목을 입력해주세요.
                </Form.Control.Feedback>
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
                  required
                  isInvalid={validated && !formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  급여를 입력해주세요.
                </Form.Control.Feedback>
              </td>
              <th>
                모집 인원 <span className="font_red">*</span>
              </th>
              <td>
                <Form.Control
                  type="text"
                  placeholder="모집 인원을 입력하세요"
                  required
                  isInvalid={validated && !formData.openings}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      openings: e.target.value,
                    })
                  }
                />
                <Form.Control.Feedback type="invalid">
                  모집 인원을 입력해주세요.
                </Form.Control.Feedback>
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
                  isInvalid={validated && !formData.workLocation}
                  onChange={(e) =>
                    setFormData({ ...formData, workLocation: e.target.value })
                  }
                  required
                />
                <Form.Control.Feedback type="invalid">
                  근무 지역을 입력해주세요.
                </Form.Control.Feedback>
              </td>
              <th>
                포지션 설명 <span className="font_red">*</span>
              </th>
              <td>
                <Form.Control
                  type="text"
                  placeholder="포지션에 대한 설명을 입력하세요"
                  isInvalid={validated && !formData.posDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, posDescription: e.target.value })
                  }
                  required
                />
                <Form.Control.Feedback type="invalid">
                  포지션에 대한 설명을 입력해주세요.
                </Form.Control.Feedback>
              </td>
            </tr>
            <tr>
              <th>
                채용 기간 <span className="font_red">*</span>
              </th>
              <td colSpan={3}>
                <Container>
                  <Row>
                    <Col sm={5}>
                      <DatePicker
                        selected={startDate}
                        onChange={(date: Date) => setStartDate(date)}
                        placeholderText="시작 날짜 선택"
                        dateFormat="yyyy년 MM월 dd일"
                        withPortal
                        minDate={new Date()}
                        className={`form-control ${
                          validated && !startDate ? "is-invalid" : ""
                        }`}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        시작 날짜를 선택해주세요.
                      </Form.Control.Feedback>
                    </Col>
                    <Col sm={5}>
                      <DatePicker
                        selected={endDate}
                        onChange={(date: Date) => setEndDate(date)}
                        placeholderText="종료 날짜 선택 ( 최소 게시기간 : 한달 )"
                        className={`form-control ${
                          validated && !endDate ? "is-invalid" : ""
                        }`}
                        dateFormat="yyyy년 MM월 dd일"
                        withPortal
                        minDate={getMinEndDate(startDate)}
                        disabled={!startDate}
                        required
                      />
                      <Form.Control.Feedback type="invalid">
                        마감 날짜를 선택해주세요.
                      </Form.Control.Feedback>
                    </Col>
                    <Col>
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
                    type="text"
                    placeholder="과정을 입력하세요"
                    value={currentProc}
                    onChange={(e) => setCurrentProc(e.target.value)}
                    className={`form-control ${validated && !formData.hirProcess?.trim() ? "is-invalid" : ""}`}
                    required
                  />
                  <Button variant="outline-primary" onClick={handleHiringProc}>
                    절차 등록
                  </Button>
                  <Button variant="outline-secondary" onClick={resetHiringProc}>
                    절차 초기화
                  </Button>
                </InputGroup>
                <Form.Label className="py-1 d-flex justify-content-start">
                  {formData.hirProcess}
                </Form.Label>
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
                  isInvalid={validated && !formData.reqQualifications}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      reqQualifications: e.target.value,
                    })
                  }
                  required
                />
                <Form.Control.Feedback type="invalid">
                  자격 조건을 입력해주세요.
                </Form.Control.Feedback>
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
                  placeholder="업무 내용 입력"
                  isInvalid={validated && !formData.duties}
                  onChange={(e) =>
                    setFormData({ ...formData, duties: e.target.value })
                  }
                  required
                />
                <Form.Control.Feedback type="invalid">
                  업무 내용을 입력해주세요.
                </Form.Control.Feedback>
              </td>
            </tr>
            <tr>
              <th>우대 사항</th>
              <td colSpan={3}>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="우대 사항 입력"
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
                  as="textarea"
                  rows={3}
                  placeholder="혜택 및 복지 내용 입력"
                  onChange={(e) =>
                    setFormData({ ...formData, benefits: e.target.value })
                  }
                />
              </td>
            </tr>
            <tr>
              <th>첨부파일</th>
              <td colSpan={3}>
                <Form.Label className="d-flex justify-content-start text-muted">
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
                  <div></div>
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
  );
};

export default NewHirePost;
