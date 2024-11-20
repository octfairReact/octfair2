import React from "react";
import { ContentBox } from "../component/common/ContentBox/ContentBox";
import HireApplicantSearch from "../component/page/ManageHire/ManageApplicant/HireApplicantSearch/HireApplicantSearch";
import HireApplicantMain from "../component/page/ManageHire/ManageApplicant/HireApplicantMain/HireApplicantMain";

const ManageHireApplicant = () => {
  return (
    <>
      <ContentBox>지원자 관리</ContentBox>
      <HireApplicantSearch />
      <HireApplicantMain />
    </>
  );
};

export default ManageHireApplicant;
