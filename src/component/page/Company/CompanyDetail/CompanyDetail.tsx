import { useNavigate, useParams } from "react-router-dom";
import { StyledTableCompany } from "../Style/StyledTableCompany"
import { ChangeEvent, useEffect, useState } from "react";
import { ICompanyDetail, ICompanyDetailReponse } from "../../../../models/interface/ICompany";
import { Company } from "../../../../api/api";
import { postApi } from "../../../../api/postApi";
import { Button } from "react-bootstrap";

export const CompanyDetail = () => {
  const [companyDetail, setCompanyDetail] = useState<ICompanyDetail>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [fileData, setFileData] = useState<File>();
  const { bizIdx } = useParams();
  const { postIdx } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("**************************");
    console.log(bizIdx);

    searchDetail(bizIdx);
  }, []);

  const searchDetail = async (bizIdx) => {
    const searchParam = { bizIdx: bizIdx };
    const detailList = await postApi<ICompanyDetailReponse>( Company.getDetail, searchParam );

    console.log("**************************");
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

  return (
    <StyledTableCompany>
      <div className="divComGrpCodList">
			  <table className="table table-bordered">
          <colgroup>
            <col width={"25%"} />
            <col width={"25%"} />
            <col width={"25%"} />
            <col width={"25%"} />
          </colgroup>
					<thead>
						<tr>
							<th colSpan={4}>기업로고</th>
						</tr>
					</thead>
					<tbody>
						<tr >
							<td colSpan={4}>
                {imageUrl ? (
                  <span id="preview">
                    <img src={imageUrl} style={{ width: "50%" }} />
                    </span>
                ) : (
                  <span></span>
                )}
              </td>
						</tr>
					</tbody>		
					<thead>
						<tr>
							<th scope="col">사업자명</th>
							<th scope="col">사업자 대표</th>
							<th scope="col">연락처</th>
							<th scope="col">사업자 주소</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{companyDetail?.bizName}</td>
							<td>{companyDetail?.bizCeoName}</td>
							<td>{companyDetail?.bizContact}</td>
							<td>{companyDetail?.bizAddr}</td>
						</tr>
					</tbody>
					<thead>
						<tr>
							<th scope="col">사원수</th>
							<th scope="col">홈페이지 주소</th>
							<th scope="col">설립일</th>
							<th scope="col">매출액</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>{companyDetail?.bizEmpCount}</td>
							<td>{companyDetail?.bizWebUrl}</td>
							<td>{companyDetail?.bizFoundDate}</td>
							<td>{companyDetail?.bizRevenue}</td>
						</tr>
					</tbody>
					<thead>
						<tr>
							<th colSpan={4}>기업소개</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td colSpan={4}>{companyDetail?.bizIntro}</td>
						</tr>
					</tbody>
				</table>
      </div>

      <div className="btnGroup" style={{ textAlign: "right" }}>
        <Button 
          variant="secondary" 
          style={{ margin: "2px" }}
          onClick={() => navigate(`/react/company/companyUpdatePage.do/${bizIdx}`)}
        >
          <span>임시 정보 수정</span>
        </Button>
        <Button 
          variant="secondary" 
          style={{ margin: "2px" }}
          onClick={() => navigate(`/react/jobs/post-detail/${postIdx}`)}
        >
          <span>기업 지원 공고 확인하기</span>
        </Button>
      </div>
    </StyledTableCompany>
  );
};