import { Alert, Button } from "react-bootstrap"
import { IResumeCareer, IResumeCareerReponse } from "../../../../models/interface/IResume";
import { useEffect, useState } from "react";
import { postApi } from "../../../../api/postApi";
import { Resume } from "../../../../api/api";
import { useLocation } from "react-router-dom";
import { ResumeCareerAdd } from "./ResumeCareerAdd";

export const ResumeCareer = () => {
  const [careerList, setCareerList] = useState<IResumeCareer[]>();
  const [resumeSeq, setResumeSeq] = useState<number>();
  const [addVisible, setAddVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // resumeSeq && searchDetail();

    if (location?.state){
      setResumeSeq(location.state.idx);
      searchCareerList(location.state.idx);
    }
  }, []);


  const searchCareerList = async (resumeSeq: number) => {
    const searchParam = { resIdx: resumeSeq };
    const careerList = await postApi<IResumeCareerReponse>( Resume.getCareer, searchParam );

    if (careerList) { setCareerList(careerList.payload); }
  }

  const handlerSave = () => {}
  const handlerCancel = () => {}

  const handlerSetVisible = (state: boolean) => {
    setAddVisible(state);
  }

  return (
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
        <button 
          type="button" 
          id="career"
          className="btn btn-outline-primary showTableBtn" 
          onClick={() => { setAddVisible(true); } }
        >
          + 추가
        </button>
        {/* <ul> */}
        {/* {careerVisible &&  */}
        { addVisible && <ResumeCareerAdd setVisibleState={handlerSetVisible} /> }
        { !addVisible && 

          <div className="list" id="careerList">
          {careerList?.length > 0 ? (
            <table className="table table-bordered">
              <colgroup>
                <col width={"20%"} />
                <col width={"25%"} />
                <col width={"15%"} />
                <col width={"15%"} />
                <col width={"15%"} />
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
                      <td rowSpan={2}>{career.startDate}~{career.endDate}</td>
                      <td>{career.company}</td>
                      <td>{career.dept}</td>
                      <td>{career.position}</td>
                      <td>{career.reason}</td>
                      <td rowSpan={2}>삭제</td>
                    </tr>
                    <tr>
                      <td colSpan={4} style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>{career.crrDesc}</td>
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
          
        {/* } */}
          
        {/* </ul> */}
      </div>
    </div>
  );
};