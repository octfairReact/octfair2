import { ContentBox } from "../component/common/ContentBox/ContentBox";
import SlideImage from "../component/page/Job/Post/PostDetails/SlideImage";
import PostDetailBody from "../component/page/Job/Post/PostDetails/PostDetailBody";
import { PostDetailProvider } from "../api/provider/PostDetailProvider";

const PostDetail = () => {
  return (
    <>
      <div style={{ width: "100%" }}>
        <PostDetailProvider>
          <ContentBox>채용공고</ContentBox>
          <SlideImage />
          <PostDetailBody />
        </PostDetailProvider>
      </div>
    </>
  );
};

export default PostDetail;
