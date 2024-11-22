import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Portal } from "../../../common/potal/Portal";
import { ResumeModalPreview } from "../ResumeModal/ResumeModalPreview";
import { useContext, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { postApi } from '../../../../api/postApi';
import { IResumeCareer, IResumeCareerReponse, IResumeCertification, IResumeCertificationReponse, IResumeDetail, IResumeDetailReponse, IResumeEducation, IResumeEducationReponse, IResumeSkill, IResumeSkillReponse } from '../../../../models/interface/IResume';
import { Resume } from '../../../../api/api';
import { StyledTableResume } from '../Style/StyledTableResume';
// import { ResumeContext } from '../../../../api/provider/ResumeProvider';
import { ResumeCareerAdd } from './ResumeCareerAdd';
import axios, { AxiosRequestConfig } from 'axios';
import { ResumeCareer } from './ResumeCareer';
import { ResumeEdu } from './ResumeEdu';
import { ResumeSkill } from './ResumeSkill';
import { ResumeCert } from './ResumeCert';

export const ResumeDetail = () => {
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [resumeDetail, setResumeDetail] = useState<IResumeDetail>();

  const [skillList, setSkillList] = useState<IResumeSkill[]>();
  const [resumeSeq, setResumeSeq] = useState<number>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [fileData, setFileData] = useState<File>();
  const [careerVisible, setCareerVisible] = useState(true);
  // const { searchKeyWord } = useContext(ResumeContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location?.state){
      setResumeSeq(location.state.idx);
      searchDetail(location.state.idx);
    }
  }, []);

  const searchDetail = async (resumeSeq: number) => {
    const searchParam = { resIdx: resumeSeq };
    const detailList = await postApi<IResumeDetailReponse>( Resume.getDetail, searchParam );

    if (detailList) { setResumeDetail(detailList.payload); }
  }

  const handlerReturn = () => {
    navigate('/react/apply/resume.do');
  }

  const handlerSave = () => {}

  const handlerCancel = () => {}

  const handlerPreview = (resumeSeq: number) => {
    setModal(!modal);
    setResumeSeq(resumeSeq);
  }

  const downloadFile = async () => {
    const param = new URLSearchParams();
    param.append("resumeSeq", resumeSeq.toString());

    const postAction: AxiosRequestConfig = {
      url: "/api/apply/fileDownload.do",
      method: "POST",
      data: param,
      responseType: "blob",
    };

    await axios(postAction).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", resumeDetail?.fileName as string);
      document.body.appendChild(link);
      link.click();

      link.remove(); // 다운로드 후 a태그 삭제
    });
  };

  const onPostSuccess = () => {
    setModal(!modal);
    // 프린트할 경우
  }

  // const handleResizeHeight = () => {
  //   textarea.current.style.height = 'auto'; //height 초기화
  //   textarea.current.style.height = textarea.current.scrollHeight + 'px';
  // };

  return (
    // <ResumeDetailStyled>
    <StyledTableResume>
      <div id="container">
        {/* <div className="content"> */}
          <div className="resumeDetail_body_wrap">

            <div className="resumeDetail_body_basicInfo">
              <div>
                {/* <input
                  style={{ border: "none"; font-size: "30px"; margin-bottom: "20px"; padding: "5px" }}
                  id="resumetitle" type="text" value="${result.resTitle}" data-num="${result.resIdx}" placeholder="이력서 제목"> */}
              </div>

              <div className="mb-3">
                <input 
                  id="resumetitle" 
                  className="form-control form-control-lg form-control-plaintext" 
                  type="text" 
                  placeholder="이력서 제목" 
                  defaultValue={resumeDetail?.resTitle}
                />
                <input 
                  id="userName" 
                  className="form-control form-control-sm form-control-plaintext"
                  type="text" 
                  placeholder="이름" 
                  defaultValue={resumeDetail?.userNm}
                />
                <input 
                  id="userEmail" 
                  className="form-control form-control-sm form-control-plaintext" 
                  type="email" 
                  placeholder="이메일" 
                  defaultValue={resumeDetail?.email}
                />
                <input 
                  id="userPhone" 
                  className="form-control form-control-sm form-control-plaintext"
                  type="text" 
                  placeholder="연락처" 
                  defaultValue={resumeDetail?.phone}
                />
              </div>
            </div>

            <div className="resumeDetail_body">
              <div className="resumeDetail_body_haeder">간단 소개글</div>
              <div className="resumeDetail_body_guide">
                <div className="resumeDetail_body_guide_text">
                  <Alert key={'light'} variant={'light'}>
                    • 본인의 업무 경험을 기반으로 핵심 역량과 업무 스킬을 간단히 작성해 주세요. <br/>
                    • 3~5줄로 요약하여 작성하는 것을 추천합니다!
                  </Alert>
                </div>
                {/* <p className="resumeDetail_body_guide_text">
                  • 본인의 업무 경험을 기반으로 핵심역량과 업무 스킬을 간단히 작성해주세요. <br/> • 3~5줄로
                  요약하여 작성하는 것을 추천합니다!
                </p> */}
              </div>
              <div>
              {resumeDetail? (
                <div className="mb-3">
                  <textarea 
                    className="form-control" id="short_intro" 
                    placeholder="소개글을 입력해 주세요." 
                    rows={10} 
                    defaultValue={resumeDetail.shortIntro} 
                  />
                </div>
              ) : (
                <div className="mb-3">
                  <textarea 
                    className="form-control" id="short_intro" 
                    placeholder="소개글을 입력해 주세요." 
                    rows={10} 
                    defaultValue={""} 
                  />
                </div>
              )}
                
              </div>
            </div>

            {/* 경력 */}
            <ResumeCareer/>

            {/* 학력 */}
            <ResumeEdu/>

            {/* 스킬 */}
            <ResumeSkill/>

            {/* 자격증 및 외국어 */}
            <ResumeCert/>

            <div className="resumeDetail_body">
              <div className="resumeDetail_body_haeder">링크</div>
              <div className="resumeDetail_body_guide">
                {/* <p className="resumeDetail_body_guide_text"> */}
                  <Alert key={'light'} variant={'light'}>
                    • 깃허브, 노션으로 작성한 포트폴리오, 구글 드라이브 파일 등 업무 성과를 보여줄 수 있는 링크가 있다면 작성해 주세요.
                  </Alert>
                {/* </p> */}
              </div>
              <div>
                <input 
                  id="proLink"
                  className="form-control form-control" 
                  type="text" 
                  placeholder="https://" 
                  defaultValue={resumeDetail?.proLink}
                />
              </div>
            </div>

            <div className="resumeDetail_body">
              <div className="resumeDetail_body_haeder">자기소개서</div>
              <div className="resumeDetail_body_guide">
                {/* <p className="resumeDetail_body_guide_text"> */}
                  <Alert key={'light'} variant={'light'}>
                    • 지원 동기, 직무 역량, 직무 관련 성과와 경험, 포부 등 자유롭게 작성해 주세요.
                  </Alert>
                {/* </p> */}
              </div>
              <div>
                <textarea 
                  className="form-control" id="personalStatement" 
                  placeholder="자기소개서를 입력해 주세요."
                  rows={10}
                  defaultValue={resumeDetail?.perStatement}
                />
              </div>
            </div>

            <div className="resumeDetail_body">
              <div className="resumeDetail_body_haeder">첨부파일</div>
              <div className="resumeDetail_body_guide">
                {/* <p className="resumeDetail_body_guide_text"> */}
                  <Alert key={'light'} variant={'light'}>
                    • 포트폴리오, 경력 기술서 등 첨부 파일이 있다면 등록해 주세요.
                  </Alert>
                {/* </p> */}
              </div>
              <div>
                {resumeDetail?.fileName ? (
                  <div className="input-group mb-3" onClick={downloadFile}>
                    <input 
                      type="text" 
                      id="resumeAttach" 
                      className="form-control" 
                      style={{ cursor: "pointer" }}  
                      defaultValue={resumeDetail?.fileName}
                    />
                  </div>
                ) : (
                  <div className="input-group mb-3">
                    {/* <input type="file" className="form-control" id="inputGroupFile01" multiple /> */}
                    <input type="file" className="form-control" id="resumeAttach" />
                  </div>
                )}
                
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

        {/* </div> */}
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
    </StyledTableResume>
  );
};
