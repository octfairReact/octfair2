import Button from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";
import { Form, InputGroup, Stack } from "react-bootstrap";

const HirePostSearch = () => {

  return (
    <Stack direction="horizontal" gap={2} className="me-3">
      <Form.Select className="w-50">
        <option>공고 상태 선택</option>
        <option value={1}>현재 진행 중</option>
        <option value={2}>마감 완료</option>
        <option value={3}>예정됨</option>
      </Form.Select>
    
      <InputGroup>
        <Form.Control placeholder="제목을 입력하세요" />
        <Button variant="primary" id="button-addon2">
          검색
        </Button>
      </InputGroup>
    </Stack>
  );
};

export default HirePostSearch;
