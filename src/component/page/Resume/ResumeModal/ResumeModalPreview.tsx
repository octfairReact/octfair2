import { FC, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import axios from 'axios';
import { IResumeCareer, IResumeCertification, IResumeDetail, IResumeEducation, IResumeSkill } from '../../../../models/interface/IResume';
import { postApi } from '../../../../api/postApi';
import { HireApplicant } from '../../../../api/api';
import { IPreviewResume } from '../../../../models/interface/IHireApplicant';
import { ResumeModalStyled } from './ResumeModalStyled';

export const downloadFile = (resIdx) => {
  axios.post('/api/manage-hire/attachment-download.do', resIdx, {
    headers: {
      'Content-Type': 'application/json',  // 서버가 JSON 형식의 요청을 받도록 지정
    },
    responseType: 'blob',  // 파일 데이터를 받기 위해 'blob' 응답 타입 사용
  }).then((res) => {
    const file = new Blob([res.data], { type: res.headers['content-type'] });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(file);
    link.download = res.headers['content-disposition'].split('filename*=UTF-8\'\'')[1]; // 헤더에서 파일명 추출
    link.click();
    URL.revokeObjectURL(link.href);
  })
};
interface IResumeModalProps {
  resumeSeq: number;
}

export const ResumeModalPreview: FC<IResumeModalProps> = ({
  resumeSeq,
}) => {
  const [modal, setModal] = useRecoilState<boolean>(modalState); // recoil에 저장된 state
  const [resumeInfo, setResumeInfo] = useState<IResumeDetail>();
  const [careerInfo, setCareerInfo] = useState<IResumeCareer[] | null>();
  const [eduInfo, setEduInfo] = useState<IResumeEducation[] | null>();
  const [skillInfo, setSkillInfo] = useState<IResumeSkill[] | null>();
  const [certInfo, setCertInfo] = useState<IResumeCertification[] | null>();
  const [show] = useState(true);

  useEffect(() => {
    resumeSeq && modalDetail(); // 컴포넌트 생성될 때 실행    
  }, );

  const modalDetail =  async () => {
    const param = {
      resIdx: resumeSeq
    }

    const priviewDetail = await postApi<IPreviewResume>(
      HireApplicant.previewResume,
      param
    )
    if(priviewDetail){
      setResumeInfo(priviewDetail.resumeInfo);
      setCareerInfo(priviewDetail.careerInfo);
      setEduInfo(priviewDetail.eduInfo);
      setSkillInfo(priviewDetail.skillInfo);
      setCertInfo(priviewDetail.certInfo);
    }
  }

  const handleClose = () => setModal(!modal);
  

  const handlePrint = () => {
    const printContent = document.getElementById("previewResumeContent")?.innerHTML;
    const originContent = document.body.innerHTML;
    window.onbeforeprint = () => {
      if (printContent) {
        document.body.innerHTML = printContent;
      }
    };

    window.onafterprint = () => {
      document.body.innerHTML = originContent;
      window.location.reload();
    };
    window.print();
  }

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
    >
      <ResumeModalStyled>
      <Modal.Header closeButton>
          <strong>이력서 미리 보기</strong>
      </Modal.Header>
      <Modal.Body>
        <div id="previewResumeContent">
          <div id="previewContentTitle">
            <p id="previewTitle">{resumeInfo?.resTitle}</p>
          </div>
          <div>
            <p>이름 : {resumeInfo?.userNm}</p>
          </div>
          <div>
            <p>이메일 : {resumeInfo?.email}</p>
          </div>
          <div>
            <p>연락처 : {resumeInfo?.phone}</p>
          </div>
          <div id='introAndLink'>
            {resumeInfo?.shortIntro !== null &&
              <div>
                <p >{resumeInfo?.shortIntro}</p>
              </div>
              }

            {resumeInfo?.proLink !== null &&
              <div>
                <p >링크 :
                  <a href={resumeInfo?.proLink} target="_blank" id="linkPadding"
         rel="noopener noreferrer">{resumeInfo?.proLink}</a>                  
                </p>
              </div>
              }

            {resumeInfo?.fileName !== null &&
              <div>
                <p>첨부파일 :
                <span id="addFile" onClick={() => downloadFile(resumeInfo?.resIdx)}>
                 {resumeInfo?.fileName}</span>
                </p>
              </div>
              }
          </div>

          {careerInfo?.length > 0 && (
            <Modal.Body>
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th scope="col" colSpan={2}>경력</th>
                  </tr>
                </thead>
                <tbody>
                  {careerInfo?.map((data) => {
                    return (
                      <tr key={data.crrIdx}>
                        <td>{data.startDate} ~ <br /> {data.endDate}</td>
                        <td><span className='companyPosition'>{data.company} | {data.dept} |
                          {data.position}</span>
                          <p className='companyPositionP'>{data.crrDesc}</p>
                        </td>
                      </tr>
                    )
                  })
                  }
                </tbody>
              </table>
            </Modal.Body>
          ) }

          {eduInfo?.length > 0 && (
            <Modal.Body>
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th colSpan={3} scope="col">학력</th>
                  </tr>
                </thead>
                <tbody>
                  {eduInfo?.map((data) => {
                    return (
                      <tr key={data.eduIdx}>
                        <td>{data.grdStatus}</td>
                        <td><span className='major'>{data.schoolName}</span>
                          {data.major !== null && (
                            <>
                               | <span className='major'>{data.major}</span> 
                            </>
                          ) }
                        </td>
                        <td>{data.admDate} ~ {data.grdDate}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </Modal.Body>
          ) }

          {skillInfo?.length > 0 && (
            <Modal.Body>
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th scope="col" colSpan={2}>스킬</th>
                  </tr>
                </thead>
                <tbody>
                  {skillInfo?.map((data) => {
                    return (
                      <tr key={data.skillIdx}>
                        <td>{data.skillName}</td>
                        <td>{data.skillDetail}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </Modal.Body>
          )}

          {certInfo?.length > 0 && (
            <Modal.Body>
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th scope="col" colSpan={4}>자격증 및 외국어</th>
                  </tr>
                </thead>
                <tbody>
                  {certInfo?.map((data) => {
                    return (
                      <tr key={data.certIdx}>
                        <td>{data.acqDate}</td>
                        <td>{data.certName}</td>
                        <td>{data.grade}</td>
                        <td>{data.issuer}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </Modal.Body>
          ) }

          {resumeInfo?.perStatement !== null && (
            <Modal.Body>
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th scope="col">자기소개서</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td id="perStatementTd">
                      <p id="perStatementP">
                        {resumeInfo?.perStatement}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Modal.Body>
          ) }
        </div>
      </Modal.Body >
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          닫기
        </Button>
        <Button variant="primary" onClick={handlePrint}>
          인쇄
        </Button>
      </Modal.Footer>
      </ResumeModalStyled>
    </Modal >
  );
};