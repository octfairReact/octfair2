import { useRef } from "react";
import { Button } from "react-bootstrap"
import { useLocation } from "react-router-dom";
import { postApi } from "../../../../api/postApi";
import { IResumeDetailReponse } from "../../../../models/interface/IResume";
import { Resume } from "../../../../api/api";

export const ResumeCertAdd = (props) => {
  const location = useLocation();

  const certName = useRef<HTMLInputElement>();
  const grade = useRef<HTMLInputElement>();
  const issuer = useRef<HTMLInputElement>();
  const acqDate = useRef<HTMLInputElement>();

  const handlerSave = async () => {
    const param = {
      certName: certName.current.value,
      grade: grade.current.value,
      issuer: issuer.current.value,
      acqDate: acqDate.current.value + "-01",
      resIdx: location.state.idx,
    }

    const saveCert = await postApi<IResumeDetailReponse>(Resume.addCert, param);
    if (saveCert.payload) {
      props.setVisibleState(false);
    }
  }

  const handlerCancel = () => {
    props.setVisibleState(false);
  }

  return (
    <div id="certificationInputTable">
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td width={"20%"}>
              <input 
                id="certName" 
                className="form-control" 
                type="text" 
                placeholder="자격증명" 
                defaultValue={""} 
                ref={certName} 
              />
            </td>
            <td width={"20%"}>
              <input 
                id="grade" 
                className="form-control" 
                type="text" 
                placeholder="등급" 
                defaultValue={""} 
                ref={grade} 
              />
            </td>
            <td width={"20%"}>
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
              // defaultValue={""}
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
        {/* <a className="btnType gray cancleBtn" id="certification" href="#"><span>취소</span></a> 
        <a className="btnType blue" href="javascript:insertCert()"><span>저장</span></a> */}
      </div>
    </div>
  );
};