import { ScrabProvider } from "../api/provider/ScrabProvider";
import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { ScrabMain } from "../component/page/Job/Scrab/ScrabMain/ScrabMain";
import { ScrabSearch } from "../component/page/Job/Scrab/ScrabSearch/ScrabSearch";

export const Scrab = () => {
  return (
    <>
      <ScrabProvider>
        <ContentBox>스크랩</ContentBox>
        <ScrabSearch />
        <ScrabMain />
      </ScrabProvider>
    </>
  );
};
