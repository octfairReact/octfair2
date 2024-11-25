import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Portal } from "../../../common/potal/Portal";
import { ResumeModalPreview } from "../ResumeModal/ResumeModalPreview";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { postApi } from '../../../../api/postApi';
import { IPostResponse, IResumeDetail, IResumeDetailReponse, IResumeSkill } from '../../../../models/interface/IResume';
import { Resume } from '../../../../api/api';
import { StyledTableResume } from '../Style/StyledTableResume';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ResumeCareer } from './ResumeCareer';
import { ResumeEdu } from './ResumeEdu';
import { ResumeSkill } from './ResumeSkill';
import { ResumeCert } from './ResumeCert';

export const ResumeDetail = () => {
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [resumeDetail, setResumeDetail] = useState<IResumeDetail>();

  const [resumeSeq, setResumeSeq] = useState<number>();
  const [careerVisible, setCareerVisible] = useState(true);
  const [fileData, setFileData] = useState<File>();
  // const { searchKeyWord } = useContext(ResumeContext);
  const location = useLocation();
  const navigate = useNavigate();

  const resTitle = useRef<HTMLInputElement>();
  const pfoLink = useRef<HTMLInputElement>();
  const shortIntro = useRef(null);
  const perStatement = useRef(null);

  const fileNm = useRef<HTMLInputElement>();
  const fileLoc = useRef<HTMLInputElement>();
  const vrfileLoc = useRef<HTMLInputElement>();
  const fileSize = useRef<HTMLInputElement>();
  const fileExtension = useRef<HTMLInputElement>();

  const crrDesc   = useRef(null);

  useEffect(() => {
    location.state.idx && searchDetail(location.state.idx);
    !location.state.idx && insertNew();
    
    // if ("new" === location?.state?.pageForm){
    //   // setResumeSeq(location.state.idx);
    //   insertNew();
    // } else {
    //   setResumeSeq(location.state.idx);
    //   searchDetail(location.state.idx);
    // }

    // if (location?.state?.pageFrom) {
    //   setPageFrom(location.state.pageFrom);
    // }
  }, []);

  const insertNew = async () => {
    const searchParam = {};
    const newList = await postApi<IResumeDetailReponse>( Resume.getNew, searchParam );

    console.log(newList);
    if (newList) { setResumeDetail(newList.payload); }
  }

  const searchDetail = async (resumeSeq: number) => {
    const searchParam = { resIdx: resumeSeq };
    const detailList = await postApi<IResumeDetailReponse>( Resume.getDetail, searchParam );

    if (detailList) { setResumeDetail(detailList.payload); }
  }

  const handlerReturn = () => {
    navigate('/react/apply/resume.do');
  }

  // const handlerFileSave = async () => {
  //   const formData = new FormData();
  //   formData.append("file", fileData);
  //   formData.append('res_title', resTitle.current.value);
  //   formData.append('short_intro', shortIntro.current.value);
  //   formData.append('pfo_link', pfoLink.current.value);
  //   formData.append('per_statement', perStatement.current.value);

  //   // const params = {
  //   //   res_title: resTitle.current.value,
  //   //   short_intro: shortIntro.current.value,
  //   //   pfo_link: pfoLink.current.value,
  //   //   per_statement: perStatement.current.value,
  //   //   fileInfo: {
  //   //     file_nm: '',
  //   //     file_loc: '',
  //   //     vrfile_loc: '',
  //   //     file_size: '',
  //   //     fileExtension: '',
  //   //     // file_nm: fileNm.current.value,
  //   //     // file_loc: fileLoc.current.value,
  //   //     // vrfile_loc: vrfileLoc.current.value,
  //   //     // file_size: fileSize.current.value,
  //   //     // fileExtension: fileExtension.current.value,
  //   //   }
  //   // }

  //   formData && fileForm.append("file", fileData);
  //   fileForm.append(
  //     "text",
  //     new Blob([JSON.stringify(params)], { type: "application/json" })
  //   );

  //   console.log(fileForm);

  //   axios
  //     .post("/api/apply/resumeUpdate.do", fileForm)
  //     .then((res: AxiosResponse<IPostResponse>) => {
  //       console.log(res);
  //       // res.data.result === "success" && onSuccess();
  //     });


  //   // console.log(params);

  //   // const saveList = await postApi<IResumeDetailReponse>(Resume.getUpdate, params);

  //   // if (saveList.payload) {
  //   //   console.log(saveList);
  //   //   console.log(saveList.payload);
  //   //   alert("저장 메시지");
  //   // }

  // }

  const handlerSave = async () => {
    const fileForm = new FormData();
    const params = {
      res_title: resTitle.current.value,
      short_intro: shortIntro.current.value,
      pfo_link: pfoLink.current.value,
      per_statement: perStatement.current.value,
      fileInfo: {
        file_nm: '',
        file_loc: '',
        vrfile_loc: '',
        file_size: '',
        fileExtension: '',
        // file_nm: fileNm.current.value,
        // file_loc: fileLoc.current.value,
        // vrfile_loc: vrfileLoc.current.value,
        // file_size: fileSize.current.value,
        // fileExtension: fileExtension.current.value,
      }
    }

    fileData && fileForm.append("file", fileData);
    fileForm.append(
      "text",
      new Blob([JSON.stringify(params)], { type: "application/json" })
    );

    console.log(fileForm);

    axios
      .post("/api/apply/resumeUpdate.do", fileForm)
      .then((res: AxiosResponse<IPostResponse>) => {
        console.log(res);
        // res.data.result === "success" && onSuccess();
      });


    // console.log(params);

    // const saveList = await postApi<IResumeDetailReponse>(Resume.getUpdate, params);

    // if (saveList.payload) {
    //   console.log(saveList);
    //   console.log(saveList.payload);
    //   alert("저장 메시지");
    // }

  }

  const handlerPreview = (resumeSeq: number) => {
    setModal(!modal);
    setResumeSeq(resumeSeq);
  }


  // const handlerFile = (e: ChangeEvent<HTMLInputElement>) => {
  //   const fileInfo = e.target.files;
  //   if (fileInfo?.length > 0) {
  //     const fileInfoSplit = fileInfo[0].name.split(".");
  //     const fileExtension = fileInfoSplit[1].toLowerCase();

  //     if (
  //       fileExtension === "jpg" ||
  //       fileExtension === "gif" ||
  //       fileExtension === "png"
  //     ) {
  //       setImageUrl(URL.createObjectURL(fileInfo[0]));
  //     } else {
  //       setImageUrl("");
  //     }

  //     setFileData(fileInfo[0]);
  //   }
  // }

  const downloadFile = async (resIdx: number) => {
    axios.post('/api/apply/fileDownload.do', { resIdx: resIdx },{
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
              <div className="mb-3">
                <input 
                  id="resumetitle" 
                  className="form-control form-control-lg form-control-plaintext" 
                  type="text" 
                  placeholder="이력서 제목" 
                  defaultValue={resumeDetail?.resTitle}
                  ref={resTitle}
                />
                <input 
                  id="userName" 
                  className="form-control form-control-sm form-control-plaintext"
                  type="text" 
                  placeholder="이름" 
                  defaultValue={resumeDetail?.userNm}
                  readOnly 
                />
                <input 
                  id="userEmail" 
                  className="form-control form-control-sm form-control-plaintext" 
                  type="email" 
                  placeholder="이메일" 
                  defaultValue={resumeDetail?.email}
                  readOnly 
                />
                <input 
                  id="userPhone" 
                  className="form-control form-control-sm form-control-plaintext"
                  type="text" 
                  placeholder="연락처" 
                  defaultValue={resumeDetail?.phone}
                  readOnly 
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
                      ref={shortIntro} 
                    />
                  </div>
                ) : (
                  <div className="mb-3">
                    <textarea 
                      className="form-control" id="short_intro" 
                      placeholder="소개글을 입력해 주세요." 
                      rows={10} 
                      defaultValue={""} 
                      ref={shortIntro} 
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
                  ref={pfoLink} 
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
                  ref={perStatement} 
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
                  <div className="input-group mb-3" onClick={() => downloadFile(resumeDetail?.resIdx)}>
                    <div className="form-control" style={{ cursor: "pointer" }}>
                      {resumeDetail?.fileName}
                    </div>
                    <input
                      type="file"
                      id="resumeAttach"
                      style={{ display: "none" }}
                      // onChange={handlerFile}
                    />
                  </div>
                ) : (
                  <div className="input-group mb-3">
                    <input type="file" className="form-control" id="resumeAttach" />
                  </div>
                )}
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
