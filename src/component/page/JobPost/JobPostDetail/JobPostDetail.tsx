import { useParams } from "react-router-dom";
import {
  IBizDetail,
  IJobPostDetail,
  IPostdetailResponse,
} from "../../../../models/interface/IJobPost";
import { useEffect, useState } from "react";
import { postApi } from "../../../../api/postApi";
import { error } from "console";
import { ContentBox } from "../../../common/ContentBox/ContentBox";
import { JobPost } from "../../../../api/api";
import { StyledTable } from "../../../common/styled/StyledTable";

export const JobPostDetail = () => {
  const { postIdx, bizIdx } = useParams();
  const [postDetail, setPostDetail] = useState<IJobPostDetail | null>(null);
  const [bizDetail, setBizDetail] = useState<IBizDetail | null>(null);

  useEffect(() => {
    postDetailData(postIdx, bizIdx);
  }, [postIdx, bizIdx]);

  const postDetailData = async (postIdx: string, bizIdx: string) => {
    const params = { postIdx, bizIdx };

    const response = await postApi<IPostdetailResponse>(
      JobPost.getDetail,
      params
    );

    console.log("API Response: ", response);
    // console.log(response.)
    if (response) {
      setPostDetail(response.postDetail);
      setBizDetail(response.bizDetail);
    }
  };

  console.log("received params : ", { postIdx, bizIdx });
  return (
    <>
      <ContentBox>채용 공고</ContentBox> <br></br>
      {postDetail?.postIdx ? (
        <>
          <div className="container">
            <div className="leftInformation">leftInformation</div>
            <div className="rightInformation">rightInformation</div>
          </div>
        </>
      ) : (
        <p>로딩중...</p>
      )}
    </>
  );
};
