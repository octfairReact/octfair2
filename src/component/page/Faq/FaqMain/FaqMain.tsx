import { useEffect, useState } from 'react';
import { IFaq } from '../../../../models/interface/IFaq';
import { StyledTable, StyledTh } from '../../../common/styled/StyledTable';
import { PageNavigate } from '../../../common/pageNavigation/PageNavigate';

export const FaqMain = () => {
  const [faqList, setFaqList] = useState<IFaq>();
  const [listCount, setListCount] = useState<number>(0);
  const [faqSeq, setFaqSeq] = useState<number>();
};

useEffect(() => {}, []);

const searchFaqList = (currentPage?: number) => {
  currentPage = currentPage || 1;
};

// const searchParam = {
//     ...searchKeyword:{ },};

// return (
//   <>
//     <StyledTable>
//       <thead>
//         <tr>
//           <StyledTh size={5}>번호</StyledTh>
//           <StyledTh size={30}>제목</StyledTh>
//           <StyledTh size={10}>작성자</StyledTh>
//           <StyledTh size={20}>등록일</StyledTh>
//           <StyledTh size={10}>관리</StyledTh>
//         </tr>
//       </thead>
//       <tbody></tbody>
//     </StyledTable>
//     <PageNavigate></PageNavigate>
//   </>
// );
