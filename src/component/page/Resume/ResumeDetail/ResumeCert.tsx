import { Alert } from "react-bootstrap"
import { IResumeCertification, IResumeCertificationReponse } from "../../../../models/interface/IResume";
import { useEffect, useState } from "react";
import { postApi } from "../../../../api/postApi";
import { Resume } from "../../../../api/api";
import { useLocation } from "react-router-dom";
import { ResumeCertAdd } from "./ResumeCertAdd";
import { RiDeleteBin6Line } from "react-icons/ri";

export const ResumeCert = () => {
  const [certList, setCertList] = useState<IResumeCertification[]>();
  const [resumeSeq, setResumeSeq] = useState<number>();
  const [addVisible, setAddVisible] = useState(false);
  const location = useLocation();
  
  useEffect(() => {
    if (location?.state){
      setResumeSeq(location.state.idx);
      searchCertList();
    }
  }, []);

  const searchCertList = async () => {
    const searchParam = { resIdx: location.state.idx };
    const certList = await postApi<IResumeCertificationReponse>( Resume.getCert, searchParam );

    if (certList) { setCertList(certList.payload); }
  }

  const handlerDelete = async (certIdx: number) => {
    const searchParam = { 
      resIdx: resumeSeq,
      certIdx: certIdx, 
    };
    const deleteList = await postApi<IResumeCertificationReponse>(Resume.deleteCert, searchParam);

    if (deleteList) {
      alert("삭제되었습니다.");
      searchCertList();
    }
  }

  const handlerSetVisible = (state: boolean) => {
    setAddVisible(state);
  }

  const monthFormat = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${year}.${month}`;
  };

  return (
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
        <button 
          type="button" 
          className="btn btn-outline-primary showTableBtn" 
          id="certification"
          onClick={() => { setAddVisible(true); } }
        >
          + 추가
        </button>
        
        { addVisible && 
          <ResumeCertAdd 
            setVisibleState={handlerSetVisible} 
            searchCertList={searchCertList} 
          /> 
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
                        <td onClick={() => handlerDelete(cert.certIdx)}><RiDeleteBin6Line /></td>
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
  );
};