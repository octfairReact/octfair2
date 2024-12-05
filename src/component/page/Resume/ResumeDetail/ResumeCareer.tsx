import { Alert, Button } from "react-bootstrap"
import { IResumeCareer, IResumeCareerReponse, IResumeDetailReponse } from "../../../../models/interface/IResume";
import { useEffect, useRef, useState } from "react";
import { postApi } from "../../../../api/postApi";
import { Resume } from "../../../../api/api";
import { useLocation } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { StyledResume } from "../Style/StyledResume";
import swal from 'sweetalert';

export const ResumeCareer = ({ resIdx }) => {
  const location = useLocation();
  const [careerList, setCareerList] = useState<IResumeCareer[]>();
  const [addVisible, setAddVisible] = useState(false);

  const refs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({
    company: null,
    dept: null,
    position: null,
    startDate: null,
    endDate: null,
    reason: null,
    crrDesc: null,
  });

  const setRef = (key: string) => (el: HTMLInputElement | HTMLTextAreaElement | null) => {
    refs.current[key] = el;
  };

  useEffect(() => {
    if (location?.state){
      searchCareerList();
    }
  }, [location]);

  const searchCareerList = async () => {
    const careerList = await postApi<IResumeCareerReponse>(Resume.getCareer, {resIdx: location.state.idx});
    if (careerList) { setCareerList(careerList.payload); }
  }

  const handlerDelete = async (crrIdx: number) => {
    const deleteList = await postApi<IResumeCareerReponse>(Resume.deleteCareer, {
      resIdx,
      crrIdx,
    });

    if (deleteList) {
      swal("삭제 완료", "삭제되었습니다.", "success");
      searchCareerList();
    }
  }

  const monthFormat = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}.${month}`;
  };

  const validateInput = () => {
    const today = new Date();
    const inputs = Object.keys(refs.current).reduce((acc, key) => {
      acc[key] = refs.current[key]?.value.trim() || "";
      return acc;
    }, {} as Record<string, string>);

    if (today < new Date(inputs.startDate)) {
      swal("저장 실패", "입사일은 미래일 수 없습니다.", "warning");
      return false;
    }

    if (today < new Date(inputs.endDate)) {
      swal("저장 실패", "퇴사일은 오늘보다 미래일 수 없습니다.", "warning");
      return false;
    }

    if (new Date(inputs.endDate) < new Date(inputs.startDate)) {
      swal("저장 실패", "입사일이 퇴사일 이후일 수 없습니다.", "warning");
      return false;
    }

    if (Object.values(inputs).some((value) => !value)) {
      swal("저장 실패", "모든 필드를 입력하세요.", "warning");
      return false;
    }

    return inputs;
  }

  const handlerSave = async () => {
    const params = validateInput();
    if (!params) return;
    
    const saveCareer = await postApi<IResumeDetailReponse>(Resume.addCareer, {
      ...params,
      startDate: `${params.startDate}-01`,
      endDate: `${params.endDate}-01`,
      resIdx,
    });

    if (saveCareer.payload) {
      setAddVisible(false);
      swal("저장 완료", "추가되었습니다.", "success");
      searchCareerList();
    }
  }

  return (
    <StyledResume>
      <div className="resumeDetail_body">
        <div className="resumeDetail_body_haeder">경력</div>
        <div className="resumeDetail_body_guide">
          <div className="resumeDetail_body_guide_text">
            <Alert key={'light'} variant={'light'}>
              • 담당하신 업무 중 우선순위가 높은 업무를 선별하여 최신순으로 작성해 주세요. <br/>
              • 신입의 경우, 직무와 관련된 대외활동, 인턴, 계약직 경력 등이 있다면 작성해 주세요. <br/>
              • 업무 또는 활동 시 담당했던 역할과 과정, 성과에 대해 자세히 작성해 주세요. <br/>
              • 현재 재직 중이면 퇴사일을 해당 월로 입력해 주세요.
            </Alert>
          </div>
        </div>

        <div className="listDiv">
          <button type="button" 
            className="btn btn-outline-primary showTableBtn" 
            onClick={() => { setAddVisible(true); }}
          >
            + 추가
          </button>
          
          { addVisible && 
            <div id="careerInputTable">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>
                      <input type="text" className="form-control" 
                        ref={setRef("company")} placeholder="회사명" />
                    </td>
                    <td>
                      <span className="tdSpan">입사일</span>
                      <input type="month" className="form-control startDate" ref={setRef("startDate")} />
                    </td>
                    <td>
                      <span className="tdSpan">퇴사일</span>
                      <input type="month" className="form-control endDate" ref={setRef("endDate")} />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <input type="text" className="form-control" 
                        ref={setRef("dept")} placeholder="근무 부서" />
                    </td>
                    <td>
                      <input type="text" id="position" className="form-control" 
                        ref={setRef("position")} placeholder="직책/직급" />
                    </td>
                    <td>
                      <input type="text" id="reason" className="form-control" 
                        ref={setRef("reason")} placeholder="퇴사 사유" defaultValue={""} required={true} />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={3}>
                      <textarea className="form-control" id="crrDesc" 
                        ref={setRef("crrDesc")} rows={5}  required={true} defaultValue={""}
                        placeholder="　담당 업무를 입력해 주세요.&#13;&#10;
                        - 진행한 업무를 다 적기보다는 경력 사항별로 중요한 내용만 엄선해서 작성하는 것이 중요합니다!&#13;&#10;
                        - 경력별 프로젝트 내용을 적을 경우, 역할/팀구성/기여도/성과를 기준으로 요약해서 작성해 보세요!"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="inputBtnGroup">
                <Button variant="secondary" onClick={() => { setAddVisible(false); }}>
                  <span>취소</span>
                </Button>
                <Button variant="primary" onClick={handlerSave}>
                  <span>저장</span>
                </Button>
              </div>
            </div>
          }
          { !addVisible && 
            <div className="list" id="careerList">
              {careerList?.length > 0 ? (
                <table className="table table-bordered">
                  <colgroup>
                    <col width={"15%"} />
                    <col width={"20%"} />
                    <col width={"20%"} />
                    <col width={"15%"} />
                    <col width={"20%"} />
                    <col width={"10%"} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">기간</th>
                      <th scope="col">회사명</th>
                      <th scope="col">부서명</th>
                      <th scope="col">직급/직책</th>
                      <th scope="col">퇴사사유</th>
                      <th scope="col">삭제</th>
                    </tr>
                  </thead>
                  
                  {careerList?.map((career, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td rowSpan={2}>
                            {monthFormat(career.startDate)} ~ {monthFormat(career.endDate)}
                          </td>
                          <td>{career.company}</td>
                          <td>{career.dept}</td>
                          <td>{career.position}</td>
                          <td>{career.reason}</td>
                          <td rowSpan={2} onClick={() => handlerDelete(career.crrIdx)}>
                            <RiDeleteBin6Line />
                          </td>
                        </tr>
                        <tr>
                          <td className="tdCrrDesc" colSpan={4}>
                            {career.crrDesc}
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
                </table>
              ) : (
                <table className="table">
                  <tbody>
                    <tr>
                      <td className="res-comment">
                        경력 사항을 추가할 수 있습니다.
                      </td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          }
        </div>
      </div>
    </StyledResume>
  );
};