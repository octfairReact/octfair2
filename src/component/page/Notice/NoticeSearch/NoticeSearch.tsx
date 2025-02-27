import { NoticeSearchStyled } from './styled';
import Button from 'react-bootstrap/Button';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import { NoticeContext } from '../../../../api/provider/NoticeProvider';
import { ILoginInfo } from '../../../../models/interface/store/userInfo';
import { loginInfoState } from '../../../../stores/userInfo';

export const NoticeSearch = () => {
  // const title = useRef<HTMLInputElement>();
  // const [startDate, setStartDate] = useState<string>();
  // const [endDate, setEndDate] = useState<string>();
  const navigate = useNavigate();
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
  const [searchValue, setSearchValue] = useState<{
    searchTitle: string;
    searchStDate: string;
    searchEdDate: string;
  }>({
    searchTitle: '',
    searchStDate: '',
    searchEdDate: '',
  });

  const { setSearchKeyWord } = useContext(NoticeContext);

  useEffect(() => {
    window.location.search && navigate(window.location.pathname, { replace: true });
  }, [navigate]);

  // const handlerSearch = () => {
  //   const query: string[] = [];

  //   !title.current.value || query.push(`searchTitle=${title.current.value}`);
  //   !startDate || query.push(`searchStDate=${startDate}`);
  //   !endDate || query.push(`searchEdDate=${endDate}`);

  //   const queryString = query.length > 0 ? `?${query.join("&")}` : "";
  //   navigate(`/react/board/notice.do${queryString}`);
  // };

  const handlerSearch = () => {
    setSearchKeyWord(searchValue);
  };

  const handlerModal = () => {
    setModal(!modal);
  };

  return (
    <NoticeSearchStyled>
      <div className="input-box">
        <input onChange={(e) => setSearchValue({ ...searchValue, searchTitle: e.target.value })}></input>
        <input type="date" onChange={(e) => setSearchValue({ ...searchValue, searchStDate: e.target.value })}></input>
        <input type="date" onChange={(e) => setSearchValue({ ...searchValue, searchEdDate: e.target.value })}></input>
        <Button onClick={handlerSearch}>검색</Button>&nbsp;
        {userInfo.userType === 'M' ? <Button onClick={handlerModal}>등록</Button> : null}
      </div>
    </NoticeSearchStyled>
  );
};
