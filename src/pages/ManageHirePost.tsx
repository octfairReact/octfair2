import React, { useState } from "react";
import HirePostSearch from "../component/page/ManageHire/ManagePost/HirePostSearch/HirePostSearch";
import HirePostMain from "../component/page/ManageHire/ManagePost/HirePostMain/HirePostMain";
import { ContentBox } from "../component/common/ContentBox/ContentBox";

const ManageHirePost = () => {
  const [searchParams, setSearchParams] = useState({
    selectStatus: "all",
    keyword: "",
  });

  const handleSearch = (status: string, keyword: string) => {
    setSearchParams({ selectStatus: status, keyword: keyword });
  };

  return (
    <>
      <ContentBox>채용공고 관리</ContentBox>
      <HirePostSearch onSearch={handleSearch}/>
      <HirePostMain searchParams={searchParams}/>
    </>
  );
};

export default ManageHirePost;
