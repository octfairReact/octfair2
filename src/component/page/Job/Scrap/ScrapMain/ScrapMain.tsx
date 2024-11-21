import { useContext, useEffect, useState } from "react";
import { StyledTable, StyledTh } from "../../../../common/styled/StyledTable";
import { ScrapContext } from "../../../../../api/provider/ScrapProvider";
import { postApi } from "../../../../../api/postApi";
import { Scrap } from "../../../../../api/api";

export const ScrapMain = () => {
  const [scrabList, setScrabList] = useState();
  const [listCount, setListCount] = useState<number>(0);
  const [cPage, setCpage] = useState<number>();
  const { searchKeyWord } = useContext(ScrapContext);

  useEffect(() => {
    searchScrabList();
  }, [searchKeyWord]);

  const searchScrabList = async (currentPage?: number) => {
    currentPage = currentPage || 1;

    const searchParam = {
      ...searchKeyWord,
      currentPage: currentPage.toString(),
      pageSize: "5",
    };

    const searchList = await postApi(Scrap.getList, searchParam);

    console.log(searchList);

    if (searchList) {
    }
  };

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
        <tbody></tbody>
      </StyledTable>
    </>
  );
};
