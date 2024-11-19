import { FaqProvider } from '../api/provider/FaqProvider';
import { ContentBox } from '../component/common/ContentBox/ContentBox';
import { FaqMain } from '../component/page/Faq/FaqMain/FaqMain';
import { FaqSearch } from '../component/page/Faq/FaqSearch/FaqSearch';

export const Faq = () => {
  return (
    <>
      <FaqProvider>
        <ContentBox>FAQ작업중...</ContentBox>
        <FaqSearch />
        <FaqMain />
      </FaqProvider>
    </>
  );
};
