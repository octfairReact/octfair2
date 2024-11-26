import React, { useState } from "react";
import { ContentBox } from "../component/common/ContentBox/ContentBox";
import SlideImage from "../component/page/Job/Post/PostDetails/SlideImage";
import PostDetailBody from "../component/page/Job/Post/PostDetails/PostDetailBody";
import { useRecoilState } from "recoil";
import { lodingState } from "../stores/lodingState";
import { Spinner } from "react-bootstrap";

const PostDetail = () => {
  const [bizImagePath, setBizImagePath] = useState<string | null>(null);
  const [postImagePath, setPostImagePath] = useState<string | null>(null);
  const [loding, setLoding] = useRecoilState(lodingState);

  const handleImagePath = (
    bizImage: string | null,
    postImage: string | null
  ) => {
    setBizImagePath(bizImage);
    setPostImagePath(postImage);
    setLoding(!lodingState);
  };

  return (
    <>
      <div style={{ width: "100%" }}>
        <ContentBox>채용공고</ContentBox>
        {loding ? (
          <div className="spinner">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <>
            <SlideImage
              bizImagePath={bizImagePath}
              postImagePath={postImagePath}
            />
            <PostDetailBody onImagePath={handleImagePath} />
          </>
        )}
      </div>
    </>
  );
};

export default PostDetail;
