import { useNavigate, useParams } from "react-router-dom";
import { StyledTableCompany } from "../Style/StyledTableCompany"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ICompanyDetail, ICompanyDetailReponse } from "../../../../models/interface/ICompany";
import { Company } from "../../../../api/api";
import { postApi } from "../../../../api/postApi";
import { Button } from "react-bootstrap";
import axios from "axios";
import swal from 'sweetalert';

export const CompanyUpdate = () => {
  const [companyDetail, setCompanyDetail] = useState<ICompanyDetail>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [phoneNum, setPhoneNum] = useState("");
  const [bizEmpCountBind, setBizEmpCount] = useState("");
  const [bizRevenueBind, setBizRevenue] = useState("");
  const { bizIdx } = useParams();
  const navigate = useNavigate();
  const bizEmpCount = useRef(null);
  const bizRevenue = useRef(null);
  const fileInputRef = useRef(null);

  const refs = useRef<Record<string, HTMLInputElement | HTMLTextAreaElement | null>>({
    bizName: null,
    bizCeoName: null,
    bizContact: null,
    bizAddr: null,
    bizWebUrl: null,
    bizFoundDate: null,
    bizIntro: null,
  });

  const setRef = (key: string) => (el: HTMLInputElement | HTMLTextAreaElement | null) => {
    refs.current[key] = el;
  };

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
    const detailList = await postApi<ICompanyDetailReponse>( Company.getDetail, {bizIdx});

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
      const fileExt = fileInfoSplit[1].toLowerCase();

      if (fileExt === "jpg" || fileExt === "gif" || fileExt === "png") {
        setImageUrl(URL.createObjectURL(fileInfo[0]));
      } else {
        setImageUrl("");
      }
    }
  };

  const handlerUpdate = (path: string) => {
    const params = handlerValidation();
    if (!params) return;
    
    const fileForm = new FormData();

    if (path === "insert" ) {
      fileForm.append('seq', bizIdx);
    }
    
    fileForm.append('bizName', params.bizName);
    fileForm.append('bizAddr', params.bizAddr);
    fileForm.append('bizContact', params.bizContact);
    fileForm.append('bizWebUrl', params.bizWebUrl);
    fileForm.append('bizCeoName', params.bizCeoName);
    fileForm.append('bizFoundDate', params.bizFoundDate);
    fileForm.append('bizEmpCount', bizEmpCount.current.value);
    fileForm.append('bizRevenue', bizRevenue.current.value);
    fileForm.append('bizIntro', params.bizIntro);

    const fileInput = fileInputRef.current;
    if (fileInput && fileInput.files[0]) {
        fileForm.append('fileInfo', fileInput.files[0]);
    }

    axios
    .post(path === "insert" ? Company.getInsert : Company.getUpdate, fileForm)
    .then((res) => {
      if ("idAlready" === res.data.result) {
        swal("저장 실패", "이미 회사를 등록하셨습니다.", "error");
      } else {
        swal("저장 완료", "회사가 저장되었습니다.", "success");
      }

      navigate("/react/mypage/update.do");
    }).catch((err) => {});
  }

  const handlerDelete = async () => {
    const deleteList = await postApi<ICompanyDetailReponse>(Company.getDelete, {});

    if (deleteList) {
      swal("삭제 완료", "삭제되었습니다.", "success");
      navigate("/react/mypage/update.do");
    }
  }

  const phoneNumChange = (e) => {
    const inputNum = e.target.value;
    var phone = inputNum.replace(/[^0-9]/g, "");

    if (phone.length >= 3) {
      var prefix = phone.substring(0, 3);
      if ([ "010", "019", "011", "016", "017" ].indexOf(prefix) === -1) {
        swal("정확한 전화번호를 입력해주세요.");
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

    const inputs = Object.keys(refs.current).reduce((acc, key) => {
      acc[key] = refs.current[key]?.value.trim() || "";
      return acc;
    }, {} as Record<string, string>);

    if      (!inputs.bizName)             { swal("사업자 이름을 입력해 주세요."); return; }
    else if (!inputs.bizCeoName)          { swal("사업자 이름을 입력해 주세요."); return; }
    else if (!inputs.bizContact)          { swal("연락처를 입력해 주세요."); return; }
    else if (!inputs.bizAddr)             { swal("주소를 입력해 주세요."); return; }
    else if (!inputs.bizFoundDate)        { swal("설립일을 입력해 주세요."); return; }
    else if (!inputs.bizWebUrl)           { swal("홈페이지 주소를 입력해 주세요."); return; }
    else if (!bizEmpCount.current.value)  { swal("사원수를 입력해 주세요."); return; }
    else if (!bizRevenue.current.value)   { swal("매출액을 입력해 주세요."); return; }
    else if (!fileInputRef.current.value) { swal("로고를 등록해 주세요."); return; }

    if (today < new Date(inputs.bizFoundDate)) {
      swal("설립일은 오늘보다 이전이어야 합니다.");
      return false;
    }

    if (!addressPattern.test(inputs.bizAddr)) {
      swal("주소는 특수 문자를 포함하지 않는 형식으로 입력해 주세요.");
      return false;
    }

    if (!urlPattern.test(inputs.bizWebUrl)) {
      swal("홈페이지 주소는 올바른 URL 형식으로 입력해 주세요.");
      return false;
    }

    return inputs;
  }

  return (
    <StyledTableCompany>
      <table className="table writeTable">
        <colgroup>
          <col width={"18%"} />
          <col width={""} />
          <col width={"18%"} />
          <col width={""} />
        </colgroup>
        <tbody>
          <tr>
            <th>사업자명<span className="font_red">*</span></th>
            <td>
              <input 
                type="text" className="form-control" 
                defaultValue={companyDetail?.bizName}
                ref={setRef("bizName")}
              />
              </td>
            <th>사업자 대표<span className="font_red">*</span></th>
            <td>
              <input 
                type="text" 
                className="form-control" 
                defaultValue={companyDetail?.bizCeoName}
                ref={setRef("bizCeoName")}
              />
            </td>
          </tr>
          <tr>
            <th>연락처<span className="font_red">*</span></th>
            <td>
              <input 
                type="text" 
                className="form-control" 
                placeholder="ex) 010-xxxx-xxxx" 
                value={phoneNum}
                ref={setRef("bizContact")}
                onChange={phoneNumChange}
              />
            </td>
            <th>사업자 주소<span className="font_red">*</span></th>
            <td>
              <input 
                type="text" 
                className="form-control" 
                defaultValue={companyDetail?.bizAddr}
                ref={setRef("bizAddr")}
              />
            </td>
          </tr>
          <tr>
            <th>사원수<span className="font_red">*</span></th>
            <td>
              <select 
                className="form-select" 
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
                defaultValue={companyDetail?.bizWebUrl}
                ref={setRef("bizWebUrl")}
              />
            </td>
          </tr>
          <tr>
            <th>설립일<span className="font_red">*</span></th>
            <td>
              <input 
                type="date" 
                className="form-control" 
                defaultValue={companyDetail?.bizFoundDate}
                ref={setRef("bizFoundDate")}
              />
            </td>
            <th>매출액<span className="font_red">*</span></th>
            <td>
              <select 
                className="form-select" 
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
                placeholder="2000자 이내로 입력해 주세요."
                rows={10}
                defaultValue={companyDetail?.bizIntro}
                ref={setRef("bizIntro")}
              />
            </td>
          </tr>
          <tr>
            <th>기업 로고<span className="font_red">*</span></th>
            <td colSpan={3}>
              <input 
                type="file" 
                className="form-control" 
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
              {imageUrl && 
                <span id="companyUpdatePreview">
                  <img src={imageUrl} style={{ width: "50%" }} alt="" />
                </span>
              }
            </td>
          </tr>
        </tbody>
      </table>

      <div className="btnGroup">
        {bizIdx ? (
          <Button variant="primary" onClick={() => handlerUpdate("update")}>
            <span>수정</span>
          </Button>
        ) : (
          <Button variant="primary" onClick={() => handlerUpdate("insert")}>
            <span>등록</span>
          </Button>
        )}
        {bizIdx &&
          <Button variant="danger" onClick={() => handlerDelete()}>
            <span>삭제</span>
          </Button>
        }
        <Button variant="secondary" onClick={() => navigate("/react/mypage/update.do")}>
          <span>돌아가기</span>
        </Button>
      </div>
    </StyledTableCompany>
  );
};