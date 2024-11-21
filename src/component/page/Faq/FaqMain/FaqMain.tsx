import React, { useContext, useEffect, useState } from 'react';
import { IFaq, IFaqListResponse } from '../../../../models/interface/IFaq';
import { StyledTable, StyledTd, StyledTh } from '../../../common/styled/StyledTable';
import { PageNavigate } from '../../../common/pageNavigation/PageNavigate';
import { FaqContext } from '../../../../api/provider/FaqProvider';
import { Faq } from '../../../../api/api';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import { Portal } from '../../../common/potal/Portal';
import { FaqModal } from '../FaqModal/FaqModal';
import { Button } from 'react-bootstrap';
import { postApi } from '../../../../api/postApi';

export const FaqMain = () => {
  const [faqList, setFaqList] = useState<IFaq[]>();
  const [listCount, setListCount] = useState<number>(0);
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [faqSeq, setFaqSeq] = useState<number>();
  const [cPage, setCPage] = useState<number>();
  const { searchKeyWord } = useContext(FaqContext);
  const [activeFaq, setActiveFaq] = useState<number>();

  useEffect(() => {
    searchFaqList();
  }, [searchKeyWord]);

  const searchFaqList = async (currentPage?: number) => {
    currentPage = currentPage || 1;

    const searchParam = {
      ...searchKeyWord,
      currentPage: currentPage.toString(),
      pageSize: '5',
    };

    const searchList = await postApi<IFaqListResponse>(Faq.getListBody, searchParam);

    if (searchList) {
      setFaqList(searchList.faq);
      setListCount(searchList.faqCnt);
      setCPage(currentPage);
    }
  };

  const handlerModal = (faqSeq: number) => {
    setModal(!modal);
    setFaqSeq(faqSeq);
  };

  const onPostSuccess = () => {
    setModal(!modal);
    searchFaqList();
  };

  const handlerShowContent = (faq_idx) => {
    setActiveFaq((prevFaq) => (prevFaq === faq_idx ? null : faq_idx));
  };

  return (
    <>
      <div>
        <Button>개인회원</Button>
        <Button>기업회원</Button>
      </div>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh size={5}>번호</StyledTh>
            <StyledTh size={35}>제목</StyledTh>
            <StyledTh size={10}>작성자</StyledTh>
            <StyledTh size={10}>등록일</StyledTh>
            <StyledTh size={10}>관리</StyledTh>
          </tr>
        </thead>
        <tbody>
          {faqList?.length > 0 ? (
            faqList?.map((faq) => {
              return (
                <>
                  <tr key={faq.faq_idx}>
                    <StyledTd>{faq.faq_idx}</StyledTd>
                    <StyledTd onClick={() => handlerShowContent(faq.faq_idx)}>{faq.title}</StyledTd>
                    <StyledTd>{faq.author}</StyledTd>
                    <StyledTd>{faq.created_date}</StyledTd>
                    <StyledTd onClick={() => handlerModal(faq.faq_idx)}>관리</StyledTd>
                  </tr>
                  <tr>
                    <StyledTd colSpan={5} style={{ display: 'none' }}>
                      영광오리탕
                    </StyledTd>
                  </tr>
                </>
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
        onChange={searchFaqList}
        activePage={cPage}
        itemsCountPerPage={5}
      ></PageNavigate>
      {modal && (
        <Portal>
          <FaqModal onSuccess={onPostSuccess} faqSeq={faqSeq} setFaqSeq={setFaqSeq} />
        </Portal>
      )}
    </>
  );
};
