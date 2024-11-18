import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { JobPostMain } from "../component/page/JobPost/JobPostMain";
import { JobPostSearch } from "../component/page/JobPost/JobPostSearch/JobPostSearch";
import { JobPostProvider } from "../api/provider/JobPostProvider";

export const JobPost = () => {
  return (
    <>
      <JobPostProvider>
        <ContentBox>채용 공고</ContentBox>
        <JobPostSearch />
        <JobPostMain />
      </JobPostProvider>
    </>
  );
};
