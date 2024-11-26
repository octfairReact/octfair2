import { useRef } from "react";
import { Button } from "react-bootstrap"
import { useLocation } from "react-router-dom";
import { postApi } from "../../../../api/postApi";
import { IResumeDetailReponse } from "../../../../models/interface/IResume";
import { Resume } from "../../../../api/api";

export const ResumeCertAdd = ({ setVisibleState, searchCertList }) => {
  const location = useLocation();
  const certName = useRef<HTMLInputElement>();
  const grade = useRef<HTMLInputElement>();
  const issuer = useRef<HTMLInputElement>();
  const acqDate = useRef<HTMLInputElement>();

  const handlerSave = async () => {
    const today = new Date();
    const _certName = certName.current.value;
    const _grade = grade.current.value;
    const _issuer = issuer.current.value;
    const _acqDate = acqDate.current.value;

    if (today < new Date(_acqDate)) {
      alert("취득일은 오늘보다 미래일 수 없습니다.");
      return;
    }

    if (!_certName || !_grade || !_issuer || !_acqDate) {
      alert("모든 항목을 입력하세요.");
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
      alert("추가되었습니다.");
      setVisibleState(false);
      searchCertList();
    }
  }

  const handlerCancel = () => {
    setVisibleState(false);
  }

  return (
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
              <input 
                id="certName" 
                className="form-control" 
                type="text" 
                placeholder="자격증명" 
                defaultValue={""} 
                ref={certName} 
              />
            </td>
            <td>
              <input 
                id="grade" 
                className="form-control" 
                type="text" 
                placeholder="등급" 
                defaultValue={""} 
                ref={grade} 
              />
            </td>
            <td>
              <input 
                id="issuer" 
                className="form-control" 
                type="text" 
                placeholder="발행처" 
                defaultValue={""} 
                ref={issuer} 
              />
            </td>
            <td>
              <span style={{ margin: "6px", float: "left" }}>취득일자</span>
              <input 
                type="month" 
                id="acqDate" 
                className="form-control" 
                style={{ width: "70%", float: "right" }}
                ref={acqDate} 
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="inputBtnGroup" style={{ textAlign: "right" }} >
        <Button 
          id="certification"
          variant="secondary" 
          style={{ margin: "2px" }}
          onClick={handlerCancel}
        >
          <span>취소</span>
        </Button>
        <Button 
          id="insertCert"
          variant="primary" 
          style={{ margin: "2px" }}
          onClick={handlerSave}
        >
          <span>저장</span>
        </Button>
      </div>
    </div>
  );
};