import { useRef } from "react";
import { Button } from "react-bootstrap"
import { useLocation } from "react-router-dom";
import { IResumeDetailReponse } from "../../../../models/interface/IResume";
import { postApi } from "../../../../api/postApi";
import { Resume } from "../../../../api/api";

export const ResumeEduAdd = (props) => {
  const location = useLocation();

  const eduLevel    = useRef(null);
  const schoolName  = useRef<HTMLInputElement>();
  const major       = useRef<HTMLInputElement>();
  const admDate     = useRef<HTMLInputElement>();
  const grdDate     = useRef<HTMLInputElement>();
  const grdStatus   = useRef(null);


  const handlerSave = async () => {
    const param = {
      resIdx: location.state.idx,
      eduLevel  : eduLevel.current.value,
      schoolName: schoolName.current.value,
      major     : major.current.value,
      admDate   : admDate.current.value + "-01",
      grdDate   : grdDate.current.value + "-01",
      grdStatus : grdStatus.current.value,
    };
    
    const saveEdu = await postApi<IResumeDetailReponse>(Resume.addEdu, param);

    if (saveEdu.payload) {
      console.log(saveEdu);
      console.log(saveEdu.payload);
      props.setVisibleState(false);
    }
  }

  const handlerCancel = () => {
    props.setVisibleState(false);
  }

  return (
    <div id="educationInputTable">
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td>
              <select 
                className="form-select" 
                id="eduLevel" 
                defaultValue={'default'} 
                ref={eduLevel} 
              >
                <option value="default">학력 구분</option>
                <option value="고등학교">고등학교</option>
                <option value="대학교">대학교</option>
                <option value="대학원(석사)">대학원(석사)</option>
                <option value="대학원(박사)">대학원(박사)</option>
              </select>
            </td>
            <td>
              <input 
                id="schoolName" 
                className="form-control" 
                type="text" 
                placeholder="학교명" 
                defaultValue={""} 
                required={true} 
                ref={schoolName}
              />
            </td>
            <td>
              <input 
                id="major" 
                className="form-control" 
                type="text" 
                placeholder="전공명" 
                defaultValue={""} 
                required={true} 
                ref={major} 
              />
            </td>
          </tr>
          <tr>
            <td>
              <span style={{ margin: "6px", float: "left" }}>입학일</span>
              <input 
                type="month" 
                id="admDate" 
                className="form-control" 
                required={true} 
                style={{ width: "70%", float: "right" }}
                ref={admDate} 
              // defaultValue={""}
              ></input>
            </td>
            <td>
              <span style={{ margin: "6px", float: "left" }}>졸업일</span>
              <input 
                type="month" 
                id="grdDate" 
                className="form-control" 
                required={true} 
                style={{ width: "70%", float: "right" }}
                ref={grdDate} 
              // defaultValue={""}
              ></input>
            </td>
            <td>
              <select 
                className="form-select" 
                id="grdStatus" 
                defaultValue={'default'}
                ref={grdStatus}  
              >
                <option value="default">졸업 여부</option>
                <option value="졸업">졸업</option>
                <option value="재학">재학</option>
                <option value="중퇴">중퇴</option>
                <option value="휴학">휴학</option>
              </select>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="inputBtnGroup" style={{ textAlign: "right" }} >
        <Button 
          id="education"
          variant="secondary" 
          style={{ margin: "2px" }}
          onClick={handlerCancel}
        >
          <span>취소</span>
        </Button>
        <Button 
          id="insertEdu"
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