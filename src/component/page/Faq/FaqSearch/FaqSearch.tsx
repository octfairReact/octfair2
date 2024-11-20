import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import { useContext, useEffect, useState } from 'react';
import { FaqContext } from '../../../../api/provider/FaqProvider';
import { Button } from 'react-bootstrap';
import { FaqSearchStyled } from './styled';

export const FaqSearch = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [searchValue, setSearchValue] = useState<{
    searchTitle: string;
    searchStDate: string;
    searchEdDate: string;
  }>({
    searchTitle: '',
    searchStDate: '',
    searchEdDate: '',
  });

  const { setSearchKeyWord } = useContext(FaqContext);

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
    <FaqSearchStyled>
      <div className="input-box">
        <input onChange={(e) => setSearchValue({ ...searchValue, searchTitle: e.target.value })}></input>
        <input type="date" onChange={(e) => setSearchValue({ ...searchValue, searchStDate: e.target.value })}></input>
        <input type="date" onChange={(e) => setSearchValue({ ...searchValue, searchEdDate: e.target.value })}></input>
        <Button onClick={handlerSearch}>검색</Button>
        <Button onClick={handlerModal}>등록</Button>
      </div>
    </FaqSearchStyled>
  );
};
