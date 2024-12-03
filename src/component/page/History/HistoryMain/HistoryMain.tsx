import axios from "axios";
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
    // axios.post('/api/apply/historySearchRest.do',searchParam).then((res) => {
    //     const data = res.data;
    //     setApplyList(data.result);
    // 	setListCount(data.historyCnt);
    // 	setCPage(currentPage);
    // })
  };

  const cancleApply = async (applyId: number) => {
    const param = {
      appId: applyId,
    };
    const res = await postApi<{ result: string }>(History.deleteApply, param);
    console.log(res.result);
    if (res.result == "success") {
      alert("지원취소 완료하였습니다.");
    } else {
      alert("지원취소에 실패하였습니다.");
    }
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handlerModal = (resSeq: number) => {
    setModal(!modal);
    setResSeq(resSeq);
  };

  const onPostSuccess = () => {
    setModal(!modal);
    searchApplyList();
  };

  const handlerCancleApply = (applyId: number) => {
    if (window.confirm("지원취소 하시겠습니까?")) {
      cancleApply(applyId);
      window.location.reload();
    } else {
      return false;
    }
  };

  return (
    <>
      <div className="divComGrpCodList">
        <StyledTable className="col">
          <caption style={{ visibility: "hidden" }}>지원내역 테이블</caption>
          <colgroup>
            <col width="15%" />
            <col width="40%" />
            <col width="15%" />
            <col width="15%" />
            <col width="15%" />
          </colgroup>

          <thead>
            <tr>
              <StyledTh scope="col">지원일</StyledTh>
              <StyledTh scope="col">지원내역</StyledTh>
              <StyledTh scope="col">공고진행상태</StyledTh>
              <StyledTh scope="col">열람</StyledTh>
              <StyledTh scope="col">취소/삭제</StyledTh>
            </tr>
          </thead>
          <tbody id="resultList">
            {applyList?.length <= 0 ? (
              <tr>
                <StyledTd style={{ height: "400px" }} colSpan={5}>
                  <p>
                    <img src="https://www.saraminimage.co.kr/sri/person/resume/img_empty_announce.png" />
                  </p>
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "bold",
                      color: "#868686",
                      padding: "15px",
                    }}
                  >
                    입사 지원 내역이 없어요.
                  </p>
                  <p style={{ fontSize: "14px" }}>
                    <span
                      onClick={() => handleNavigation(`/react/jobs/posts.do`)}
                      style={{ color: "#3157dd" }}
                    >
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
                      <p className="status" style={{ fontSize: "10px" }}>
                        지원완료
                      </p>
                      <p className="date" style={{ color: "gray" }}>
                        {data.applyDate}
                      </p>
                    </StyledTd>
                    <StyledTd className="application-details">
                      <p
                        className="company-name"
                        style={{
                          textAlign: "left",
                          paddingLeft: "50px",
                          marginTop: "5px",
                          fontSize: "14px",
                        }}
                      >
                        <span
                          onClick={() =>
                            handleNavigation(
                              `/react/company/companyDetailPage.do/${data.postingId}/${data.bizIdx}`
                            )
                          }
                        >
                          {data.bizName}
                        </span>
                      </p>
                      <p
                        className="job-title"
                        style={{
                          textAlign: "left",
                          paddingLeft: "50px",
                          marginTop: "5px",
                          fontSize: "15px",
                          fontWeight: "bold",
                        }}
                      >
                        <span
                          onClick={() =>
                            handleNavigation(
                              `/react/jobs/post-detail/${data.postingId}`
                            )
                          }
                        >
                          {data.postTitle}
                        </span>
                      </p>
                      <p
                        className="resume-link"
                        style={{
                          textAlign: "left",
                          paddingLeft: "50px",
                          margin: "5px 0px 5px 0px",
                          fontSize: "13px",
                        }}
                      >
                        <span onClick={() => handlerModal(data.resIdx)}>
                          <span>지원이력서</span>
                        </span>
                      </p>
                    </StyledTd>
                    <StyledTd className="job-status">
                      <p className="status">{data.status}</p>
                    </StyledTd>
                    <StyledTd className="view-status">
                      <p>{data.viewed == "1" ? "열람" : "미열람"}</p>
                    </StyledTd>
                    <StyledTd className="cancel">
                      {data.status == "지원완료" ? (
                        <a
                          className="cancleApply"
                          onClick={() => handlerCancleApply(data.appId)}
                        >
                          <span>지원취소</span>
                        </a>
                      ) : (
                        <span style={{ color: "#868686" }}>지원취소</span>
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
            onSuccess={onPostSuccess}
            resumeSeq={resSeq}
            setResumeSeq={setResSeq}
          />
        </Portal>
      )}
    </>
  );
};
