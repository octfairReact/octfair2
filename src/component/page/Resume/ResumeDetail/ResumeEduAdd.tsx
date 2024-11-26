import { useRef, useState } from "react";
import { Button } from "react-bootstrap"
import { useLocation } from "react-router-dom";
import { IResumeDetailReponse } from "../../../../models/interface/IResume";
import { postApi } from "../../../../api/postApi";
import { Resume } from "../../../../api/api";

export const ResumeEduAdd = ({ setVisibleState, searchEduList }) => {
  const [selectedOption, setSelectedOption] = useState();
  const location = useLocation();
  const eduLevel = useRef(null);
  const schoolName = useRef<HTMLInputElement>();
  const major = useRef<HTMLInputElement>();
  const admDate = useRef<HTMLInputElement>();
  const grdDate = useRef<HTMLInputElement>();
  const grdStatus = useRef(null);

  const handlerSave = async () => {
    const today = new Date();
    const _eduLevel = eduLevel.current.value;
    const _schoolName = schoolName.current.value;
    const _admDate = admDate.current.value;
    const _grdDate = grdDate.current.value;
    const _grdStatus = grdStatus.current.value;

    if (new Date(_admDate) > new Date(_grdDate)) {
      alert("졸업일이 입학일보다 이전일 수 없습니다.");
      return;
    }

    if (today < new Date(_admDate) || today < new Date(_grdDate)) {
      alert("입학일이나 졸업일이 오늘보다 미래일 수 없습니다.");
      return;
    }

    if (!_eduLevel || !_schoolName || !_admDate || !_grdDate || !_grdStatus) {
      alert("모든 항목을 입력하세요.");
      return;
    }

    const param = {
      resIdx: location.state.idx,
      eduLevel  : _eduLevel,
      schoolName: _schoolName,
      major     : major.current ? major.current.value : '',
      admDate   : _admDate + "-01",
      grdDate   : _grdDate + "-01",
      grdStatus : _grdStatus,
    };
    
    const saveEdu = await postApi<IResumeDetailReponse>(Resume.addEdu, param);

    if (saveEdu.payload) {
      alert("추가되었습니다.");
      setVisibleState(false);
      searchEduList();
    }
  }

  const handlerSelectChange = (e) => {
    setSelectedOption(e.target.value);
  }

  const handlerCancel = () => {
    setVisibleState(false);
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
                defaultValue={''} 
                ref={eduLevel} 
                onChange={handlerSelectChange}
              >
                <option value="">학력 구분</option>
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
                ref={major} 
                disabled={selectedOption === "고등학교"} 
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
              ></input>
            </td>
            <td>
              <select 
                className="form-select" 
                id="grdStatus" 
                defaultValue={''}
                ref={grdStatus}  
              >
                <option value="">졸업 여부</option>
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