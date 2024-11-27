export const Login = {
    login: "/loginProc.do",
};

export const Notice = {
    getList: "/board/noticeListJson.do",
    getListBody: "/board/noticeListBody.do",
    getDetail: "/board/noticeDetailBody.do",
    getSave: "/board/noticeSaveBody.do",
    getUpdate: "/board/noticeUpdateBody.do",
    getDelete: "/board/noticeDeleteBody.do",
};

export const Faq = {
    getList: "/board/faqListJson.do",
    getListBody: "/board/faqListBody.do",
    getDetail: "/board/faqDetailBody.do",
    getDelete: "/board/faqDeleteBody.do",
};

export const Qna = {
    getList: "/board/qnaListJson.do",
    getListBody: "/board/qnaListBody.do",
    getDetail: "/board/qnaDetailFileBody.do",
    getDelete: "/board/qnaDeleteBody.do",
};

export const Post = {
    getList: "/api/jobs/readPostList.do",
    getDetail: "/api/jobs/readPostDetailBody.do",
};

export const Scrap = {
    getList: "/api/jobs/readScrapList.do",
    saveScrap: "/api/jobs/saveScrap.do",
    getDelete: "/api/jobs/deleteScrap.do",
};

export const Resume = {
    getList: "/api/apply/resumeList.do",
    getCopy: "/api/apply/resumeCopy.do",
    getUpdate: "/api/apply/resumeUpdate.do",
    getDelete: "/api/apply/resumeDelete.do",
    getNew: "/api/apply/resumeNew.do",
    getDetail: "/api/apply/resumeDetail.do",
    getCareer: "/api/apply/careerList.do",
    getEdu: "/api/apply/educationList.do",
    getSkill: "/api/apply/skillList.do",
    getCert: "/api/apply/certList.do",

    addCareer: "/api/apply/insertCareer.do",
    addEdu: "/api/apply/insertEdu.do",
    addSkill: "/api/apply/insertSkill.do",
    addCert: "/api/apply/insertCert.do",

    deleteCareer: "/api/apply/deleteCareer.do",
    deleteEdu: "/api/apply/deleteEdu.do",
    deleteSkill: "/api/apply/deleteSkill.do",
    deleteCert: "/api/apply/deleteCert.do",
    deleteFile: "/api/apply/deleteFile.do",
};

export const SignUp = {
    register: "/api/register.do",
    checkId: "/api/check_loginId.do",
    findId: "/api/selectFindInfoId.do",
    findPw: "/api/selectFindInfoPw.do",
    updatePw: "/api/updateFindPw.do",
};

export const HirePost = {
    getList: "/api/manage-hire/post-list",
};

export const History = {
    getList: "/api/apply/historySearchRest.do",
    deleteApply: "/api/apply/cancleApply.do",
};

export const HireApplicant = {
    getList: "/api/manage-hire/applicantList.do",
    updateStatus: "/api/manage-hire/statusUpdate.do",
    viewUpadate: "/api/manage-hire/viewUpdate.do",
    previewResume: "/api/manage-hire/previewResume.do",
    getBizList: "/api/manage-hire/applicant.do",
};

export const MyPage = {
    getDetail: "/api/mypage/userDetail.do",
    getUpdate: "/api/mypage/updateUserInfo.do",
    updatePw: "/api/mypage/updatePw.do",
    deleteUser: "/api/mypage/deleteUser.do",
};


export const ManageApplicant = {
    getList: "/api/manage-user/applicantListBody.do",
    getDetail: "/api/manage-user/applicantManageDetail.do",
    getUpdate: "/api/manage-user/applicantInfoUpdate.do",
    getResetPw: "/api/manage-user/applicantPwReset.do",
};

export const ManageBusiness = {
    getList: "/api/manage-user/bizList.do",
    getDetail: "/api/manage-user/bizManageDetail.do",
    getUpdate: "/api/manage-user/bizInfoUpdate.do",
};

export const Company = {
    getDetail: "/api/company/companyDetailPage.do",
    getUpdate: "/api/company/companyUpdatePage.do",
}