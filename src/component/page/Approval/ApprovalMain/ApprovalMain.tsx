import { useContext, useEffect, useState } from "react";
import {
  StyledTable,
  StyledTd,
  StyledTh,
} from "../../../common/styled/StyledTable";
import { PostContext } from "../../../../api/provider/PostProvider";
import { IPost, IPostListResponse } from "../../../../models/interface/IPost";
import { PageNavigate } from "../../../common/pageNavigation/PageNavigate";
import { Post } from "../../../../api/api";
import { useNavigate } from "react-router-dom";
import { postApi } from "../../../../api/postApi";
import {
  IManagePost,
  IManagePostListResponse,
} from "../../../../models/interface/IManagePost";

const ApprovalMain = () => {
  const navigate = useNavigate();
  const [managePostList, setManagePostList] = useState<IManagePost[]>();
  const [listCount, setListCount] = useState<number>(0);
  const [cPage, setCPage] = useState<number>();
  const { searchKeyWord } = useContext(PostContext);

  useEffect(() => {
    // console.log("updated searchKeyWord: ", searchKeyWord);
    searchManagePostList();
  }, [searchKeyWord]);

  const searchManagePostList = async (currentPage?: number) => {
    currentPage = currentPage || 1;

    const searchParam = {
      ...searchKeyWord,
      currentPage: currentPage.toString(),
      pageSize: "5",
    };

    // console.log("searchParam: ", searchParam);

    const searchList = await postApi<IManagePostListResponse>(
      "/api/manage-post/readPostList.do",
      searchParam
    );
    console.log("manage-post API Response:", searchList);

    if (searchList) {
      setManagePostList(searchList.pendingList);
      setListCount(searchList.pendingPostCnt);
      setCPage(currentPage);
    }
  };

  const hanlderDetail = (postIdx: number) => {
    // console.log("hanlderDetail");
    // navigate(`/react/jobs/postDetail/${postIdx}`);
    navigate(`/react/jobs/post-detail/${postIdx}`);
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
            <StyledTh size={35}>제목</StyledTh>
            <StyledTh size={15}>근무지역</StyledTh>
            <StyledTh size={5}>경력여부</StyledTh>
            <StyledTh size={10}>마감일</StyledTh>
            <StyledTh size={10}>등록일</StyledTh>
            <StyledTh size={10}>승인여부</StyledTh>
          </tr>
        </thead>
        <tbody>
          {managePostList?.length > 0 ? (
            managePostList?.map((pendingPost) => {
              return (
                <tr
                  key={pendingPost.postIdx}
                  onClick={() => hanlderDetail(pendingPost.postIdx)}
                >
                  <StyledTd>{pendingPost.postIdx}</StyledTd>
                  <StyledTd>{pendingPost.title}</StyledTd>
                  <StyledTd>{pendingPost.workLocation}</StyledTd>
                  <StyledTd>{pendingPost.expRequired}</StyledTd>
                  <StyledTd>{pendingPost.endDate}</StyledTd>
                  <StyledTd>{pendingPost.postDate}</StyledTd>
                  <StyledTd>{pendingPost.appStatus}</StyledTd>
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
        onChange={searchManagePostList}
        activePage={cPage}
        itemsCountPerPage={5}
      ></PageNavigate>
    </>
  );
};

export default ApprovalMain;
