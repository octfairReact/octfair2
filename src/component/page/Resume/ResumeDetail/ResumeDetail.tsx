import Alert from 'react-bootstrap/Alert';
import { useLocation, useNavigate } from "react-router-dom";
import { StyledTable } from "../../../common/styled/StyledTable";
import { ResumeDetailStyled } from "./styled";
import { Button } from "react-bootstrap";
import { Portal } from "../../../common/potal/Portal";
import { ResumeModalPreview } from "../ResumeModal/ResumeModalPreview";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";


export const ResumeDetail = () => {
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [resumeSeq, setResumeSeq] = useState<number>();
  // const [resumeDetail, setResumeDetail] = useState<IResumeDetail>();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state){
      setResumeSeq(location.state.idx);
    }
  }, []);

  const handlerReturn = () => {
    navigate('/react/apply/resume.do');
  }

  const handlerSave = () => {
    
  }

  const handlerPreview = (resumeSeq: number) => {
    console.log("handlerPreview : ");
    console.log("resumeSeq : " + resumeSeq);
    setModal(!modal);
    setResumeSeq(resumeSeq);
  }

  const onPostSuccess = () => {
    console.log("onPostSuccess : ");
    setModal(!modal);
    // 프린트할 경우
  }

  return (
    // <ResumeDetailStyled>
    <StyledTable>
      <div id="container">
        <div className="content">

          <div className="resumeDetail_body_wrap">

            <div className="resumeDetail_body_basicInfo">
              <div>
                <input></input>
                {/* <input
                  style={{ border: "none"; font-size: "30px"; margin-bottom: "20px"; padding: "5px" }}
                  id="resumetitle" type="text" value="${result.resTitle}" data-num="${result.resIdx}" placeholder="이력서 제목"> */}
              </div>

              <div>
                <Alert key={'light'} variant={'light'}>
                  This is a alert—check it out!
                </Alert>
              </div>

              <div>
                <input id="userName"
                  type="text" value="${result.userNm}" placeholder="이름" />
              </div>
              <div>
                <input id="userEmail"
                  type="text" value="${result.email}" placeholder="이메일" />
              </div>
              <div>
                <input id="userPhone"
                  type="text" value="${result.phone}" placeholder="연락처" />
              </div>
            </div>

            <div className="resumeDetail_body">
              <div className="resumeDetail_body_haeder">간단소개글</div>
                <div className="resumeDetail_body_guide">
                  <p className="resumeDetail_body_guide_text">
                    • 본인의 업무 경험을 기반으로 핵심역량과 업무 스킬을 간단히 작성해주세요. <br/> • 3~5줄로
                    요약하여 작성하는 것을 추천합니다!
                  </p>
                </div>
              <div>
                <textarea id="short_intro" 
                  placeholder="소개글을 입력해주세요."> </textarea>
                  {/* placeholder="소개글을 입력해주세요.">${result.shortIntro}</textarea> */}
              </div>
            </div>

            <div className="resumeDetail_body">
              <div className="resumeDetail_body_haeder">경력</div>
              <div className="resumeDetail_body_guide">
                <p className="resumeDetail_body_guide_text">
                  • 담당하신 업무 중 우선순위가 높은 업무를 선별하여 최신순으로 작성해주세요. <br/>
                  • 신입의 경우, 직무와 관련된 대외활동, 인턴, 계약직 경력 등이 있다면 작성해주세요. <br/>
                  • 업무 또는 활동 시 담당했던 역할과 과정, 성과에 대해 자세히 작성해주세요. <br/>
                  • 현재 재직중이면 퇴사일을 해당월로 입력해주세요.
                </p>
              </div>

              <div className="listDiv">
                <button type="button" className="showTableBtn" id="career">+ 추가</button>
                <ul>
                  <li className="list" id="careerList"> (조회값 여기 추가) </li>
                  <li id="careerInputTable">
                    <table className="col">
                      <tr>
                        <td>
                          <input type="text" id="company"
                          placeholder="회사명" />
                        </td>
                        <td>입사일 : 
                          <input type="month" id="startDate" />
                        </td>
                        <td>퇴사일 : 
                          <input type="month" id="endDate" />
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <input type="text" id="dept"
                          placeholder="근무부서" />
                          
                        </td>
                        <td>
                          <input type="text" id="position"
                          placeholder="직책/직급" />

                        </td>
                        <td><input type="text" id="reason"
                          placeholder="퇴사사유" />
                        </td>
                      </tr>
                      <tr>
                        <td colSpan={3}>
                          <textarea id="crrDesc" 
                          placeholder="  담당업무를 입력해주세요.&#13;&#10;&#13;&#10; - 진행한 업무를 다 적기 보다는 경력사항 별로 중요한 내용만 엄선해서 작성하는 것이 중요합니다!&#13;&#10; - 경력별 프로젝트 내용을 적을 경우, 역할/팀구성/기여도/성과를 기준으로 요약해서 작성해보세요!" />
                        </td>
                      </tr>
                    </table>
                    <div className="inputBtnGroup">
                      <a className="btnType gray cancleBtn" id="career" href="#"><span>취소</span></a>
                      <a className="btnType blue" href="javascript:insertCareer()"><span>저장</span></a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="resumeDetail_body">
              <div className="resumeDetail_body_haeder">학력</div>
              <div className="resumeDetail_body_guide">
                <p className="resumeDetail_body_guide_text">• 최신순으로 작성해주세요.</p>
              </div>
              <div className="listDiv">
                <button type="button" className="showTableBtn" id="education">+ 추가</button>
                <ul>
                  <li className="list" id="educationList">
                    {/* 조회값 여기에 추가 */}
                  </li>
                  <li id="educationInputTable">
                    <table className="col">
                      <tbody>
                        <tr>
                          <td>
                            <select id="eduLevel"> 
                              <option value="none">학력구분</option>
                              <option value="고등학교">고등학교</option>
                              <option value="대학교">대학교</option>
                              <option value="대학원(석사)">대학원(석사)</option>
                              <option value="대학원(박사)">대학원(박사)</option>
                            </select>
                          </td>
                          <td>
                            <input type="text" id="schoolName"
                            placeholder="학교명" />
                          </td>
                          <td>
                            <input type="text" id="major"
                            placeholder="전공명" />
                          </td>
                        </tr>
                        <tr>
                          <td>입학일 : 
                            <input type="month" id="admDate" />

                          </td>
                          <td>졸업일 : 
                            <input type="month" id="grdDate" />

                          </td>
                          <td>
                            <select id="grdStatus">
                              <option value="none">졸업여부</option>
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
                      <a className="btnType gray cancleBtn" id="education" href="#"><span>취소</span></a> 
                      <a className="btnType blue" href="javascript:insertEdu()"><span>저장</span></a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="resumeDetail_body">
              <div className="resumeDetail_body_haeder">스킬</div>
              <div className="resumeDetail_body_guide">
                <p className="resumeDetail_body_guide_text">
                  • 개발 스택, 디자인 툴, 마케팅 툴 등 가지고 있는 직무와 관련된 스킬을 추가해 보세요. <br/>
                  • 데이터 분석 툴이나 협업 툴 등 사용해 본 경험이 있으신 툴들도 추가해 보세요.
                </p>
              </div>
              <div className="listDiv">
                <button type="button" className="showTableBtn" id="skill">+ 추가</button>
              </div>
              <ul>
                <li className="list" id="skillList">
                  {/* 조회값 여기에 추가 */}
                </li>
                <li id="skillInputTable">
                  <table className="row">
                    <colgroup>
                      <col width="30%" />
                      <col width="70%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <td>
                          <input type="text" id="skillName" placeholder="스킬명" />
                        </td>
                        <td>
                          <textarea id="skillDetail" placeholder="&#13;&#10;스킬상세기재"></textarea>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="inputBtnGroup">
                    <a className="btnType gray cancleBtn" id="skill" href="#"><span>취소</span></a>
                    <a className="btnType blue" href="javascript:insertSkill()"><span>저장</span></a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="resumeDetail_body">
              <div className="resumeDetail_body_haeder">자격증 및 외국어</div>
              <div className="resumeDetail_body_guide">
                <p className="resumeDetail_body_guide_text">
                  • 직무 관련 자격증, 외국어 자격증이나 수료한 교육 등이 있다면 간략히 작성해 주세요. <br/>
                  • 지원하는 회사에서 요구하는 경우가 아니라면 운전 면허증과 같은 자격증은 생략하는 것이 좋습니다!
                </p>
              </div>
              <div className="listDiv">
                <button type="button" className="showTableBtn" id="certification">+ 추가</button>
              </div>
              <ul>
                <li className="list" id="certificationList">
                  {/* 조회값 여기에 추가 */}
                </li>
                <li id="certificationInputTable">
                  <table className="col">
                    <colgroup>
                      <col width="20%" />
                      <col width="20%" />
                      <col width="20%" />
                      <col width="40%" />
                    </colgroup>
                    <tbody>
                      <tr>
                        <td>
                          <input type="text" id="certName"
                          placeholder="자격증명" />
                        </td>
                        <td>
                          <input type="text" id="grade"
                          placeholder="등급" />
                        </td>
                        <td>
                          <input type="text" id="issuer"
                          placeholder="발행처" />
                        </td>
                        <td>
                          취득일자 : <input type="month" id="acqDate" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="inputBtnGroup">
                    <a className="btnType gray cancleBtn" id="certification" href="#"><span>취소</span></a> 
                    <a className="btnType blue" href="javascript:insertCert()"><span>저장</span></a>
                  </div>
                </li>
              </ul>
            </div>

            <div className="resumeDetail_body">
              <div className="resumeDetail_body_haeder">링크</div>
              <div className="resumeDetail_body_guide">
                <p className="resumeDetail_body_guide_text">• 깃허브, 노션으로 작성한
                  포트폴리오, 구글 드라이브 파일 등 업무 성과를 보여줄 수 있는 링크가 있다면 작성해주세요.</p>
              </div>
              <div>
                <input id="pfo_link"
                  type="text" value="${result.proLink}" placeholder="https://" />
              </div>
            </div>

            <div className="resumeDetail_body">
              <div className="resumeDetail_body_haeder">자기소개서</div>
              <div className="resumeDetail_body_guide">
                <p className="resumeDetail_body_guide_text">
                  • 지원 동기, 직무 역량, 직무 관련 성과와 경험, 포부 등 자유롭게 작성해 주세요.
                </p>
              </div>
              <div>
                <textarea
                  id="personalStatement"
                  placeholder="자기소개서를 입력해주세요."> </textarea>
              </div>
            </div>

            <div className="resumeDetail_body">
              <div className="resumeDetail_body_haeder">첨부파일</div>
              <div className="resumeDetail_body_guide">
                <p className="resumeDetail_body_guide_text">
                  • 포트폴리오, 경력 기술서 등 첨부 파일이 있다면 등록해 주세요.
                </p>
              </div>
              <div>
                {/* <c:if test="${empty result.fileName}">
                  <input id="resumeAttach" type="file">
                </c:if>
                <c:if test="${not empty result.fileName}">
                <div className="attach-container">
                    <a href="attachment-download?resumeNum=${result.resIdx}"><span className="attach-fileName">${result.fileName}</span></a>
                    <button className="attach-delete" id="attach-delete" onclick="deleteAttach()">
                        <svg xmlns="http://www.w3.org/2000/svg" height="25px" viewBox="0 -960 960 960" width="25px" fill="#5f6368">
                            <path d="M312-144q-29.7 0-50.85-21.15Q240-186.3 240-216v-480h-48v-72h192v-48h192v48h192v72h-48v479.57Q720-186 698.85-165T648-144H312Zm336-552H312v480h336v-480ZM384-288h72v-336h-72v336Zm120 0h72v-336h-72v336ZM312-696v480-480Z" />
                        </svg>
                    </button>
                </div>
                </c:if> */}
              </div>
            </div>

          </div>
          <div className="btnGroup"  style={{ textAlign: "center" }}>
            <Button 
              variant="secondary" 
              style={{ margin: "2px" }}
              onClick={handlerReturn}
            >
              <span>목록으로</span>
            </Button>
            <Button 
              variant="primary" 
              style={{ margin: "2px" }}
              onClick={handlerSave}
            >
              <span>저장하기</span>
            </Button>
            <Button 
              variant="secondary" 
              style={{ margin: "2px" }}
              onClick={() => handlerPreview(resumeSeq)}
            >
              <span>미리보기</span>
            </Button>
          </div>

        </div>
      </div>

      {modal && (
        <Portal>
          <ResumeModalPreview
            onSuccess={onPostSuccess}
            resumeSeq={resumeSeq}
            setResumeSeq={setResumeSeq}
          />
        </Portal>
      )}
    </StyledTable>
    // </ResumeDetailStyled>
  );
};
