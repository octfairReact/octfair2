import React from "react";
import { ContentBox } from "../component/common/ContentBox/ContentBox";
import SlideImage from "../component/page/Job/Post/PostDetails/SlideImage";
import PostDetailBody from "../component/page/Job/Post/PostDetails/PostDetailBody";

const PostDetail = () => {
  return (
    <>
      <div style={{ width: "81%" }}>
        <ContentBox>채용공고</ContentBox>
        <SlideImage />
        <PostDetailBody />
      </div>
    </>
  );
};

export default PostDetail;
