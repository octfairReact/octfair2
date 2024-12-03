import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { ResumeAddStyled } from "./styled";
import Button from 'react-bootstrap/Button';

export const ResumeAdd = () => {
  const navigate = useNavigate();

  const handlerAdd = () => {
    navigate('/react/apply/resumeDetail.do', { state: { idx: '' } });
  };

  return (
    <ResumeAddStyled>
      <div className="input-box">
        <Button variant="primary" onClick={handlerAdd}>
          새 이력서 작성
        </Button>
      </div>
    </ResumeAddStyled>
  );
};
