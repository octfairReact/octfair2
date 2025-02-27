import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ManagePostContext } from "../../../../api/provider/ManagePostProvider";
import { postApi } from "../../../../api/postApi";
import {
  IManagePost,
  IManagePostListResponse,
} from "../../../../models/interface/IManagePost";
import {
  StyledTable,
  StyledTd,
  StyledTh,
} from "../../../common/styled/StyledTable";
import { PageNavigate } from "../../../common/pageNavigation/PageNavigate";

export const ManagePostMain = () => {
  const navigate = useNavigate();
  const [managePostList, setManagePostList] = useState<IManagePost[]>();
  const [listCount, setListCount] = useState<number>(0);
  const [cPage, setCPage] = useState<number>();
  const { searchKeyWord } = useContext(ManagePostContext);

  useEffect(() => {
    searchManagePostList();
  }, [searchKeyWord]);

  const searchManagePostList = async (currentPage?: number) => {
    currentPage = currentPage || 1;

    const searchParam = {
      ...searchKeyWord,
      currentPage: currentPage.toString(),
      pageSize: "5",
    };

    const searchList = await postApi<IManagePostListResponse>(
      "/api/manage-post/readPostList.do",
      searchParam
    );

    if (searchList) {
      setManagePostList(searchList.approvalList);
      setListCount(searchList.approvalPostCnt);
      setCPage(currentPage);
    }
  };

  const hanlderDetail = (postIdx: number) => {
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
            <StyledTh size={40}>제목</StyledTh>
            <StyledTh size={15}>근무지역</StyledTh>
            <StyledTh size={10}>경력여부</StyledTh>
            <StyledTh size={10}>마감일</StyledTh>
            <StyledTh size={10}>등록일</StyledTh>
            <StyledTh size={5}>승인여부</StyledTh>
          </tr>
        </thead>
        <tbody>
          {managePostList?.length > 0 ? (
            managePostList?.map((managePost) => {
              return (
                <tr
                  key={managePost.postIdx}
                  onClick={() => hanlderDetail(managePost.postIdx)}
                >
                  <StyledTd>{managePost.postIdx}</StyledTd>
                  <StyledTd>{managePost.title}</StyledTd>
                  <StyledTd>{managePost.workLocation}</StyledTd>
                  <StyledTd>{managePost.expRequired}</StyledTd>
                  <StyledTd>{managePost.endDate}</StyledTd>
                  <StyledTd>{managePost.postDate}</StyledTd>
                  <StyledTd>{managePost.appStatus}</StyledTd>
                </tr>
              );
            })
          ) : (
            <tr>
              <StyledTd colSpan={7}>데이터가 없습니다.</StyledTd>
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

export default ManagePostMain;
