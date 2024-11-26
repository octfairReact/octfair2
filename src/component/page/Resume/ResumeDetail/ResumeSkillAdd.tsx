import { useRef } from "react";
import { Button } from "react-bootstrap"
import { useLocation } from "react-router-dom";
import { postApi } from "../../../../api/postApi";
import { IResumeDetailReponse } from "../../../../models/interface/IResume";
import { Resume } from "../../../../api/api";

export const ResumeSkillAdd = ({ setVisibleState, searchSkillList }) => {
  const location = useLocation();
  const skillName = useRef<HTMLInputElement>();
  const skillDetail = useRef(null);

  const handlerSave = async () => {
    const _skillName = skillName.current.value;
    const _skillDetail = skillDetail.current.value;

    if (!_skillName || !_skillDetail) {
      alert("모든 항목을 입력하세요.");
      return;
    }

    const param = {
      skillName: _skillName,
      skillDetail: _skillDetail,
      resIdx: location.state.idx,
    }

    const saveSkill = await postApi<IResumeDetailReponse>(Resume.addSkill, param);

    if (saveSkill.payload) {
      alert("추가되었습니다.");
      setVisibleState(false);
      searchSkillList();
    }
  }

  const handlerCancel = () => {
    setVisibleState(false);
  }

  return (
    <div id="skillInputTable">
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td width={"30%"}>
              <input 
                id="skillName" 
                className="form-control" 
                type="text" 
                placeholder="스킬명" 
                defaultValue={""} 
                required={true} 
                style={{ verticalAlign: "top"}}
                ref={skillName} 
              />
            </td>
            <td>
              <textarea 
                className="form-control" id="skillDetail" 
                placeholder=" &#13;&#10; 스킬 상세 기재"
                rows={5}
                defaultValue={""} 
                ref={skillDetail} 
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className="inputBtnGroup" style={{ textAlign: "right" }} >
        <Button 
          id="skill"
          variant="secondary" 
          style={{ margin: "2px" }}
          onClick={handlerCancel}
        >
          <span>취소</span>
        </Button>
        <Button 
          id="insertSkill"
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