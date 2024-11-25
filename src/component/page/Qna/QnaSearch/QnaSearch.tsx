import { useNavigate } from 'react-router-dom';
import { QnaSearchStyled } from './styled';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import { useContext, useEffect, useState } from 'react';
import { QnaContext } from '../../../../api/provider/QnaProvider';
import { Button } from '../../../common/Button/Button';

export const QnaSearch = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [searchValue, setSearchValue] = useState<{ searchTitle: string; searchStDate: string; searchEdDate: string }>({
    searchTitle: '',
    searchStDate: '',
    searchEdDate: '',
  });

  const { setSearchKeyWord } = useContext(QnaContext);

  useEffect(() => {
    window.location.search && navigate(window.location.pathname, { replace: true });
  }, [navigate]);

  const handlerSearch = () => {
    setSearchKeyWord(searchValue);
  };
  const handlerModal = () => {
    setModal(!modal);
  };

  return (
    <QnaSearchStyled>
      <div className="input-box">
        <input onChange={(e) => setSearchValue({ ...searchValue, searchTitle: e.target.value })}></input>
        <input type="date" onChange={(e) => setSearchValue({ ...searchValue, searchStDate: e.target.value })}></input>
        <input type="date" onChange={(e) => setSearchValue({ ...searchValue, searchEdDate: e.target.value })}></input>
        <Button onClick={handlerSearch}>검색</Button>
        <Button onClick={handlerModal}>질문등록</Button>
      </div>
    </QnaSearchStyled>
  );
};
