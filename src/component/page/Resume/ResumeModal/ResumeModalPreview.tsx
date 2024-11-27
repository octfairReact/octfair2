import { FC, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
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
  onSuccess: () => void;
  resumeSeq: number;
  setResumeSeq: (resumeSeq: number) => void;
}

export const ResumeModalPreview: FC<IResumeModalProps> = ({
  onSuccess,
  resumeSeq,
  setResumeSeq,
}) => {
  const navigate = useNavigate();
  const [modal, setModal] = useRecoilState<boolean>(modalState); // recoil에 저장된 state
  const [resumeInfo, setResumeInfo] = useState<IResumeDetail>();
  const [careerInfo, setCareerInfo] = useState<IResumeCareer[] | null>();
  const [eduInfo, setEduInfo] = useState<IResumeEducation[] | null>();
  const [skillInfo, setSkillInfo] = useState<IResumeSkill[] | null>();
  const [certInfo, setCertInfo] = useState<IResumeCertification[] | null>();

  useEffect(() => {
    resumeSeq && modalDetail(); // 컴포넌트 생성될 때 실행
    console.log("모달 로그1: " + resumeSeq);
    // 클린업 함수, 컴포넌트가 사라지기 직전에 실행
    return () => {
      // resumeSeq && setResumeSeq(undefined);
    };
  }, []);

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
    // axios.post('/api/manage-hire/previewResume.do', param).then((res) => {
    //   const data = res.data;
    //   console.log("모달 로그: ", data.resumeInfo);
    //   setResumeInfo(data.resumeInfo);
    //   setCareerInfo(data.careerInfo);
    //   setEduInfo(data.eduInfo);
    //   setSkillInfo(data.skillInfo);
    //   setCertInfo(data.certInfo);
    // })
  }

  const [show, setShow] = useState(true);



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

  const handleNavigation = (path) => {
    navigate(path);
  };

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
        <div id="previewResumeContent" style={{padding: '20px'}}>
          <div style={{marginBottom: '20px'}}>
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
            {resumeInfo?.shortIntro !== null ?
              <div>
                <p >{resumeInfo?.shortIntro}</p>
              </div>
              : null}

            {resumeInfo?.proLink !== null ?
              <div>
                <p >링크 : &nbsp;
                  <span onClick={() => handleNavigation(resumeInfo?.proLink)} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                    {resumeInfo?.proLink}
                  </span>
                </p>
              </div>
              : null}

            {resumeInfo?.fileName !== null ?
              <div>
                <p>첨부파일 : &nbsp;
                <span onClick={() => downloadFile(resumeInfo?.resIdx)} style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }}>
                 {resumeInfo?.fileName}</span>
                </p>
              </div>
              : null}
          </div>

          {careerInfo?.length > 0 ? (
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
                          <p
                            style={{ marginTop: '20px', marginLeft: '20px', whiteSpace: 'pre-line' }}>{data.crrDesc}</p>
                        </td>
                      </tr>
                    )
                  })
                  }
                </tbody>
              </table>
            </Modal.Body>
          ) : null}

          {eduInfo?.length > 0 ? (
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
                        <td>{data.schoolName}
                          {data.major !== null ? (
                            <>
                              {"\u00A0\u00A0"} | {"\u00A0\u00A0"} {data.major}
                            </>
                          ) : null}
                        </td>
                        <td>{data.admDate} ~ {data.grdDate}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </Modal.Body>
          ) : null}

          {skillInfo?.length > 0 ? (
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
          ) : null}

          {certInfo?.length > 0 ? (
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
          ) : null}

          {resumeInfo?.perStatement !== null ? (
            <Modal.Body>
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th scope="col">자기소개서</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ borderBottom: "1px solid #ccc" }}>
                      <p style={{ padding: "20px", whiteSpace: "pre-line" }}>
                        {resumeInfo?.perStatement}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Modal.Body>
          ) : null}
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