import { useRef, useState } from "react";
import { Button } from "react-bootstrap"
import { postApi } from "../../../../api/postApi";
import { IResumeDetailReponse } from "../../../../models/interface/IResume";
import { Resume } from "../../../../api/api";
import { useLocation } from "react-router-dom";

export const ResumeCareerAdd = ({ setVisibleState, searchCareerList}) => {
  const location = useLocation();
  const company = useRef<HTMLInputElement>();
  const dept      = useRef<HTMLInputElement>();
  const position  = useRef<HTMLInputElement>();
  const startDate = useRef<HTMLInputElement>();
  const endDate   = useRef<HTMLInputElement>();
  const reason    = useRef<HTMLInputElement>();
  const crrDesc   = useRef(null);

  const handlerSave = async () => {
    const today = new Date();
    const _company = company.current.value;
    const _dept = dept.current.value;
    const _position = position.current.value;
    const _startDate = startDate.current.value;
    const _endDate = endDate.current.value;
    const _reason = reason.current.value;
    const _crrDesc = crrDesc.current.value;

    if (today < new Date(_startDate)) {
      alert("입사일은 미래일 수 없습니다.");
      return;
    }

    if (today < new Date(_endDate)) {
      alert("퇴사일은 오늘보다 미래일 수 없습니다.");
      return;
    }

    if (new Date(_endDate) < new Date(_startDate)) {
      alert("입사일이 퇴사일 이후일 수 없습니다.");
      return;
    }

    if (!_company || !_dept || !_position || !_startDate || !_endDate || !_reason || !_crrDesc) {
      alert("모든 필드를 입력하세요.");
      return;
    }

    const param = {
      company: _company,
      dept: _dept,
      position: _position,
      startDate: _startDate + "-01",
      endDate: _endDate + "-01",
      reason: _reason,
      crrDesc: _crrDesc,
      resIdx: location.state.idx,
    };
    
    const saveCareer = await postApi<IResumeDetailReponse>(Resume.addCareer, param);

    if (saveCareer.payload) {
      setVisibleState(false);
      alert("추가되었습니다.");
      searchCareerList();
    }
  }

  const handlerCancel = () => {
    setVisibleState(false);
  }

  return (
    <div id="careerInputTable">
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td>
              <input 
                type="text" 
                id="company" 
                className="form-control" 
                ref={company} 
                placeholder="회사명" 
                defaultValue={""}
                required={true}
              />
            </td>
            <td>
              <span style={{ margin: "6px", float: "left" }}>입사일</span>
              <input 
                type="month" 
                id="startDate" 
                className="form-control" 
                ref={startDate} 
                required={true} 
                style={{ width: "70%", float: "right" }}
              />
            </td>
            <td>
              <span style={{ margin: "6px", float: "left" }}>퇴사일</span>
              <input 
                type="month" 
                id="endDate" 
                className="form-control" 
                ref={endDate} 
                required={true} 
                style={{ width: "70%", float: "right" }}
              />
            </td>
          </tr>
          <tr>
            <td>
              <input 
                type="text" 
                id="dept" 
                className="form-control" 
                ref={dept} 
                placeholder="근무 부서" 
                defaultValue={""} 
                required={true} />
            </td>
            <td>
              <input 
                type="text" 
                id="position" 
                className="form-control" 
                ref={position} 
                placeholder="직책/직급" 
                defaultValue={""} 
                required={true} />
            </td>
            <td>
              <input 
                type="text" 
                id="reason" 
                className="form-control" 
                ref={reason} 
                placeholder="퇴사 사유" 
                defaultValue={""} 
                required={true} />
            </td>
          </tr>
          <tr>
            <td colSpan={3}>
              <textarea 
                className="form-control" 
                id="crrDesc" 
                ref={crrDesc} 
                rows={5}
                required={true} 
                defaultValue={""}
                placeholder="　담당 업무를 입력해 주세요.&#13;&#10;
                - 진행한 업무를 다 적기보다는 경력 사항별로 중요한 내용만 엄선해서 작성하는 것이 중요합니다!&#13;&#10;
                - 경력별 프로젝트 내용을 적을 경우, 역할/팀구성/기여도/성과를 기준으로 요약해서 작성해 보세요!"
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="inputBtnGroup" style={{ textAlign: "right" }} >
        <Button 
          id="career"
          variant="secondary" 
          style={{ margin: "2px" }}
          onClick={handlerCancel}
        >
          <span>취소</span>
        </Button>
        <Button 
          id="insertCareer"
          variant="primary" 
          style={{ margin: "2px" }}
          onClick={handlerSave}
        >
          <span>저장</span>
        </Button>
      </div>
    </div>
  );
};