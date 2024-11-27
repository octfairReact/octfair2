import { CompanyProvider } from "../api/provider/CompanyProvider";
import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { CompanyUpdate } from "../component/page/Company/CompanyUpdate/CompanyUpdate";

export const CompanyInfo = () => {
  return (
    <>
      <CompanyProvider>
        <ContentBox>기업 수정 및 삭제</ContentBox>
        <CompanyUpdate />
      </CompanyProvider>
    </>
  );
};
