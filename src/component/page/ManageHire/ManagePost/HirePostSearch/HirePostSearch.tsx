import Button from "react-bootstrap/Button";
import "react-datepicker/dist/react-datepicker.css";
import { Form, InputGroup, Stack } from "react-bootstrap";
import { useEffect, useState } from "react";

const HirePostSearch = ({ onSearch }: { onSearch: (selectStatus: string, keyword: string) => void }) => {
  const [selectStatus, setSelectStatus] = useState<string>("all");
  const [keyword, setKeyword] = useState<string>("");

  
  useEffect(() => {
    console.log(selectStatus);
  }, [selectStatus]);

  const handlerSearch = () => {
    onSearch(selectStatus,keyword);
    setKeyword("");
  };

  return (
    <Stack direction="horizontal" gap={2} className="me-3">
      <Form.Select
        className="w-50"
        value={selectStatus ?? ""}
        onChange={(e) => {
          setSelectStatus(e.target.value);
        }}
      >
        <option value={"all"}>공고 상태 선택</option>
        <option value={1}>현재 진행 중</option>
        <option value={2}>마감 완료</option>
        <option value={3}>예정됨</option>
      </Form.Select>

      <InputGroup>
        <Form.Control
          placeholder="제목을 입력하세요"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <Button variant="primary" onClick={handlerSearch}>
          검색
        </Button>
      </InputGroup>
    </Stack>
  );
};

export default HirePostSearch;
