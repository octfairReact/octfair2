import { useNavigate } from 'react-router-dom';
import { QnaSearchStyled } from './styled';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import { useContext, useEffect, useState } from 'react';
import { QnaContext } from '../../../../api/provider/QnaProvider';
import { pwChkState, requestQnaType } from '../../../../stores/pwChkState';
import { ILoginInfo } from '../../../../models/interface/store/userInfo';
import { loginInfoState } from '../../../../stores/userInfo';
import Button from 'react-bootstrap/Button';

export const QnaSearch = () => {
  const navigate = useNavigate();
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
  const [isPwChecked, setIsPwChecked] = useRecoilState<boolean>(pwChkState);
  const [requestType, setRequestType] = useRecoilState<string>(requestQnaType);
  const [searchValue, setSearchValue] = useState<{
    searchTitle: string;
    searchStDate: string;
    searchEdDate: string;
  }>({
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
    setIsPwChecked(true);
  };

  return (
    <QnaSearchStyled>
      <div className="input-box">
        {userInfo.userType === 'M' ? (
          <>
            <input onChange={(e) => setSearchValue({ ...searchValue, searchTitle: e.target.value })}></input>
            <input
              type="date"
              onChange={(e) => setSearchValue({ ...searchValue, searchStDate: e.target.value })}
            ></input>
            <input
              type="date"
              onChange={(e) => setSearchValue({ ...searchValue, searchEdDate: e.target.value })}
            ></input>
            <Button onClick={handlerSearch}>검색</Button>
          </>
        ) : (
          <>
            <Button onClick={() => setRequestType('my')}>내가 쓴 글</Button>
            <Button style={{ marginLeft: '5px' }} onClick={handlerModal}>
              질문등록
            </Button>
          </>
        )}
      </div>
    </QnaSearchStyled>
  );
};
