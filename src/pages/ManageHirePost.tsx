import React from "react";
import HirePostSearch from "../component/page/ManageHire/ManagePost/HirePostSearch/HirePostSearch";
import HirePostMain from "../component/page/ManageHire/ManagePost/HirePostMain/HirePostMain";
import { ContentBox } from "../component/common/ContentBox/ContentBox";
const ManageHirePost = () => {
  return (
    <>
      <ContentBox>채용공고 관리</ContentBox>
      <HirePostSearch />
      <HirePostMain />
    </>
  );
};

export default ManageHirePost;
