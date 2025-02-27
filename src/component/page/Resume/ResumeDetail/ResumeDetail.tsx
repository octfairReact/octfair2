import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Button } from "react-bootstrap";
import { Portal } from "../../../common/potal/Portal";
import { IResumeCareerReponse, IResumeDetail, IResumeDetailReponse } from '../../../../models/interface/IResume';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { ResumeModalPreview } from "../ResumeModal/ResumeModalPreview";
import { modalState } from "../../../../stores/modalState";
import { postApi } from '../../../../api/postApi';
import { Resume } from '../../../../api/api';
import { StyledTableResume } from '../Style/StyledResume';
import { ResumeCareer } from './ResumeCareer';
import { ResumeEdu } from './ResumeEdu';
import { ResumeSkill } from './ResumeSkill';
import { ResumeCert } from './ResumeCert';
import { RiDeleteBin6Line } from "react-icons/ri";
import swal from 'sweetalert';

export const ResumeDetail = () => {
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [resumeDetail, setResumeDetail] = useState<IResumeDetail>();
  const [resIdx, setResIdx] = useState<number>();
  const location = useLocation();
  const navigate = useNavigate();
  const resTitle = useRef<HTMLInputElement>();
  const pfoLink = useRef<HTMLInputElement>();
  const shortIntro = useRef(null);
  const perStatement = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (location.state.idx) {
      setResIdx(location.state.idx);
      searchDetail(location.state.idx);
    } else {
      insertNew();
    }
  }, []);
  
  const TextareaAutoResize = useCallback(() => {
    if(shortIntro.current) {
      shortIntro.current.style.height = 'auto';
      shortIntro.current.style.height = shortIntro.current.scrollHeight + 'px';
    }

    if(perStatement.current) {
      perStatement.current.style.height = 'auto';
      perStatement.current.style.height = perStatement.current.scrollHeight + 'px';
    }
  }, [])

  useEffect(() => {
    TextareaAutoResize();
  }, [resumeDetail, TextareaAutoResize]);

  const insertNew = async () => {
    const newList = await postApi<IResumeDetailReponse>( Resume.getNew, {});

    if (newList) {
      setResIdx(newList.payload.resIdx);
      setResumeDetail(newList.payload);
      navigate('/react/apply/resumeDetail.do', { state: { idx: newList.payload.resIdx } });
    }
  }

  const searchDetail = async (resIdx: number) => {
    const detailList = await postApi<IResumeDetailReponse>( Resume.getDetail, {resIdx});

    if (detailList) { 
      setResumeDetail(detailList.payload);
    }
  }

  const handlerReturn = () => {
    navigate('/react/apply/resume.do');
  }

  const handlerPreview = (resIdx: number) => {
    setModal(!modal);
  }

  const handlerFileUpdate = () => {
    const fileForm = new FormData();
    fileForm.append('res_title', resTitle.current.value);
    fileForm.append('short_intro', shortIntro.current.value);
    fileForm.append('pfo_link', pfoLink.current.value);
    fileForm.append('per_statement', perStatement.current.value);
    fileForm.append('resIdx', resIdx.toString());

    const fileInput = fileInputRef.current;
    if (fileInput && fileInput.files[0]) {
        fileForm.append('file', fileInput.files[0]);
    }

    axios
      .post('/api/apply/resumeUpdate.do', fileForm)
      .then((res) => {
          swal("저장 완료", "저장되었습니다.", "success");
          searchDetail(resIdx);
      }).catch((err) => {});
  };

  const handlerDeleteFile = async () => {
    const deleteList = await postApi<IResumeCareerReponse>(Resume.deleteFile, {resIdx});

    if (deleteList) {
      swal("삭제 완료", "삭제되었습니다.", "success");
      searchDetail(resIdx);
    }
  }

  const downloadFile = async (resIdx: number) => {
    axios.post('/api/apply/fileDownload.do', {resIdx}, {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
    }).then((res) => {
        const file = new Blob([res.data], { type: res.headers['content-type'] });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = res.headers['content-disposition'].split('filename*=UTF-8\'\'')[1]; // 헤더에서 파일명 추출
        link.click(); 
        URL.revokeObjectURL(link.href);    
    })
  };

  return (
    <StyledTableResume>
      <div id="container">
        <div className="resumeDetail_body_wrap">
          <div className="resumeDetail_body_basicInfo">
            <div className="mb-3">
              <input 
                id="resumetitle" 
                className="form-control form-control-lg form-control-plaintext" 
                type="text" 
                placeholder="이력서 제목" 
                defaultValue={resumeDetail?.resTitle}
                ref={resTitle}
              />
              <div id="userName">{resumeDetail?.userNm}</div>
              <div id="userEmail">{resumeDetail?.email}</div>
              <div id="userPhone">{resumeDetail?.phone}</div>
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
            </div>
            <div>
              <div className="mb-3">
                <textarea 
                  className="form-control" id="short_intro" 
                  placeholder="소개글을 입력해 주세요." 
                  rows={5} 
                  defaultValue={resumeDetail?.shortIntro} 
                  ref={shortIntro} 
                  onChange={TextareaAutoResize} 
                  style={{ overflow: "hidden" }} 
                />
              </div>
            </div>
          </div>

          {/* 경력 */}
          <ResumeCareer resIdx={resIdx} />
          {/* 학력 */}
          <ResumeEdu resIdx={resIdx} />
          {/* 스킬 */}
          <ResumeSkill resIdx={resIdx} />
          {/* 자격증 및 외국어 */}
          <ResumeCert resIdx={resIdx} />

          <div className="resumeDetail_body">
            <div className="resumeDetail_body_haeder">링크</div>
            <div className="resumeDetail_body_guide">
              <Alert key={'light'} variant={'light'}>
                • 깃허브, 노션으로 작성한 포트폴리오, 구글 드라이브 파일 등 업무 성과를 보여줄 수 있는 링크가 있다면 작성해 주세요.
              </Alert>
            </div>
            <div>
              <input 
                id="proLink"
                className="form-control form-control-lg" 
                type="text" 
                placeholder="https://" 
                defaultValue={resumeDetail?.proLink}
                ref={pfoLink} 
              />
            </div>
          </div>

          <div className="resumeDetail_body">
            <div className="resumeDetail_body_haeder">자기소개서</div>
            <div className="resumeDetail_body_guide">
              <Alert key={'light'} variant={'light'}>
                • 지원 동기, 직무 역량, 직무 관련 성과와 경험, 포부 등 자유롭게 작성해 주세요.
              </Alert>
            </div>
            <div>
              <textarea 
                className="form-control" id="personalStatement" 
                placeholder="자기소개서를 입력해 주세요."
                rows={5}
                defaultValue={resumeDetail?.perStatement}
                ref={perStatement}  
                onChange={TextareaAutoResize} 
                style={{ overflow: "hidden" }} 
              />
            </div>
          </div>

          <div className="resumeDetail_body">
            <div className="resumeDetail_body_haeder">첨부파일</div>
            <div className="resumeDetail_body_guide">
              <Alert key={'light'} variant={'light'}>
                • 포트폴리오, 경력 기술서 등 첨부 파일이 있다면 등록해 주세요.
              </Alert>
            </div>
            <div>
              {resumeDetail?.fileName ? (
                <div className="input-group mb-3">
                  <div className="form-control" style={{ cursor: "pointer" }}>
                    <span id="fileName" onClick={() => downloadFile(resumeDetail?.resIdx)}>
                      {resumeDetail?.fileName}
                    </span>
                    <span id="deleteIcon" onClick={() => handlerDeleteFile()}>
                      <RiDeleteBin6Line />
                    </span>
                  </div>
                  <input type="file" style={{ display: "none" }} ref={fileInputRef} />
                </div>
              ) : (
                <div className="input-group mb-3">
                  <input type="file" className="form-control" ref={fileInputRef} />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="btnGroup">
          <Button variant="secondary" onClick={handlerReturn}>
            <span>목록으로</span>
          </Button>
          <Button variant="primary" onClick={handlerFileUpdate}>
            <span>저장하기</span>
          </Button>
          <Button variant="secondary" onClick={() => handlerPreview(resIdx)}>
            <span>미리보기</span>
          </Button>
        </div>
      </div>

      {modal && (
        <Portal>
          <ResumeModalPreview resumeSeq={resIdx} />
        </Portal>
      )}
    </StyledTableResume>
  );
};