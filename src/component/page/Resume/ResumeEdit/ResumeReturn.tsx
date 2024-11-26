import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from "react-router-dom";
import { ResumeAddStyled } from "./styled";

export const ResumeReturn = () => {
  const navigate = useNavigate();
  
  const handlerReturnToList = () => {
    navigate('/react/apply/resume.do');
  };

  return (
    <ResumeAddStyled>
      <div className="input-box">
        <Button variant="primary" onClick={handlerReturnToList}>
          목록으로
        </Button>
      </div>
    </ResumeAddStyled>
  );
};
