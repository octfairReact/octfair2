import { Alert, Button } from "react-bootstrap"
import { IResumeCertification, IResumeCertificationReponse, IResumeDetailReponse } from "../../../../models/interface/IResume";
import { useEffect, useRef, useState } from "react";
import { postApi } from "../../../../api/postApi";
import { Resume } from "../../../../api/api";
import { useLocation } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import { StyledResume } from "../Style/StyledResume";
import swal from 'sweetalert';

export const ResumeCert = ({ resIdx }) => {
  const [certList, setCertList] = useState<IResumeCertification[]>();
  const [addVisible, setAddVisible] = useState(false);
  const certName = useRef<HTMLInputElement>();
  const grade = useRef<HTMLInputElement>();
  const issuer = useRef<HTMLInputElement>();
  const acqDate = useRef<HTMLInputElement>();
  const location = useLocation();
  
  useEffect(() => {
    if (location?.state){
      searchCertList();
    }
  }, []);

  const searchCertList = async () => {
    const certList = await postApi<IResumeCertificationReponse>(Resume.getCert, {resIdx: location.state.idx});
    if (certList) { setCertList(certList.payload); }
  }

  const handlerSave = async () => {
    const today = new Date();
    const _certName = certName.current.value;
    const _grade = grade.current.value;
    const _issuer = issuer.current.value;
    const _acqDate = acqDate.current.value;

    if (today < new Date(_acqDate)) {
      swal("저장 실패", "취득일은 오늘보다 미래일 수 없습니다.", "warning");
      return;
    }

    if (!_certName || !_grade || !_issuer || !_acqDate) {
      swal("저장 실패", "모든 항목을 입력하세요.", "warning");
      return;
    }

    const param = {
      certName: _certName,
      grade: _grade,
      issuer: _issuer,
      acqDate: _acqDate + "-01",
      resIdx: location.state.idx,
    }

    const saveCert = await postApi<IResumeDetailReponse>(Resume.addCert, param);
    if (saveCert.payload) {
      swal("저장 완료", "추가되었습니다.", "success");
      setAddVisible(false);
      searchCertList();
    }
  }

  const handlerDelete = async (certIdx: number) => {
    const deleteList = await postApi<IResumeCertificationReponse>(Resume.deleteCert, {
      resIdx,
      certIdx, 
    });

    if (deleteList) {
      swal("삭제 완료", "삭제되었습니다.", "success");
      searchCertList();
    }
  }

  const monthFormat = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}.${month}`;
  };

  return (
    <StyledResume>
      <div className="resumeDetail_body">
        <div className="resumeDetail_body_haeder">자격증 및 외국어</div>
        <div className="resumeDetail_body_guide">
          <div className="resumeDetail_body_guide_text">
            <Alert key={'light'} variant={'light'}>
              • 직무 관련 자격증, 외국어 자격증이나 수료한 교육 등이 있다면 간략히 작성해 주세요. <br/>
              • 지원하는 회사에서 요구하는 경우가 아니라면 운전 면허증과 같은 자격증은 생략하는 것이 좋습니다!
            </Alert>
          </div>
        </div>
        <div className="listDiv">
          <button type="button" className="btn btn-outline-primary showTableBtn" 
            onClick={() => { setAddVisible(true); }}
          >
            + 추가
          </button>
          
          { addVisible && 
            <div id="certificationInputTable">
              <table className="table table-bordered">
                <colgroup>
                  <col width={"25%"} />
                  <col width={"20%"} />
                  <col width={"25%"} />
                  <col width={"30%"} />
                </colgroup>
                <tbody>
                  <tr>
                    <td>
                      <input className="form-control" type="text" placeholder="자격증명" ref={certName} />
                    </td>
                    <td>
                      <input className="form-control" type="text" placeholder="등급" ref={grade} />
                    </td>
                    <td>
                      <input className="form-control" type="text" placeholder="발행처" ref={issuer} />
                    </td>
                    <td>
                      <span className="tdSpan">취득일자</span>
                      <input 
                        type="month" 
                        className="form-control acqDate" 
                        ref={acqDate} 
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="inputBtnGroup">
                <Button variant="secondary" onClick={() => { setAddVisible(false); }}>
                  <span>취소</span>
                </Button>
                <Button variant="primary" onClick={handlerSave}>
                  <span>저장</span>
                </Button>
              </div>
            </div>
          }
          { !addVisible && 
            <div className="list" id="certificationList">
              {certList?.length > 0 ? (
                <table className="table table-bordered">
                  <colgroup>
                    <col width={"30%"} />
                    <col width={"15%"} />
                    <col width={"20%"} />
                    <col width={"15%"} />
                    <col width={"10%"} />
                  </colgroup>
                  <thead>
                    <tr>
                      <th scope="col">자격증명</th>
                      <th scope="col">등급</th>
                      <th scope="col">발행처</th>
                      <th scope="col">취득일자</th>
                      <th scope="col">삭제</th>
                    </tr>
                  </thead>
                  
                  {certList?.map((cert, index) => {
                    return (
                      <tbody key={index}>
                        <tr>
                          <td>{cert.certName}</td>
                          <td>{cert.grade}</td>
                          <td>{cert.issuer}</td>
                          <td>{monthFormat(cert.acqDate)}</td>
                          <td onClick={() => handlerDelete(cert.certIdx)}>
                            <RiDeleteBin6Line />
                          </td>
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
                        취득한 자격증을 추가할 수 있습니다.
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