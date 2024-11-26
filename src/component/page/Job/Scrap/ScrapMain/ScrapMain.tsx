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
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { Portal } from "../../../../common/potal/Portal";
import { ResumeModalApplication } from "../../../Resume/ResumeModal/ResumeModalApplication";

export const ScrapMain = () => {
  const navigate = useNavigate();
  const [scrapList, setScrapList] = useState<IScrap[]>();
  const [listCount, setListCount] = useState<number>(0);
  const [cPage, setCpage] = useState<number>();
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [selectedScrap, setSelectedScrap] = useState<IScrap>();

  // const { searchKeyWord, setSelectedScrapIdx, selectedScrapIdx } =
  const { searchKeyWord, setSelectedScrapIdxList, selectedScrapIdxList } =
    useContext(ScrapContext);

  useEffect(() => {
    searchScrapList();
    // }, [searchKeyWord, selectedScrapIdx]);
  }, [searchKeyWord, selectedScrapIdxList]);

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

    console.log("searchscraplist : ", searchList);

    if (searchList) {
      setScrapList(searchList.scrapList);
      setListCount(searchList.scrapCnt);
      setCpage(currentPage);
    }
  };

  const handlerCheckboxChange = (scrapIdx: number) => {
    setSelectedScrapIdxList(
      (prev) =>
        prev.includes(scrapIdx)
          ? prev.filter((idx) => idx !== scrapIdx) // 이미 선택된 경우 해제
          : [...prev, scrapIdx] // 선택되지 않은 경우 배열에 추가
    );
  };

  const handlerSelectAllCheckbox = () => {
    if (selectedScrapIdxList.length === scrapList.length) {
      setSelectedScrapIdxList([]); // 전체 해제
    } else {
      setSelectedScrapIdxList(scrapList?.map((scrap) => scrap.scrapIdx) || []); // 전체 선택
    }
  };

  // const handlerRadioChange = (scrapIdx: number) => {
  //   setSelectedScrapIdx(scrapIdx); // 선택된 행 업데이트
  //   console.log(scrapIdx);
  // };

  const handlerNavigatePostDetail = (postIdx: number) => {
    navigate(`/react/jobs/post-detail/${postIdx}`);
  };

  const handlerModal = (scrap) => {
    setModal(!modal);
    setSelectedScrap(scrap);
    console.log(scrap);
  };

  const onPostSuccess = () => {
    setModal(!modal);
    searchScrapList();
  };

  return (
    <>
      <p>총 개수:{listCount} </p>
      <ScrapMainStyledTable>
        <thead>
          <tr>
            <StyledTh size={5}>
              <input
                type="checkbox"
                onChange={handlerSelectAllCheckbox}
                checked={
                  // 체크된게 전체 길이와 같은지 (on/off) + 존재하는지 체크
                  selectedScrapIdxList.length === scrapList?.length &&
                  scrapList?.length > 0
                }
              />
            </StyledTh>
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
            scrapList?.map((scrap) => {
              return (
                <tr>
                  <StyledTd>
                    {/* 라디오버튼 */}
                    {/* <input
                      type="radio"
                      name="scrapSelect"
                      checked={selectedScrapIdx === scrap.scrapIdx}
                      onChange={() => handlerRadioChange(scrap.scrapIdx)}
                    /> */}

                    {/* 체크박스 */}
                    <input
                      type="checkbox"
                      name="scrapSelect"
                      onChange={() => handlerCheckboxChange(scrap.scrapIdx)}
                      checked={selectedScrapIdxList.includes(scrap.scrapIdx)}
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
                        <button onClick={() => handlerModal(scrap)}>
                          입사지원
                        </button>
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
      {modal && (
        <Portal>
          <ResumeModalApplication
            onSuccess={onPostSuccess}
            scrap={selectedScrap}
            post={null}
            biz={null}
          />
        </Portal>
      )}
    </>
  );
};
