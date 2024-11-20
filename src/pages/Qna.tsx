import { QnaProvider } from '../api/provider/QnaProvider';
import { ContentBox } from '../component/common/ContentBox/ContentBox';
import { QnaMain } from '../component/page/Qna/QnaMain/QnaMain';
import { QnaSearch } from '../component/page/Qna/QnaSearch/QnaSearch';

export const Qna = () => {
  return (
    <>
      <QnaProvider>
        <ContentBox>Qna작업중...</ContentBox>
        <QnaMain />
        <QnaSearch />
      </QnaProvider>
    </>
  );
};
