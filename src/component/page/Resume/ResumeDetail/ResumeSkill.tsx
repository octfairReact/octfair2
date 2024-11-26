import { Alert } from "react-bootstrap"
import { IResumeSkill, IResumeSkillReponse } from "../../../../models/interface/IResume";
import { useEffect, useState } from "react";
import { postApi } from "../../../../api/postApi";
import { Resume } from "../../../../api/api";
import { useLocation } from "react-router-dom";
import { ResumeSkillAdd } from "./ResumeSkillAdd";
import { RiDeleteBin6Line } from "react-icons/ri";

export const ResumeSkill = () => {
  const [skillList, setSkillList] = useState<IResumeSkill[]>();
  const [resumeSeq, setResumeSeq] = useState<number>();
  const [addVisible, setAddVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location?.state){
      setResumeSeq(location.state.idx);
      searchSkillList();
    }
  }, []);

  const searchSkillList = async () => {
    const searchParam = { resIdx: location.state.idx };
    const skillList   = await postApi<IResumeSkillReponse>( Resume.getSkill, searchParam );
    
    if (skillList) { setSkillList(skillList.payload); }
  }

  const handlerDelete = async (skillIdx: number) => {
    const searchParam = { 
      resIdx: resumeSeq,
      skillIdx: skillIdx, 
    };
    const deleteList = await postApi<IResumeSkillReponse>(Resume.deleteSkill, searchParam);

    if (deleteList) {
      alert("삭제되었습니다.");
      searchSkillList();
    }
  }

  const handlerSetVisible = (state: boolean) => {
    setAddVisible(state);
  }

  return (
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
          id="skill"
          onClick={() => { setAddVisible(true); } } 
        >
          + 추가
        </button>

        { addVisible && 
          <ResumeSkillAdd 
            setVisibleState={handlerSetVisible} 
            searchSkillList={searchSkillList} 
          /> 
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
                        <td style={{ whiteSpace: "pre-wrap", textAlign: "left" }}>{skill.skillDetail}</td>
                        <td onClick={() => handlerDelete(skill.skillIdx)}><RiDeleteBin6Line /></td>
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
  );
};