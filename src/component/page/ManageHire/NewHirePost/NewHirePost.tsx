import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";

const NewHirePost = () => {
  const [isExperienced, setIsExperienced] = useState(false);
  const [experienceYears, setExperienceYears] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
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

  const handlerSavePost = () => {};

  const handlerPreviewPost = () => {};

  return (
    <div>
      <ContentBox>채용공고 등록</ContentBox>
      <div className="mt-5"></div>
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
                required
              />
            </td>
          </tr>
          <tr>
            <th>
              경력 여부 <span className="font_red">*</span>
            </th>
            <td>
              <Form.Check
                inline
                label="신입"
                type="radio"
                name="experience"
                onChange={() => setIsExperienced(false)}
              />
              <Form.Check
                inline
                label="경력"
                type="radio"
                name="experience"
                onChange={() => setIsExperienced(true)}
              />
              <Form.Check
                inline
                label="경력 무관"
                type="radio"
                name="experience"
                onChange={() => setIsExperienced(false)}
              />
            </td>
            <th>
              경력 <span className="font_red">*</span>
            </th>
            <td>
              <Form.Select
                disabled={!isExperienced}
                value={experienceYears}
                onChange={(e) => setExperienceYears(e.target.value)}
              >
                <option>경력을 선택하세요</option>
                <option value="1">1년 이상</option>
                <option value="3">3년 이상</option>
                <option value="5">5년 이상</option>
                <option value="10">10년 이상</option>
              </Form.Select>
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
              />
            </td>
            <th>
              모집 인원 <span className="font_red">*</span>
            </th>
            <td>
              <Form.Control
                type="text"
                placeholder="모집 인원을 입력하세요"
                required
              />
            </td>
          </tr>
          <tr>
            <th>
              근무 지역 <span className="font_red">*</span>
            </th>
            <td>
              <Form.Control type="text" placeholder="근무 지역을 입력하세요" />
            </td>
            <th>
              포지션 설명 <span className="font_red">*</span>
            </th>
            <td>
              <Form.Control
                type="text"
                placeholder="포지션에 대한 설명을 입력하세요"
              />
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
                      className="form-control"
                      dateFormat="yyyy년 MM월 dd일"
                      withPortal
                      minDate={new Date()}
                    />
                  </Col>
                  <Col sm={5}>
                    <DatePicker
                      selected={endDate}
                      onChange={(date: Date) => setEndDate(date)}
                      placeholderText="종료 날짜 선택 ( 최소 게시기간 : 한달 )"
                      className="form-control"
                      dateFormat="yyyy년 MM월 dd일"
                      withPortal
                      minDate={getMinEndDate(startDate)}
                      disabled={!startDate}
                    />
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
                <Form.Control type="text" placeholder="과정을 입력하세요" />
                <Button variant="outline-primary">절차 등록</Button>
                <Button variant="outline-secondary">절차 초기화</Button>
              </InputGroup>
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
              />
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
              />
            </td>
          </tr>
          <tr>
            <th>우대 사항</th>
            <td colSpan={3}>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="우대 사항 입력"
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
              />
            </td>
          </tr>
          <tr>
            <th>첨부파일</th>
            <td colSpan={3}>
              <Form.Label className="d-flex justify-content-start text-muted">채용공고 이미지 486 * 300 px</Form.Label>
              <Form.Control type="file" />
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
          <Button variant="primary" onClick={handlerSavePost}>
            등록
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default NewHirePost;
