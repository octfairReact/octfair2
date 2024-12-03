import { useNavigate, useParams } from "react-router-dom";
import { StyledTableCompany } from "../Style/StyledTableCompany"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ICompanyDetail, ICompanyDetailReponse } from "../../../../models/interface/ICompany";
import { Company } from "../../../../api/api";
import { postApi } from "../../../../api/postApi";
import { Button } from "react-bootstrap";
import axios from "axios";

export const CompanyUpdate = () => {
  const [companyDetail, setCompanyDetail] = useState<ICompanyDetail>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [fileData, setFileData] = useState<File>();
  const [phoneNum, setPhoneNum] = useState("");
  const [bizEmpCountBind, setBizEmpCount] = useState("");
  const [bizRevenueBind, setBizRevenue] = useState("");
  const { bizIdx } = useParams();
  const navigate = useNavigate();
  const bizName = useRef<HTMLInputElement>();
  const bizCeoName = useRef<HTMLInputElement>();
  const bizContact = useRef<HTMLInputElement>();
  const bizAddr = useRef<HTMLInputElement>();
  const bizWebUrl = useRef<HTMLInputElement>();
  const bizFoundDate = useRef<HTMLInputElement>();
  const bizIntro = useRef(null);
  const bizEmpCount = useRef(null);
  const bizRevenue = useRef(null);
  const fileInputRef = useRef(null);
  
  useEffect(() => {
    if (bizIdx) {
      searchDetail(bizIdx);
    }
  }, []);

  useEffect(() => {
    if (companyDetail?.bizContact) {
      setPhoneNum(companyDetail.bizContact);
    }

    if (companyDetail) {
      setBizEmpCount(companyDetail?.bizEmpCount);
      setBizRevenue(companyDetail?.bizRevenue);
  }
  }, [companyDetail]);

  const searchDetail = async (bizIdx) => {
    const searchParam = { bizIdx: bizIdx };
    const detailList = await postApi<ICompanyDetailReponse>( Company.getDetail, searchParam );

    if (detailList) { 
      setCompanyDetail(detailList.payload);

      const { fileExt, logicalPath } = detailList.payload;
      if (fileExt === "jpg" || fileExt === "gif" || fileExt === "png") {
        setImageUrl(logicalPath);
      } else {
        setImageUrl("");
      }
    }
  }

  const handlerFile = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInfo = e.target.files;
    if (fileInfo?.length > 0) {
      const fileInfoSplit = fileInfo[0].name.split(".");
      const fileExtension = fileInfoSplit[1].toLowerCase();

      if (
        fileExtension === "jpg" ||
        fileExtension === "gif" ||
        fileExtension === "png"
      ) {
        setImageUrl(URL.createObjectURL(fileInfo[0]));
      } else {
        setImageUrl("");
      }

      setFileData(fileInfo[0]);
    }
  };

  const handlerUpdate = (path: string) => {
    if (!handlerValidation()) {
      return;
    }

    const fileForm = new FormData();

    if (path === "insert" ) {
      fileForm.append('seq', bizIdx);
    }
    
    fileForm.append('bizName', bizName.current.value);
    fileForm.append('bizAddr', bizAddr.current.value);
    fileForm.append('bizContact', bizContact.current.value);
    fileForm.append('bizWebUrl', bizWebUrl.current.value);
    fileForm.append('bizCeoName', bizCeoName.current.value);
    fileForm.append('bizFoundDate', bizFoundDate.current.value);
    fileForm.append('bizEmpCount', bizEmpCount.current.value);
    fileForm.append('bizRevenue', bizRevenue.current.value);
    fileForm.append('bizIntro', bizIntro.current.value);

    const fileInput = fileInputRef.current;
    if (fileInput && fileInput.files[0]) {
        fileForm.append('fileInfo', fileInput.files[0]);
    }

    axios
    .post(path === "insert" ? Company.getInsert : Company.getUpdate, fileForm)
    .then((res) => {
      console.log(res.data.result);
      if ("idAlready" === res.data.result) {
        alert("이미 회사를 등록하셨습니다.");
      } else {
        alert("회사가 저장되었습니다.");
      }

      navigate("/react/mypage/update.do");
    }).catch((err) => {});
  }

  const handlerDelete = async () => {
    const searchParam = {};
    const deleteList = await postApi<ICompanyDetailReponse>(Company.getDelete, searchParam);

    if (deleteList) {
      alert("삭제되었습니다.");
      navigate("/react/mypage/update.do");
    }
  }

  const phoneNumChange = (e) => {
    const inputNum = e.target.value;
    var phone = inputNum.replace(/[^0-9]/g, "");

    if (phone.length >= 3) {
      var prefix = phone.substring(0, 3);
      if ([ "010", "019", "011", "016", "017" ].indexOf(prefix) === -1) {
        alert("정확한 전화번호를 입력해주세요.");
        return;
      }
		}

    // 휴대폰 번호 형식에 맞게 하이픈 추가
    if (phone.length >= 3 && phone.length <= 7) {
      phone = phone.replace(/(\d{3})(\d{1,4})/, "$1-$2");
    } else if (phone.length >= 8) {
      phone = phone.replace(/(\d{3})(\d{3,4})(\d{0,4})/, "$1-$2-$3");
    }

    if (phone.length > 13) {
      phone = phone.substring(0, 13);
    }

    setPhoneNum(phone);
  }

  const handlerValidation = () => {
    const today = new Date();
    const addressPattern = /^[\w\s가-힣]+$/;
    const urlPattern = /^[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([\/?%&=]*)?$/;

    const _bizName = bizName.current.value;
    const _bizCeoName = bizCeoName.current.value;
    const _bizContact = bizContact.current.value;
    const _bizAddr = bizAddr.current.value;
    const _bizFoundDate = bizFoundDate.current.value;
    const _bizWebUrl = bizWebUrl.current.value;
    const _bizEmpCount = bizEmpCount.current.value;
    const _bizRevenue = bizRevenue.current.value;
    const _bizLogo = fileInputRef.current.value;

    if      (!_bizName.trim())      { alert("사업자 이름을 입력해 주세요."); return; }
    else if (!_bizCeoName.trim())   { alert("사업자 이름을 입력해 주세요."); return; }
    else if (!_bizContact.trim())   { alert("연락처를 입력해 주세요."); return; }
    else if (!_bizAddr.trim())      { alert("주소를 입력해 주세요."); return; }
    else if (!_bizFoundDate.trim()) { alert("설립일을 입력해 주세요."); return; }
    else if (!_bizWebUrl.trim())    { alert("홈페이지 주소를 입력해 주세요."); return; }
    else if (!_bizEmpCount.trim())  { alert("사원수를 입력해 주세요."); return; }
    else if (!_bizRevenue.trim())   { alert("매출액을 입력해 주세요."); return; }
    else if (!_bizLogo)             { alert("로고를 등록해 주세요."); return; }

    if (today < new Date(_bizFoundDate)) {
      alert("설립일은 오늘보다 이전이어야 합니다.");
      return;
    }

    if (!addressPattern.test(_bizAddr)) {
      alert("주소는 특수 문자를 포함하지 않는 형식으로 입력해 주세요.");
      return;
    }

    if (!urlPattern.test(_bizWebUrl)) {
      alert("홈페이지 주소는 올바른 URL 형식으로 입력해 주세요.");
      return;
    }

    return true;
  }

  return (
    <StyledTableCompany>
      <table className="table table-bordered writeTable">
        <colgroup>
          <col width={"20%"} />
          <col width={""} />
          <col width={"20%"} />
          <col width={""} />
        </colgroup>
        <tbody>
          <tr>
            <th>사업자명<span className="font_red">*</span></th>
            <td>
              <input 
                type="text" 
                className="form-control" 
                name="bizName" 
                id="bizName" 
                defaultValue={companyDetail?.bizName}
                ref={bizName}
              />
              </td>
            <th>사업자 대표<span className="font_red">*</span></th>
            <td>
              <input 
                type="text" 
                className="form-control" 
                name="bizCeoName" 
                id="bizCeoName" 
                defaultValue={companyDetail?.bizCeoName}
                ref={bizCeoName}
              />
            </td>
          </tr>
          <tr>
            <th>연락처<span className="font_red">*</span></th>
            <td>
              <input 
                type="text" 
                className="form-control" 
                name="bizContact" 
                id="bizContact" 
                placeholder="ex) 010-xxxx-xxxx" 
                value={phoneNum}
                ref={bizContact}
                onChange={phoneNumChange}
              />
            </td>
            <th>사업자 주소<span className="font_red">*</span></th>
            <td>
              <input 
                type="text" 
                className="form-control" 
                name="bizAddr" 
                id="bizAddr" 
                defaultValue={companyDetail?.bizAddr}
                ref={bizAddr}
              />
            </td>
          </tr>
          <tr>
            <th>사원수<span className="font_red">*</span></th>
            <td>
              <select 
                className="form-select" 
                id="bizEmpCount" 
                value={bizEmpCountBind}
                defaultValue={companyDetail?.bizEmpCount} 
                onChange={(e) => setBizEmpCount(e.target.value)}
                ref={bizEmpCount} 
              >
                <option value="10명 이하">10명 이하</option>
                <option value="50명 이하">50명 이하</option>
                <option value="100명 이하">100명 이하</option>
                <option value="1000명 이하">1000명 이하</option>
                <option value="1000명 이상">1000명 이상</option>
              </select>
            </td>
            <th>홈페이지 주소<span className="font_red">*</span></th>
            <td>
              <input 
                type="text" 
                className="form-control" 
                name="bizWebUrl" 
                id="bizWebUrl" 
                defaultValue={companyDetail?.bizWebUrl}
                ref={bizWebUrl}
              />
            </td>
          </tr>
          <tr>
            <th>설립일<span className="font_red">*</span></th>
            <td>
              <input 
                type="date" 
                className="form-control" 
                name="bizFoundDate" 
                id="bizFoundDate" 
                defaultValue={companyDetail?.bizFoundDate}
                ref={bizFoundDate}
              />
            </td>
            <th>매출액<span className="font_red">*</span></th>
            <td>
              <select 
                className="form-select" 
                id="bizRevenue" 
                value={bizRevenueBind}
                defaultValue={companyDetail?.bizRevenue} 
                ref={bizRevenue}
                onChange={(e) => setBizRevenue(e.target.value)}
              >
                <option value="10억 이하">10억 이하</option>
                <option value="100억 이하">100억 이하</option>
                <option value="1000억 이하">1000억 이하</option>
                <option value="1000억 이상">1000억 이상</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>기업 소개</th>
            <td colSpan={3}>
              <textarea 
                className="form-control" 
                name="bizIntro" 
                id="bizIntro" 
                placeholder="2000자 이내로 입력해 주세요."
                rows={10}
                defaultValue={companyDetail?.bizIntro}
                ref={bizIntro}
              />
            </td>
          </tr>
          <tr>
            <th>기업 로고<span className="font_red">*</span></th>
            <td colSpan={3}>
              <input 
                type="file" 
                className="form-control" 
                name="bizLogo" 
                id="bizLogo" 
                onChange={handlerFile}
                ref={fileInputRef}
              />
              <p id="currentFileName">
                이전파일: {companyDetail?.bizLogo}
              </p>
            </td>
          </tr>
          <tr>
            <th>미리 보기</th>
            <td colSpan={3}>
              {imageUrl ? (
                <span id="companyUpdatePreview">
                  <img src={imageUrl} style={{ width: "50%" }} alt="" />
                </span>
              ) : (
                <span></span>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      <div className="btnGroup" style={{ textAlign: "right" }}>
        {bizIdx ? (
          <Button 
            variant="primary" 
            style={{ margin: "3px" }}
            onClick={() => handlerUpdate("update")}
          >
            <span>수정</span>
          </Button>
        ) : (
          <Button 
            variant="primary" 
            style={{ margin: "3px" }}
            onClick={() => handlerUpdate("insert")}
          >
            <span>등록</span>
          </Button>
        )}

        {bizIdx &&
          <Button 
            variant="danger" 
            style={{ margin: "3px" }}
            onClick={() => handlerDelete()}
          >
            <span>삭제</span>
          </Button>
        }
        
        <Button 
          variant="secondary" 
          style={{ margin: "3px" }}
          onClick={() => navigate("/react/mypage/update.do")}
        >
          <span>돌아가기</span>
        </Button>
      </div>
    </StyledTableCompany>
  );
};