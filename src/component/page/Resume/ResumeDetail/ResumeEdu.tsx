import { Alert, Button } from "react-bootstrap"
import { IResumeDetailReponse, IResumeEducation, IResumeEducationReponse } from "../../../../models/interface/IResume";
import { useEffect, useRef, useState } from "react";
import { postApi } from "../../../../api/postApi";
import { Resume } from "../../../../api/api";
import { useLocation } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { StyledResume } from "../Style/StyledResume";
import swal from 'sweetalert';

export const ResumeEdu = ({ resIdx }) => {
  const [educationList, setEducationList] = useState<IResumeEducation[]>();
  const [selectedOption, setSelectedOption] = useState();
  const [addVisible, setAddVisible] = useState(false);
  const location = useLocation();
  const schoolName = useRef<HTMLInputElement>();
  const major = useRef<HTMLInputElement>();
  const admDate = useRef<HTMLInputElement>();
  const grdDate = useRef<HTMLInputElement>();
  const eduLevel = useRef(null);
  const grdStatus = useRef(null);

  useEffect(() => {
    if (location?.state){
      searchEduList();
    }
  }, []);

  const searchEduList = async () => {
    const eduList = await postApi<IResumeEducationReponse>(Resume.getEdu, {resIdx: location.state.idx});
    if (eduList) { setEducationList(eduList.payload); }
  }

  const handlerDelete = async (eduIdx: number) => {
    const deleteList = await postApi<IResumeEducationReponse>(Resume.deleteEdu, {
      resIdx,
      eduIdx, 
    });

    if (deleteList) {
      swal("삭제 완료", "삭제되었습니다.", "success");
      searchEduList();
    }
  }

  const monthFormat = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}.${month}`;
  };

  const handlerSave = async () => {
    const today = new Date();
    const _eduLevel = eduLevel.current.value;
    const _schoolName = schoolName.current.value;
    const _admDate = admDate.current.value;
    const _grdDate = grdDate.current.value;
    const _grdStatus = grdStatus.current.value;

    if (new Date(_admDate) > new Date(_grdDate)) {
      swal("저장 실패", "졸업일이 입학일보다 이전일 수 없습니다.", "warning");
      return;
    }

    if (today < new Date(_admDate) || today < new Date(_grdDate)) {
      swal("저장 실패", "입학일이나 졸업일이 오늘보다 미래일 수 없습니다.", "warning");
      return;
    }

    if (!_eduLevel || !_schoolName || !_admDate || !_grdDate || !_grdStatus) {
      swal("저장 실패", "모든 항목을 입력하세요.", "warning");
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
      swal("저장 완료", "추가되었습니다.", "success");
      setAddVisible(false);
      searchEduList();
    }
  }

  const handlerSelectChange = (e) => {
    setSelectedOption(e.target.value);
  }
 
  return (
    <StyledResume>
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
            className="btn btn-outline-primary showTableBtn" 
            onClick={() => { setAddVisible(true); } }
          >
            + 추가
          </button>

          { addVisible && 
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
                      <span className="tdSpan">입학일</span>
                      <input type="month" className="form-control admDate" ref={admDate} />
                    </td>
                    <td>
                      <span className="tdSpan">졸업일</span>
                      <input type="month" className="form-control grdDate" ref={grdDate} />
                    </td>
                    <td>
                      <select 
                        className="form-select" 
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

              <div className="inputBtnGroup">
                <Button variant="secondary" onClick={() => { setAddVisible(false);} }>
                  <span>취소</span>
                </Button>
                <Button variant="primary" onClick={handlerSave}>
                  <span>저장</span>
                </Button>
              </div>
            </div>
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
    </StyledResume>
  );
};