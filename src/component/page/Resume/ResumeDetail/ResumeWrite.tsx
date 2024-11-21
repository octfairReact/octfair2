
import { ResumeProvider } from "../../../../api/provider/ResumeProvider";
import { ContentBox } from "../../../common/ContentBox/ContentBox";
import { ResumeReturn } from "../ResumeEdit/ResumeReturn";
import { ResumeDetail } from "./ResumeDetail";

export const ResumeWrite = () => {
  return (
    <>
      <ResumeProvider>
        <ResumeReturn />
        <ContentBox>이력서 수정/작성</ContentBox>
        <ResumeDetail/>
      </ResumeProvider>
    </>
  );
};
