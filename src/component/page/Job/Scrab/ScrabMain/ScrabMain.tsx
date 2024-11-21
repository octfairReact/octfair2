import { StyledTable, StyledTh } from "../../../../common/styled/StyledTable";

export const ScrabMain = () => {
  return (
    <>
      <p>총 개수: </p>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh size={5}> </StyledTh>
            <StyledTh size={10}>기업명</StyledTh>
            <StyledTh size={40}>공고 제목</StyledTh>
            <StyledTh size={10}>자격 요건</StyledTh>
            <StyledTh size={15}>근무지역</StyledTh>
            <StyledTh size={30}>마감일</StyledTh>
            <StyledTh size={10}> </StyledTh>
          </tr>
        </thead>
      </StyledTable>
    </>
  );
};
