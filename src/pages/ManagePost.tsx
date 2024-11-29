import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { PostProvider } from "../api/provider/PostProvider";
import { ManagePostMain } from "../component/page/ManagePost/ManagePostMain/ManagePostMain";
import { ManagePostSearch } from "../component/page/ManagePost/ManagePostSearch/ManagePostSearch";

export const ManagePost = () => {
  return (
    <>
      <PostProvider>
        <ContentBox>공고 보기</ContentBox>
        <ManagePostSearch />
        <ManagePostMain />
      </PostProvider>
    </>
  );
};
