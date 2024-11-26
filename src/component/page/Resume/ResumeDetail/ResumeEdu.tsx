import { Alert } from "react-bootstrap"
import { IResumeEducation, IResumeEducationReponse } from "../../../../models/interface/IResume";
import { useEffect, useState } from "react";
import { postApi } from "../../../../api/postApi";
import { Resume } from "../../../../api/api";
import { useLocation } from "react-router-dom";
import { ResumeEduAdd } from "./ResumeEduAdd";
import { RiDeleteBin6Line } from "react-icons/ri";

export const ResumeEdu = () => {
  const [educationList, setEducationList] = useState<IResumeEducation[]>();
  const [resumeSeq, setResumeSeq] = useState<number>();
  const [addVisible, setAddVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location?.state){
      setResumeSeq(location.state.idx);
      searchEduList();
    }
  }, []);

  const searchEduList = async () => {
    const searchParam = { resIdx: location.state.idx };
    const eduList = await postApi<IResumeEducationReponse>( Resume.getEdu, searchParam );

    if (eduList) { setEducationList(eduList.payload); }
  }

  const handlerDelete = async (eduIdx: number) => {
    const searchParam = { 
      resIdx: resumeSeq,
      eduIdx: eduIdx, 
    };
    
    const deleteList = await postApi<IResumeEducationReponse>(Resume.deleteEdu, searchParam);

    if (deleteList) {
      alert("삭제되었습니다.");
      searchEduList();
    }
  }

  const handlerSetVisible = (state: boolean) => {
    setAddVisible(state);
  }

  const monthFormat = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}.${month}`;
  };
 
  return (
    <div className="resumeDetail_body">
      <div className="resumeDetail_body_haeder">학력</div>
      <div className="resumeDetail_body_guide">
        <div className="resumeDetail_body_guide_text">
          <Alert key={'light'} variant={'light'}>
            • 최신순으로 작성해주세요.
          </Alert>
        </div>
      </div>
      <div className="listDiv">
        <button 
          type="button" 
          id="education"
          className="btn btn-outline-primary showTableBtn" 
          onClick={() => { setAddVisible(true); } }
        >
          + 추가
        </button>

        { addVisible && 
          <ResumeEduAdd 
            setVisibleState={handlerSetVisible} 
            searchEduList={searchEduList} 
          /> 
        }
        { !addVisible && 
          <div className="list" id="educationList">
            {educationList?.length > 0 ? (
              <table className="table table-bordered">
                <colgroup>
                  <col width={"20%"} />
                  <col width={"15%"} />
                  <col width={"23%"} />
                  <col width={"25%"} />
                  <col width={"9%"} />
                  <col width={"9%"} />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">기간</th>
                    <th scope="col">학력</th>
                    <th scope="col">학교명</th>
                    <th scope="col">전공</th>
                    <th scope="col">졸업</th>
                    <th scope="col">삭제</th>
                  </tr>
                </thead>
                
                {educationList?.map((edu, index) => {
                  return (
                    <tbody key={index}>
                      <tr>
                        <td>{monthFormat(edu.admDate)} ~ {monthFormat(edu.grdDate)}</td>
                        <td>{edu.eduLevel}</td>
                        <td>{edu.schoolName}</td>
                        <td>{edu.major}</td>
                        <td>{edu.grdStatus}</td>
                        <td onClick={() => handlerDelete(edu.eduIdx)}><RiDeleteBin6Line /></td>
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
                      학력 사항을 추가할 수 있습니다.
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