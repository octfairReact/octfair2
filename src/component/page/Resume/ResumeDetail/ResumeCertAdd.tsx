import { Button } from "react-bootstrap"

export const ResumeCertAdd = () => {

  const handlerSave = () => {}

  const handlerCancel = () => {}

  return (
    <div id="certificationInputTable">
      <table className="table table-bordered">
        <tbody>
          <tr>
            <td width={"20%"}>
              <input id="certName" className="form-control" type="text" placeholder="자격증명" defaultValue={""} />
            </td>
            <td width={"20%"}>
              <input id="grade" className="form-control" type="text" placeholder="등급" defaultValue={""} />
            </td>
            <td width={"20%"}>
              <input id="issuer" className="form-control" type="text" placeholder="발행처" defaultValue={""} />
            </td>
            <td>
              <span style={{ margin: "6px", float: "left" }}>취득일자</span>
              <input 
                type="month" id="acqDate" className="form-control" 
                style={{ width: "70%", float: "right" }}
              // defaultValue={""}
              ></input>
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