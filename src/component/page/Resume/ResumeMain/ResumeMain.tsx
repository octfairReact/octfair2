import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { IResume, IResumeListResponse } from "../../../../models/interface/IResume";
import { ResumeContext } from "../../../../api/provider/ResumeProvider";
import { postApplyApi } from "../../../../api/PostApplyApi";
import { StyledTable, StyledTd, StyledTh } from "../../../common/styled/StyledTable";
import { Resume } from "../../../../api/api";
import { Button } from "react-bootstrap";
// import { Button } from "../../../common/Button/Button";

export const ResumeMain = () => {
  const [resumeList, setResumeList] = useState<IResume[]>();
  const [resumeSeq, setNoticeSeq] = useState<number>();
  const { searchKeyWord } = useContext(ResumeContext);
  const navigate = useNavigate();

  useEffect(() => {
    searchResumeList();
  }, [searchKeyWord]);

  const searchResumeList = async () => {
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

  const handlerDetail = (resumeSeq: number) => {
    setNoticeSeq(resumeSeq);
    navigate('/react/apply/resumeDetail.do', { state: { idx: resumeSeq } });
  };

  const copyResumeList = async (resumeSeq: number) => {
    const copyList = await postApplyApi<IResumeListResponse>(
      Resume.getCopy,
      { resIdx: resumeSeq }
    );

    if (copyList) {
      searchResumeList();
    }
  };

  const deleteResumeList = async (resumeSeq: number) => {
    const deleteList = await postApplyApi<IResumeListResponse>(
      Resume.getDelete,
      { resIdx: resumeSeq }
    );

    if (deleteList) {
      searchResumeList();
    }
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
                  <StyledTd onClick={() => handlerDetail(resume.resIdx)}>
                    {resume.resTitle}
                  </StyledTd>
                  <StyledTd>
                    <div className="input-box">
                      <Button
                        variant="primary" 
                        style={{ margin: "3px" }}
                        onClick={ () => copyResumeList(resume.resIdx) }
                      >
                        복사하기
                      </Button>
                      <Button 
                        variant="secondary" 
                        style={{ margin: "3px" }}
                        onClick={ () => deleteResumeList(resume.resIdx) }
                      >
                        삭제하기
                      </Button>
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
    </>
  );
};
