export const Login = {
  login: '/loginProc.do',
};

export const Notice = {
  getList: '/board/noticeListJson.do',
  getListBody: '/board/noticeListBody.do',
  getDetail: '/board/noticeDetailBody.do',
  getSave: '/board/noticeSaveBody.do',
  getUpdate: '/board/noticeUpdateBody.do',
  getDelete: '/board/noticeDeleteBody.do',
};

export const Faq = {
  getList: '/board/faqListJson.do',
  getListBody: '/board/faqListBody.do',
  getDetail: '/board/faqDetailBody.do',
  getDelete: '/board/faqDeleteBody.do',
};

export const JobPost = {
  getList: '/api/jobs/readPostList.do',
};

export const Resume = {
  getList: '/api/apply/resumeList.do',
  getCopy: '/api/apply/resumeCopy.do',
};

export const SignUp = {
  register: '/register.do',
};
