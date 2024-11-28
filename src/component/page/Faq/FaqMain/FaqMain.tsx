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
import { ShowContentStyled } from './styled';
import { ILoginInfo } from '../../../../models/interface/store/userInfo';
import { loginInfoState } from '../../../../stores/userInfo';

export const FaqMain = () => {
  const [faqList, setFaqList] = useState<IFaq[]>();
  const [listCount, setListCount] = useState<number>(0);
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [faqSeq, setFaqSeq] = useState<number>();
  const [cPage, setCPage] = useState<number>();
  const { searchKeyWord } = useContext(FaqContext);
  const [style, setStyle] = useState<number>(null);
  const [selectedFaqType, setSelectedFaqType] = useState<string>();
  const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);

  useEffect(() => {
    searchFaqList();
  }, [searchKeyWord, selectedFaqType]);

  const searchFaqList = async (currentPage?: number) => {
    currentPage = currentPage || 1;

    const searchParam = {
      ...searchKeyWord,
      currentPage: currentPage.toString(),
      pageSize: '5',
      faq_type: selectedFaqType,
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
    setStyle((style) => (style === faq_idx ? null : faq_idx));
  };

  const changeFaqType = (faq_type: string) => {
    setSelectedFaqType(faq_type);
  };

  const individual = selectedFaqType === '1' ? 'active' : 'inactive';
  const biz = selectedFaqType === '2' ? 'active' : 'inactive';

  return (
    <>
      <div style={{ display: 'inline-block' }}>
        <Button className={`${individual}`} onClick={() => changeFaqType('1')}>
          개인회원
        </Button>
        &nbsp;
        <Button className={`${biz}`} onClick={() => changeFaqType('2')}>
          기업회원
        </Button>
      </div>
      <StyledTable>
        <ShowContentStyled>
          <thead>
            <tr>
              <StyledTh size={5}>번호</StyledTh>
              <StyledTh size={35}>제목</StyledTh>
              <StyledTh size={10}>작성자</StyledTh>
              <StyledTh size={10}>등록일</StyledTh>
              {userInfo.userType === 'M' ? <StyledTh size={10}>관리</StyledTh> : null}
            </tr>
          </thead>
          {faqList?.length > 0 ? (
            faqList?.map((faq) => {
              return (
                <tbody key={faq.faq_idx}>
                  <tr>
                    <StyledTd>{faq.faq_idx}</StyledTd>
                    <StyledTd onClick={() => handlerShowContent(faq.faq_idx)}>{faq.title}</StyledTd>
                    <StyledTd>{faq.author}</StyledTd>
                    <StyledTd>{faq.created_date}</StyledTd>
                    {userInfo.userType === 'M' && (
                      <StyledTd onClick={() => handlerModal(faq.faq_idx)}>
                        <button type="button" className="btn btn-secondary">
                          관리
                        </button>
                      </StyledTd>
                    )}
                  </tr>
                  <tr className={style === faq.faq_idx ? 'show' : 'hide'} style={{ color: 'gray' }}>
                    <StyledTd colSpan={5}>{faq.content}</StyledTd>
                  </tr>
                </tbody>
              );
            })
          ) : (
            <tr>
              <StyledTd colSpan={3}>데이터가 없습니다.</StyledTd>
            </tr>
          )}
        </ShowContentStyled>
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
