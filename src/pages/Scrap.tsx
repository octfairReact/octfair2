import { ScrapProvider } from "../api/provider/ScrapProvider";
import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { ScrapMain } from "../component/page/Job/Scrap/ScrapMain/ScrapMain";

export const Scrap = () => {
  return (
    <>
      <ScrapProvider>
        <ContentBox>스크랩</ContentBox>
        <ScrapMain />
      </ScrapProvider>
    </>
  );
};
