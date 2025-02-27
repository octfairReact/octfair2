import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { Login } from '../pages/Login';
import { DashBoard } from '../component/layout/DashBoard/DashBoard';
import { NotFound } from '../component/common/NotFound/NotFound';
import { Notice } from '../pages/Notice';
import { History } from '../pages/History';
import { NoticeRouter } from '../component/page/Notice/NoticeRouter/NoticeRouter';
import { Post } from '../pages/Post';
import ManageHirePost from '../pages/ManageHirePost';
import ManageHireApplicant from '../pages/ManageHireApplicant';
import NewHirePost from '../component/page/ManageHire/NewHirePost/NewHirePost';
import { Faq } from '../pages/Faq';
import { Resume } from '../pages/Resume';
import { ResumeWrite } from '../component/page/Resume/ResumeDetail/ResumeWrite';
import { Qna } from '../pages/Qna';
import { Scrap } from '../pages/Scrap';
import PostDetail from '../pages/PostDetail';
import { MyPage } from '../pages/MyPage';
import { Withdraw } from '../pages/Withdraw';
import { ManageApplicant } from '../pages/ManageApplicant';
import { ManageBusiness } from '../pages/ManageBusiness';
import { Company } from '../pages/Company';
import { CompanyInfo } from '../pages/CompanyInfo';
import { ManagePost } from '../pages/ManagePost';
import { Approval } from '../pages/Approval';

const routers: RouteObject[] = [
  { path: '*', element: <NotFound /> },
  { path: '/', element: <Login /> },
  {
    path: '/react',
    element: <DashBoard />,
    children: [
      {
        path: 'board',
        children: [
          { path: 'notice.do', element: <Notice /> },
          { path: 'notice.do/:noticeIdx', element: <NoticeRouter /> },
          { path: 'faq.do', element: <Faq /> },
          { path: 'faq.do/:faqIdx' },
          { path: 'qna.do', element: <Qna /> },
        ],
      },
      {
        path: 'jobs',
        children: [
          { path: 'posts.do', element: <Post /> },
          { path: 'post-detail/:postIdx', element: <PostDetail /> },
          { path: 'scrap.do', element: <Scrap /> },
        ],
      },
      {
        path: 'apply',
        children: [
          { path: 'resume.do', element: <Resume /> },
          { path: 'resumeDetail.do', element: <ResumeWrite /> },
          { path: 'history.do', element: <History /> },
        ],
      },
      {
        path: 'manage-hire',
        children: [
          { path: 'post.do', element: <ManageHirePost /> },
          { path: 'new-post.do', element: <NewHirePost /> },
          { path: 'applicant.do', element: <ManageHireApplicant /> },
          { path: 'update-post.do/:postIdx', element: <NewHirePost /> },
        ],
      },
      {
        path: 'mypage',
        children: [
          { path: 'update.do', element: <MyPage /> },
          { path: 'withdraw.do', element: <Withdraw /> },
        ],
      },
      {
        path: 'manage-user',
        children: [
          { path: 'applicant.do', element: <ManageApplicant /> },
          { path: 'biz.do', element: <ManageBusiness /> },
        ],
      },
      {
        path: 'company',
        children: [
          {
            path: 'companyDetailPage.do/:postIdx/:bizIdx',
            element: <Company />,
          },
          { path: 'companyWrite.do', element: <CompanyInfo /> },
          { path: 'companyUpdate.do/:bizIdx', element: <CompanyInfo /> },
        ],
      },
      {
        path: 'manage-post',
        children: [
          { path: 'post.do', element: <ManagePost /> },
          { path: 'approval.do', element: <Approval /> },
        ],
      },
    ],
  },
];

export const Routers = createBrowserRouter(routers);
