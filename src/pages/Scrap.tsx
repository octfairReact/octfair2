import { ScrapProvider } from "../api/provider/ScrapProvider";
import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { ScrapMain } from "../component/page/Job/Scrap/ScrapMain/ScrapMain";
import { ScrapSearch } from "../component/page/Job/Scrap/ScrapSearch/ScrapSearch";

export const Scrap = () => {
  return (
    <>
      <ScrapProvider>
        <ContentBox>스크랩</ContentBox>
        <ScrapSearch />
        <ScrapMain />
      </ScrapProvider>
    </>
  );
};
