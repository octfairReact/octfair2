import { useNavigate } from 'react-router-dom';
import { QnaSearchStyled } from './styled';

export const QnaSearch = () => {
  const navigate = useNavigate();
  return (
    <QnaSearchStyled>
      <div className="input-box"></div>
    </QnaSearchStyled>
  );
};
