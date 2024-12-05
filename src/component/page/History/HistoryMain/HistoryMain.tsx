import { useContext, useEffect, useState } from "react";
import { ApplyContext } from "../../../../api/provider/ApplyProvider";
import { PageNavigate } from "../../../common/pageNavigation/PageNavigate";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { Portal } from "../../../common/potal/Portal";
import {
  StyledTable,
  StyledTd,
  StyledTh,
} from "../../../common/styled/StyledTable";
import { ResumeModalPreview } from "../../Resume/ResumeModal/ResumeModalPreview";
import { IApply, IApplyResponse } from "../../../../models/interface/IHistory";
import { History } from "../../../../api/api";
import { postApi } from "../../../../api/postApi";
import { HistoryMainStyled } from "./styled";
import swal from 'sweetalert';

export const HistoryMain = () => {
  const [applyList, setApplyList] = useState<IApply[]>();
  const { searchKeyWord } = useContext(ApplyContext);
  const navigate = useNavigate();
  const [cPage, setCPage] = useState<number>();
  const [listCount, setListCount] = useState<number>(0);
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [resSeq, setResSeq] = useState<number>();

  useEffect(() => {
    searchApplyList();
  }, [searchKeyWord]);

  const searchApplyList = async (currentPage?: number) => {
    currentPage = currentPage || 1;
    const searchParam = {
      ...searchKeyWord,
      currentPage: currentPage.toString(),
      pageSize: "5",
    };
    const searchList = await postApi<IApplyResponse>(
      History.getList,
      searchParam
    );
    if (searchList) {
      setApplyList(searchList.result);
      setListCount(searchList.historyCnt);
      setCPage(currentPage);
    }
  };

  const cancleApply = async (applyId: number) => {
    const param = {
      appId: applyId,
    };
    const res = await postApi<{ result: string }>(History.deleteApply, param);
    console.log(res.result);
    if (res.result === "success") {
      swal("지원취소 완료하였습니다.","","success").then(() => {
        window.location.reload();
      })            
    } else {
      swal("지원취소에 실패하였습니다.","","error");
    }
  };

  const handlerModal = (resSeq: number) => {
    setModal(!modal);
    setResSeq(resSeq);
  };

  const handlerCancleApply = (applyId: number) => {
    if (window.confirm("지원취소 하시겠습니까?")) {
      cancleApply(applyId);
    } else {
      return false;
    }
  };

  return (
    <HistoryMainStyled>
      <div className="divComGrpCodList">
        <StyledTable className="col">
          <caption style={{ visibility: "hidden" }}>지원내역 테이블</caption>
          <colgroup>
            <col width="15%" />
            <col width="30%" />
            <col width="10%" />
            <col width="15%" />
            <col width="15%" />
            <col width="15%" />
          </colgroup>

          <thead>
            <tr>
              <StyledTh scope="col">지원일</StyledTh>
              <StyledTh scope="col">지원내역</StyledTh>
              <StyledTh scope="col">지원이력서</StyledTh>
              <StyledTh scope="col">공고진행상태</StyledTh>
              <StyledTh scope="col">열람</StyledTh>
              <StyledTh scope="col">취소/삭제</StyledTh>
            </tr>
          </thead>
          <tbody id="resultList">
            {applyList?.length <= 0 ? (
              <tr>
                <StyledTd id="application-nobodyTd" colSpan={6}>
                  <p>
                    <img src="https://www.saraminimage.co.kr/sri/person/resume/img_empty_announce.png" alt="빈 공고 이미지"/>
                  </p>
                  <p id="application-nobodyP">
                    입사 지원 내역이 없어요.
                  </p>
                  <p id="application-nobodyGoP">
                    <span id="application-nobodySpan"
                      onClick={() => navigate(`/react/jobs/posts.do`)}>
                      현재 채용중인 공고 보러가기 {">"}{" "}
                    </span>
                  </p>
                </StyledTd>
              </tr>
            ) : (
              applyList?.map((data) => {
                return (
                  <tr className="resume-entry" key={data.appId}>
                    <StyledTd className="application-date">
                      <p className="status">
                        지원완료
                      </p>
                      <p className="date">
                        {data.applyDate}
                      </p>
                    </StyledTd>
                    <StyledTd className="application-details">
                      <p className="company-name">
                        <span onClick={() =>
                            navigate( `/react/company/companyDetailPage.do/${data.postingId}/${data.bizIdx}`)}>
                          {data.bizName}
                        </span>
                      </p>
                      <p className="job-title">
                        <span
                          onClick={() =>
                            navigate( `/react/jobs/post-detail/${data.postingId}`)}>
                          {data.postTitle}
                        </span>
                      </p>
                      
                    </StyledTd>
                    <StyledTd className="modal_preview">
                      <p className="resume-link">
                        <button className="resume_preview" onClick={() => handlerModal(data.resIdx)}>
                          이력서 보기
                        </button>
                      </p>
                    </StyledTd>
                    <StyledTd className="job-status">
                      <p className="status">{data.status}</p>
                    </StyledTd>
                    <StyledTd className="view-status">
                      <p>{data.viewed === "1" ? "열람" : "미열람"}</p>
                    </StyledTd>
                    <StyledTd className="cancel">
                      {data.status === "지원완료" ? (                        
                        <span onClick={() => handlerCancleApply(data.appId)}>지원취소
                        </span>                        
                      ) : (
                        <span id="cancleSpan">지원취소</span>
                      )}
                    </StyledTd>
                  </tr>
                );
              })
            )}
          </tbody>
        </StyledTable>
      </div>
      <PageNavigate
        totalItemsCount={listCount}
        onChange={searchApplyList}
        activePage={cPage}
        itemsCountPerPage={5}
      ></PageNavigate>
      {modal && (
        <Portal>
          <ResumeModalPreview
            resumeSeq={resSeq}
          />
        </Portal>
      )}
    </HistoryMainStyled>
  );
};
