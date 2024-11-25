import { useContext, useEffect, useState } from 'react';
import { IQna, IQnaListResponse } from '../../../../models/interface/IQna';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import { postApi } from '../../../../api/postApi';
import { Qna } from '../../../../api/api';
import { QnaContext } from '../../../../api/provider/QnaProvider';
import { StyledTable, StyledTd, StyledTh } from '../../../common/styled/StyledTable';
import { PageNavigate } from '../../../common/pageNavigation/PageNavigate';
import { Portal } from '../../../common/potal/Portal';
import { QnaModal } from '../QnaModal/QnaModal';
import { Button } from 'react-bootstrap';
import { ILoginInfo } from '../../../../models/interface/store/userInfo';
import { loginInfoState } from '../../../../stores/userInfo';

export const QnaMain = () => {
  const [qnaList, setQnaList] = useState<IQna[]>();
  const [listCount, setListCount] = useState<number>(0);
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [qnaSeq, setQnaSeq] = useState<number>();
  const [cPage, setCPage] = useState<number>();
  const { searchKeyWord } = useContext(QnaContext);
  const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
  const [selectedQnaType, setSelectedQnaType] = useState<string>(userInfo.userType === 'M' ? 'A' : userInfo.userType);

  useEffect(() => {
    searchQnaList();
  }, [searchKeyWord, selectedQnaType]);

  const searchQnaList = async (currentPage?: number) => {
    currentPage = currentPage || 1;
    console.log(selectedQnaType);
    const searchParam = {
      ...searchKeyWord,
      currentPage: currentPage.toString(),
      pageSize: '5',
      qna_type: selectedQnaType,
    };

    const searchList = await postApi<IQnaListResponse>(Qna.getListBody, searchParam);

    if (searchList) {
      setQnaList(searchList.qna);
      setListCount(searchList.qnaCnt);
      setCPage(currentPage);
    }
  };

  const handlerModal = (qnaSeq: number) => {
    setModal(!modal);
    setQnaSeq(qnaSeq);
  };

  const onPostSuccess = () => {
    setModal(!modal);
    searchQnaList();
  };

  const changeQnaType = (qna_type: string) => {
    setSelectedQnaType(qna_type);
  };

  return (
    <>
      <div>
        <Button onClick={() => changeQnaType('A')}>개인회원</Button>
        <Button onClick={() => changeQnaType('B')}>기업회원</Button>
      </div>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh size={5}>번호</StyledTh>
            <StyledTh size={35}>제목</StyledTh>
            <StyledTh size={15}>작성자</StyledTh>
            <StyledTh size={15}>등록일</StyledTh>
          </tr>
        </thead>
        <tbody>
          {qnaList?.length > 0 ? (
            qnaList.map((qna) => {
              return (
                <tr
                  key={qna.qnaIdx}
                  onClick={() => {
                    // userInfo.userType === 'M' ? handlerModal(qna.qnaIdx) : ;
                  }}
                >
                  <StyledTd>{qna.qnaIdx}</StyledTd>
                  <StyledTd>{qna.title}</StyledTd>
                  <StyledTd>{qna.author}</StyledTd>
                  <StyledTd>{qna.createdDate}</StyledTd>
                </tr>
              );
            })
          ) : (
            <tr>
              <StyledTd colSpan={3}>데이터가 없습니다.</StyledTd>
            </tr>
          )}
        </tbody>
      </StyledTable>
      <PageNavigate
        totalItemsCount={listCount}
        onChange={searchQnaList}
        activePage={cPage}
        itemsCountPerPage={5}
      ></PageNavigate>
      {modal && (
        <Portal>
          <QnaModal onSuccess={onPostSuccess} qnaSeq={qnaSeq} setQnaSeq={setQnaSeq} />
        </Portal>
      )}
    </>
  );
};
