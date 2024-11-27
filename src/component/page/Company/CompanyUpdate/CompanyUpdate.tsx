import { useNavigate, useParams } from "react-router-dom";
import { StyledTableCompany } from "../Style/StyledTableCompany"
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { ICompanyDetail, ICompanyDetailReponse } from "../../../../models/interface/ICompany";
import { Company } from "../../../../api/api";
import { postApi } from "../../../../api/postApi";
import { Button } from "react-bootstrap";

export const CompanyUpdate = () => {
  const [companyDetail, setCompanyDetail] = useState<ICompanyDetail>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [fileData, setFileData] = useState<File>();
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
  
  useEffect(() => {
    console.log("company update **************************");
    console.log(bizIdx);

    searchDetail(bizIdx);
  }, []);

  const searchDetail = async (bizIdx) => {
    const searchParam = { bizIdx: bizIdx };
    const detailList = await postApi<ICompanyDetailReponse>( Company.getDetail, searchParam );

    console.log(detailList);

    if (detailList) { 
      setCompanyDetail(detailList.payload);

      const { fileExt, logicalPath } = detailList.payload;
      if (fileExt === "jpg" || fileExt === "gif" || fileExt === "png") {
        setImageUrl(logicalPath);
        console.log(logicalPath);
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

  const handlerUpdate = () => {

  }

  const handlerDelete = () => {
    
  }

  return (
    <StyledTableCompany>
      <table className="table table-bordered">
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
                defaultValue={companyDetail?.bizContact}
                ref={bizContact}
                // oninput="javascript:formatPhoneNumber()"
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
                defaultValue={'10명 이하'} 
                ref={bizEmpCount} 
                // onChange={}
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
                defaultValue={'10억 이하'} 
                ref={bizRevenue} 
                // onChange={}
              >
                <option value="10억 이하">10억 이하</option>
                <option value="100억 이하">100억 이하</option>
                <option value="1000억 이하">1000억 이하</option>
                <option value="1000억 이상">1000억 이상</option>
              </select>
            </td>
          </tr>
          <tr>
            <th>기업소개<span className="font_red"> *</span></th>
            <td colSpan={3}>
              <textarea 
                className="form-control" 
                name="bizIntro" 
                id="bizIntro" 
                placeholder="2000자 이내 입력해주세요"
                rows={10}
                defaultValue={companyDetail?.bizIntro}
                ref={bizIntro}
              >
                company.bizIntro
              </textarea>
            </td>
          </tr>
          <tr>
            <th>기업로고<span className="font_red">*</span></th>
            <td colSpan={3}>
              <input 
              type="file" 
              className="form-control" 
              name="bizLogo" 
              id="bizLogo" />
              <span id="currentFileName">이전파일: company.bizLogo</span>
            </td>
          </tr>
          <tr>
            <th>미리보기</th>
            <td colSpan={3}>
              <span id="companyUpdatePreview">
                {/* <img src='${company.logicalPath}' id='imgFile' style='width:100px; height:100px'> */}
              </span>
            </td>
          </tr>
        </tbody>
      </table>

      <div className="btnGroup" style={{ textAlign: "right" }}>
        <Button 
          variant="primary" 
          style={{ margin: "2px" }}
          // onClick={() => navigate(`/react/company/companyUpdatePage.do/${bizIdx}`)}
        >
          <span>수정</span>
        </Button>
        <Button 
          variant="danger" 
          style={{ margin: "2px" }}
          // onClick={() => navigate(`/react/jobs/post-detail/${postIdx}`)}
        >
          <span>삭제</span>
        </Button>
        <Button 
          variant="secondary" 
          style={{ margin: "2px" }}
          // onClick={() => navigate(`/react/jobs/post-detail/${postIdx}`)}
        >
          <span>돌아가기</span>
        </Button>
      </div>
    </StyledTableCompany>
  );
};