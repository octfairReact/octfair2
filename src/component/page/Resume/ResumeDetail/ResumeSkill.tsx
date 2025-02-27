import { Alert, Button } from "react-bootstrap"
import { IResumeDetailReponse, IResumeSkill, IResumeSkillReponse } from "../../../../models/interface/IResume";
import { useEffect, useRef, useState } from "react";
import { postApi } from "../../../../api/postApi";
import { Resume } from "../../../../api/api";
import { useLocation } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { StyledResume } from "../Style/StyledResume";
import swal from 'sweetalert';

export const ResumeSkill = ({ resIdx }) => {
  const [skillList, setSkillList] = useState<IResumeSkill[]>();
  const [addVisible, setAddVisible] = useState(false);
  const skillName = useRef<HTMLInputElement>();
  const skillDetail = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (location?.state){
      searchSkillList();
    }
  }, []);

  const searchSkillList = async () => {
    const skillList   = await postApi<IResumeSkillReponse>( Resume.getSkill, {resIdx: location.state.idx});
    if (skillList) { setSkillList(skillList.payload); }
  }

  const handlerSave = async () => {
    const _skillName = skillName.current.value;
    const _skillDetail = skillDetail.current.value;

    if (!_skillName || !_skillDetail) {
      swal("저장 실패", "모든 항목을 입력하세요.", "warning");
      return;
    }

    const saveSkill = await postApi<IResumeDetailReponse>(Resume.addSkill, {
      skillName: _skillName,
      skillDetail: _skillDetail,
      resIdx: location.state.idx,
    });

    if (saveSkill.payload) {
      swal("저장 완료", "추가되었습니다.", "success");
      setAddVisible(false);
      searchSkillList();
    }
  }

  const handlerDelete = async (skillIdx: number) => {
    const deleteList = await postApi<IResumeSkillReponse>(Resume.deleteSkill, {
      resIdx,
      skillIdx, 
    });

    if (deleteList) {
      swal("삭제 완료", "삭제되었습니다.", "success");
      searchSkillList();
    }
  }

  return (
    <StyledResume>
      <div className="resumeDetail_body">
        <div className="resumeDetail_body_haeder">스킬</div>
        <div className="resumeDetail_body_guide">
          <div className="resumeDetail_body_guide_text">
            <Alert key={'light'} variant={'light'}>
              • 개발 스택, 디자인 툴, 마케팅 툴 등 가지고 있는 직무와 관련된 스킬을 추가해 보세요. <br/>
              • 데이터 분석 툴이나 협업 툴 등 사용해 본 경험이 있으신 툴들도 추가해 보세요.
            </Alert>
          </div>
        </div>

        <div className="listDiv">
          <button 
            type="button" 
            className="btn btn-outline-primary showTableBtn" 
            onClick={() => { setAddVisible(true); }} 
          >
            + 추가
          </button>

          { addVisible && 
            <div id="skillInputTable">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td width={"30%"}>
                      <input 
                        type="text" 
                        className="form-control" 
                        placeholder="스킬명" 
                        ref={skillName} 
                      />
                    </td>
                    <td>
                      <textarea 
                        className="form-control"
                        placeholder=" &#13;&#10; 스킬 상세 기재"
                        rows={3}
                        ref={skillDetail} 
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
            <div className="list" id="skillList">
              {skillList?.length > 0 ? (
                <table className="table table-bordered">
                  <colgroup>
                    <col width={"20%"} />
                    <col width={"70%"} />
                    <col width={"10%"} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">스킬명</th>
                      <th scope="col">스킬 상세 내용</th>
                      <th scope="col">삭제</th>
                    </tr>
                  </thead>
                  
                  {skillList?.map((skill, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td>{skill.skillName}</td>
                          <td className="tdSkillDetail">
                            {skill.skillDetail}
                          </td>
                          <td onClick={() => handlerDelete(skill.skillIdx)}>
                            <RiDeleteBin6Line/>
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
                        보유 스킬을 추가할 수 있습니다.
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