import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { PostMain } from "../component/page/Job/Post/PostMain/PostMain";
import { PostSearch } from "../component/page/Job/Post/PostSearch/PostSearch";
import { PostProvider } from "../api/provider/PostProvider";

export const Post = () => {
  return (
    <>
      <PostProvider>
        <ContentBox>채용 공고</ContentBox>
        <PostSearch />
        <PostMain />
      </PostProvider>
    </>
  );
};
