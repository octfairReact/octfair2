
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { IResume, IResumeListResponse } from "../../../../models/interface/IResume";
import { ResumeContext } from "../../../../api/provider/ResumeProvider";
import { postApplyApi } from "../../../../api/PostApplyApi";
import { StyledTable, StyledTd, StyledTh } from "../../../common/styled/StyledTable";
import { Resume } from "../../../../api/api";
import { Button } from "../../../common/Button/Button";

export const ResumeMain = () => {
  const [resumeList, setResumeList] = useState<IResume[]>();
  const { searchKeyWord } = useContext(ResumeContext);

  useEffect(() => {
    searchResumeList();
  }, [searchKeyWord]);

  const searchResumeList = async (currentPage?: number) => {
    const searchParam = {
      ...searchKeyWord,
    };

    const searchList = await postApplyApi<IResumeListResponse>(
      Resume.getList,
      searchParam
    );

    if (searchList) {
      setResumeList(searchList.payload);
    }
  };

  // const handlerCopy = (resumeSeq: number) => {
  //   await postApplyApi<IResumeListResponse>(
  //     Resume.getList,
  //     searchParam
  //   );
  // }

  // const copyList = await postApplyApi<IResumeListResponse>(
  //   Resume.getCopy,
  //   searchParam
  // );

  const handlerDelete = (resumeSeq: number) => {

  }

  return (
    <>
      {/* 총 갯수 : {listCount} 현재 페이지 : {cPage} */}
      <StyledTable>
        <thead>
          <tr>
            <StyledTh size={50}>이력서 제목</StyledTh>
            <StyledTh size={20}>관리</StyledTh>
            <StyledTh size={10}>최종수정일</StyledTh>
          </tr>
        </thead>
        <tbody>
          {resumeList?.length > 0 ? (
            resumeList?.map((resume) => {
              return (
                <tr key={resume.resIdx}>
                  <StyledTd>{resume.resTitle}</StyledTd>
                  {/* <StyledTd>복사 / 삭제</StyledTd> */}
                  {/* <StyledTd> <ResumeState /></StyledTd> */}
                  <StyledTd>
                    <div className="input-box">
                      <Button>복사하기</Button>
                      <Button>삭제하기</Button>
                    </div>
                  </StyledTd>
                  <StyledTd>{resume.updatedDate}</StyledTd>
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
      {/* <PageNavigate
        totalItemsCount={listCount}
        onChange={searchResumeList}
        activePage={cPage}
        itemsCountPerPage={5}
      ></PageNavigate> */}
    </>
  );
};
