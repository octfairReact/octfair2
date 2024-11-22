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
};

export const Resume = {
  getList: "/api/apply/resumeList.do",
  getCopy: "/api/apply/resumeCopy.do",
  getDelete: "/api/apply/resumeDelete.do",
  getDetail: "/api/apply/resumeDetail.do",
  getCareer: "/api/apply/careerList.do",
  getEdu: "/api/apply/educationList.do",
  getSkill: "/api/apply/skillList.do",
  getCert: "/api/apply/certList.do",
};

export const SignUp = {
  register: "/register.do",
  getList: "/api/apply/resumeList.do",
  getCopy: "/api/apply/resumeCopy.do",
  getDelete: "/api/apply/resumeDelete.do",
};

export const HirePost = {
  getList: "/api/manage-hire/post-list",
};
