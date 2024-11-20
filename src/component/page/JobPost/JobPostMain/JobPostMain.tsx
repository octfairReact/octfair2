import { useContext, useEffect, useState } from "react";
import {
  StyledTable,
  StyledTd,
  StyledTh,
} from "../../../common/styled/StyledTable";
import { JobPostContext } from "../../../../api/provider/JobPostProvider";
import {
  IJobPost,
  IJobPostListResponse,
} from "../../../../models/interface/IJobPost";
import { PageNavigate } from "../../../common/pageNavigation/PageNavigate";
import { JobPost } from "../../../../api/api";
import { useNavigate } from "react-router-dom";
import { postApi } from "../../../../api/postApi";

export const JobPostMain = () => {
  const navigate = useNavigate();
  const [jobPostList, setJobPostList] = useState<IJobPost[]>();
  const [listCount, setListCount] = useState<number>(0);
  const [cPage, setCPage] = useState<number>();
  const { searchKeyWord } = useContext(JobPostContext);

  useEffect(() => {
    // console.log("updated searchKeyWord: ", searchKeyWord);
    searchJobPostList();
  }, [searchKeyWord]);

  const searchJobPostList = async (currentPage?: number) => {
    currentPage = currentPage || 1;

    const searchParam = {
      ...searchKeyWord,
      currentPage: currentPage.toString(),
      pageSize: "5",
    };

    // console.log("searchParam: ", searchParam);

    const searchList = await postApi<IJobPostListResponse>(
      JobPost.getList,
      searchParam
    );
    // console.log("API Response:", searchList);

    if (searchList) {
      setJobPostList(searchList.approvalList);
      setListCount(searchList.approvalPostCnt);
      setCPage(currentPage);
    }
  };

  const hanlderDetail = (postIdx: number, bizIdx: number) => {
    navigate(`/react/manage-post/${postIdx}/${bizIdx}`);
  };

  return (
    <>
      <p>
        총 공고 수: {listCount} | 현재 페이지: {cPage}
      </p>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh size={5}>번호</StyledTh>
            <StyledTh size={40}>제목</StyledTh>
            <StyledTh size={15}>근무지역</StyledTh>
            <StyledTh size={10}>경력여부</StyledTh>
            <StyledTh size={10}>마감일</StyledTh>
            <StyledTh size={10}>등록일</StyledTh>
          </tr>
        </thead>
        <tbody>
          {jobPostList?.length > 0 ? (
            jobPostList?.map((jobPost) => {
              return (
                <tr
                  key={jobPost.postIdx}
                  onClick={() => hanlderDetail(jobPost.postIdx, jobPost.bizIdx)}
                >
                  <StyledTd>{jobPost.postIdx}</StyledTd>
                  <StyledTd>{jobPost.title}</StyledTd>
                  <StyledTd>{jobPost.workLocation}</StyledTd>
                  <StyledTd>{jobPost.expRequired}</StyledTd>
                  <StyledTd>{jobPost.endDate}</StyledTd>
                  <StyledTd>{jobPost.postDate}</StyledTd>
                </tr>
              );
            })
          ) : (
            <tr>
              <StyledTd colSpan={6}>데이터가 없습니다.</StyledTd>
            </tr>
          )}
        </tbody>
      </StyledTable>
      <PageNavigate
        totalItemsCount={listCount}
        onChange={searchJobPostList}
        activePage={cPage}
        itemsCountPerPage={5}
      ></PageNavigate>
    </>
  );
};
