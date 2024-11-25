import { useContext, useEffect, useState } from "react";
import {
  ScrapMainStyledTable,
  StyledTd,
  StyledTh,
  StyledTitleTd,
} from "./styled";
import { ScrapContext } from "../../../../../api/provider/ScrapProvider";
import { postApi } from "../../../../../api/postApi";
import { Scrap } from "../../../../../api/api";
import {
  IScrap,
  IScrapListResponse,
} from "../../../../../models/interface/IScrap";
import { PageNavigate } from "../../../../common/pageNavigation/PageNavigate";
import { useNavigate } from "react-router-dom";
import { ScrapSearch } from "../ScrapSearch/ScrapSearch";

export const ScrapMain = () => {
  const navigate = useNavigate();
  const [scrapList, setScrapList] = useState<IScrap[]>();
  const [listCount, setListCount] = useState<number>(0);
  const [cPage, setCpage] = useState<number>();
  const { searchKeyWord, setSelectedScrapIdx, selectedScrapIdx } =
    useContext(ScrapContext);

  useEffect(() => {
    searchScrapList();
  }, [searchKeyWord, selectedScrapIdx]);

  const searchScrapList = async (currentPage?: number) => {
    currentPage = currentPage || 1;

    const searchParam = {
      ...searchKeyWord,
      currentPage: currentPage.toString(),
      pageSize: "5",
    };

    const searchList = await postApi<IScrapListResponse>(
      Scrap.getList,
      searchParam
    );

    // console.log(searchList);

    if (searchList) {
      setScrapList(searchList.scrapList);
      setListCount(searchList.scrapCnt);
      setCpage(currentPage);
    }
  };

  // const onScrapDeleteSuccess = async () => {
  //   await searchScrapList();
  // };

  const handleRadioChange = (scrapIdx: number) => {
    setSelectedScrapIdx(scrapIdx); // 선택된 행 업데이트
    console.log(scrapIdx);
  };

  const handlerNavigatePostDetail = (postIdx: number) => {
    navigate(`/react/jobs/post-detail/${postIdx}`);
  };

  return (
    <>
      <p>총 개수:{listCount} </p>
      <ScrapMainStyledTable>
        <thead>
          <tr>
            <StyledTh size={5}> </StyledTh>
            <StyledTh size={10}>기업명</StyledTh>
            <StyledTh size={40}>공고 제목</StyledTh>
            <StyledTh size={10}>자격 요건</StyledTh>
            <StyledTh size={30}>근무지역</StyledTh>
            <StyledTh size={15}>마감일</StyledTh>
            <StyledTh size={10}> </StyledTh>
          </tr>
        </thead>
        <tbody>
          {scrapList?.length > 0 ? (
            scrapList?.map((scrap, index) => {
              return (
                <tr>
                  <StyledTd>
                    <input
                      type="radio"
                      name="scrapSelect"
                      checked={selectedScrapIdx === scrap.scrapIdx}
                      onChange={() => handleRadioChange(scrap.scrapIdx)}
                    />
                  </StyledTd>
                  {scrap.postTitle ? (
                    <>
                      <StyledTd>{scrap.postBizName}</StyledTd>
                      <StyledTitleTd
                        onClick={() => handlerNavigatePostDetail(scrap.postIdx)}
                      >
                        {scrap.postTitle}
                      </StyledTitleTd>
                      <StyledTd>{scrap.postExpRequired}</StyledTd>
                      <StyledTd>{scrap.postWorkLocation}</StyledTd>
                      <StyledTd>{scrap.postEndDate}</StyledTd>
                      <StyledTd>
                        <button>입사지원</button>
                      </StyledTd>
                    </>
                  ) : (
                    <StyledTd colSpan={6}>삭제된 공고입니다.</StyledTd>
                  )}
                </tr>
              );
            })
          ) : (
            <tr>
              <StyledTd colSpan={6}>데이터가 없습니다.</StyledTd>
            </tr>
          )}
        </tbody>
      </ScrapMainStyledTable>
      <PageNavigate
        totalItemsCount={listCount}
        onChange={searchScrapList}
        activePage={cPage}
        itemsCountPerPage={5}
      ></PageNavigate>
    </>
  );
};
