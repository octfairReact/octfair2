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
import { ILoginInfo } from '../../../../models/interface/store/userInfo';
import { loginInfoState } from '../../../../stores/userInfo';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { requestQnaType } from '../../../../stores/pwChkState';

export const QnaMain = () => {
  const [qnaList, setQnaList] = useState<IQna[]>();
  const [listCount, setListCount] = useState<number>(0);
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [qnaSeq, setQnaSeq] = useState<number>();
  const [cPage, setCPage] = useState<number>();
  const { searchKeyWord } = useContext(QnaContext);
  const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
  const [requestType, setRequestType] = useRecoilState<string>(requestQnaType);
  const [selectedQnaType, setSelectedQnaType] = useState<string>(userInfo.userType === 'M' ? 'A' : userInfo.userType);

  useEffect(() => {
    searchQnaList();
  }, [searchKeyWord, selectedQnaType, requestType]);

  const searchQnaList = async (currentPage?: number) => {
    currentPage = currentPage || 1;
    const searchParam = {
      ...searchKeyWord,
      currentPage: currentPage.toString(),
      pageSize: '5',
      qna_type: selectedQnaType,
      requestType: requestType,
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
    setRequestType('all');
  };

  const individual = selectedQnaType === 'A' ? 'active' : 'inactive';
  const biz = selectedQnaType === 'B' ? 'active' : 'inactive';

  return (
    <>
      <ToggleButtonGroup style={{ marginTop: '15px' }} type="radio" name="options">
        <ToggleButton className={`${individual}`} onClick={() => changeQnaType('A')} id="tbg-radio-1" value={1}>
          개인회원
        </ToggleButton>
        <ToggleButton className={`${biz}`} onClick={() => changeQnaType('B')} id="tbg-radio-2" value={2}>
          기업회원
        </ToggleButton>
      </ToggleButtonGroup>

      <StyledTable>
        <thead>
          <tr>
            <StyledTh size={5}>번호</StyledTh>
            <StyledTh size={50}>제목</StyledTh>
            <StyledTh size={10}>작성자</StyledTh>
            <StyledTh size={20}>등록일</StyledTh>
          </tr>
        </thead>
        <tbody>
          {qnaList?.length > 0 ? (
            qnaList.map((qna) => {
              return (
                <tr
                  key={qna.qnaIdx}
                  onClick={() => {
                    handlerModal(qna.qnaIdx);
                  }}
                >
                  <StyledTd>{qna.qnaIdx}</StyledTd>
                  <StyledTd>
                    {qna.title}
                    {qna.ans_content ? (
                      <button
                        type="button"
                        className="btn btn-outline-success  btn-sm"
                        style={{ marginLeft: 7, width: 70, height: 30 }}
                      >
                        답변완료
                      </button>
                    ) : null}
                  </StyledTd>

                  <StyledTd>{qna.author}</StyledTd>
                  <StyledTd>{qna.createdDate.substring(0, 10)}</StyledTd>
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
