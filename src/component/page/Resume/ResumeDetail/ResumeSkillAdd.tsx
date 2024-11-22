import { Button } from "react-bootstrap"

export const ResumeSkillAdd = () => {

  const handlerSave = () => {}

  const handlerCancel = () => {}

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
              />
            </td>
            <td>
              <textarea 
                className="form-control" id="skillDetail" 
                placeholder=" &#13;&#10; 스킬 상세 기재"
                rows={5}
                defaultValue={""}
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
        {/* <a className="btnType gray cancleBtn" id="skill" href="#"><span>취소</span></a>
        <a className="btnType blue" href="javascript:insertSkill()"><span>저장</span></a> */}
      </div>
    </div>
  );
};