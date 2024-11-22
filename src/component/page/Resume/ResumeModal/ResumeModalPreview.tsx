import { FC, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import axios, { AxiosRequestConfig } from 'axios';
import { useNavigate } from 'react-router-dom';

interface IResumeModalProps {
  // title: string;
  // onConfirm: () => void;
  // onClose: () => void;
  // isVisible: boolean;
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
  const [careerInfo, setCareerInfo] = useState<ICareerDetail[] | null>();
  const [eduInfo, setEduInfo] = useState<IEduDetail[] | null>();
  const [skillInfo, setSkillInfo] = useState<ISkillDetail[] | null>();
  const [certInfo, setCertInfo] = useState<ICertDetail[] | null>();
  // const title = useRef<HTMLInputElement>();
  // const context = useRef<HTMLInputElement>();
  interface IResumeDetail {
    resIdx: number,
    empStatus: string,
    resTitle: string,
    shortIntro: string | null,
    proLink: string | null,
    perStatement: string | null,
    updatedDate: string | null,
    userNm: string | null,
    phone: string | null,
    email: string | null,
    fileName: string | null
  }
  interface ICareerDetail {
    crrIdx: number,
    company: string,
    dept: string,
    position: string,
    startDate: string,
    endDate: string,
    reason: string,
    crrDesc: string,
    resIdx: number
  }
  interface IEduDetail {
    eduIdx: number,
    resIdx: number,
    eduLevel: string,
    schoolName: string,
    major: string,
    admDate: string,
    grdDate: string,
    grdStatus: string
  }
  interface ISkillDetail {
    skillIdx: number,
    skillName: string,
    skillDetail: string,
    resIdx: number
  }
  interface ICertDetail {
    certIdx: number,
    certName: string,
    grade: string,
    issuer: string,
    acqDate: string,
    resIdx: number
  }

  useEffect(() => {
    resumeSeq && modalDetail(); // 컴포넌트 생성될 때 실행
    console.log("모달 로그1: " + resumeSeq);
    // 클린업 함수, 컴포넌트가 사라지기 직전에 실행
    return () => {
      resumeSeq && setResumeSeq(undefined);
    };
  }, []);

  const modalDetail = () => {
    const param = {
      resIdx: resumeSeq
    }

    axios.post('/api/manage-hire/previewResume.do', param).then((res) => {
      const data = res.data;
      console.log("모달 로그: ", data.resumeInfo);
      setResumeInfo(data.resumeInfo);
      setCareerInfo(data.careerInfo);
      setEduInfo(data.eduInfo);
      setSkillInfo(data.skillInfo);
      setCertInfo(data.certInfo);
    })
  }

  const [show, setShow] = useState(true);

  // const searchDetail = s

  const handlerModal = () => {
    setModal(!modal);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const downloadFile =  (resIdx) => {  
    axios.post('/api/manage-hire/attachment-download.do', resIdx,{
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
  
  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
    >
      <Modal.Header closeButton>
        <h5 className="modal-title">이력서 미리 보기</h5>
      </Modal.Header>
      <Modal.Body>
        <div>
          <div>
            <p>{resumeInfo?.resTitle}</p>
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

          <div>
            {resumeInfo?.shortIntro !== null ?
              <div>
                <p >{resumeInfo?.shortIntro}</p>
              </div>
              : null}

            {resumeInfo?.proLink !== null ?
              <div>
                <p >링크 : {resumeInfo?.proLink}</p>
              </div>
              : null}

            {resumeInfo?.fileName !== null ?
              <div onClick={()=>downloadFile(resumeInfo?.resIdx)}>
                <p>첨부파일 : {resumeInfo?.fileName}</p>
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
                      <tr>
                        <td>{data.startDate} ~ {data.endDate}</td>
                        <td>{data.company} | {data.dept} |
                          {data.position}
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
                      <tr>
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
                      <tr>
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
                      <tr>
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
                    <td style={{borderBottom: "1px solid #ccc"}}>
                    <p style={{padding: "20px", whiteSpace: "pre-line"}}>
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
        <Button variant="primary" onClick={handleClose}>
          인쇄
        </Button>
      </Modal.Footer>
    </Modal >
  );
};