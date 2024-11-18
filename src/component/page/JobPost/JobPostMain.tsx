import { useContext, useEffect, useState } from "react";
import {
  StyledTable,
  StyledTd,
  StyledTh,
} from "../../common/styled/StyledTable";
import { JobPostContext } from "../../../api/provider/JobPostProvider";
import { IJobPost } from "../../../models/IJobPost";
import { postNoticeApi } from "../../../api/postNoticeApi";

export const JobPostMain = () => {
  const [jobPostList, setJobPostList] = useState<IJobPost[]>();
  const [listCount, setListCount] = useState<number>(0);

  const { searchKeyWord } = useContext(JobPostContext);

  useEffect(() => {
    searchJobPostList();
  }, [searchKeyWord]);

  const searchJobPostList = async (currentPage?: number) => {
    currentPage = currentPage || 1;

    const searchParam = {
      ...searchKeyWord,
      currentPage: currentPage.toString(),
      pageSize: "5",
    };

    // const searchList = await postNoticeApi<INoticeListResponse>(
    //   JobPost.getList
    //   searchParam
    // );
    // if (searchList) {
    //   setJobPostList(searchList.);
    //   setListCount(searchList.);
    //   setCPage(currentPage);
    // }
  };

  return (
    <>
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
                  //  todo : 클릭시 post detail 연결
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
              <StyledTd colSpan={3}>데이터가 없습니다.</StyledTd>
            </tr>
          )}
        </tbody>
      </StyledTable>
    </>
  );
};
