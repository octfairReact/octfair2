import { CompanyProvider } from "../api/provider/CompanyProvider";
import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { CompanyDetail } from "../component/page/Company/CompanyDetail/CompanyDetail";

export const Company = () => {
  return (
    <>
      <CompanyProvider>
        <ContentBox>기업 상세 조회</ContentBox>
        <CompanyDetail />
      </CompanyProvider>
    </>
  );
};
