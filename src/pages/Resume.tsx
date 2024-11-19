import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { ResumeProvider } from "../api/provider/ResumeProvider";
import { ResumeMain } from "../component/page/Resume/ResumeMain/ResumeMain";
import { ResumeAdd } from "../component/page/Resume/ResumeEdit/ResumeAdd";

export const Resume = () => {
  return (
    <>
      <ResumeProvider>
        <ContentBox>나의 이력서</ContentBox>
        <ResumeAdd />
        <ResumeMain />
      </ResumeProvider>
    </>
  );
};
