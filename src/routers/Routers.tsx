import { RouteObject, createBrowserRouter } from 'react-router-dom';
import { Login } from '../pages/Login';
import { DashBoard } from '../component/layout/DashBoard/DashBoard';
import { NotFound } from '../component/common/NotFound/NotFound';
import { Notice } from '../pages/Notice';
import { History } from '../pages/History';
import { NoticeRouter } from '../component/page/Notice/NoticeRouter/NoticeRouter';
import { JobPost } from '../pages/JobPost';
import { Faq } from '../pages/Faq';
import { FaqRouter } from '../component/page/Faq/FaqRouter/FaqRouter';

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
          { path: 'faq.do/:faqIdx', element: <FaqRouter /> },
        ],
      },
      {
        path: 'jobs',
        children: [{ path: 'posts.do', element: <JobPost /> }],
      },
      {
        path: 'apply',
        children: [{ path: 'history.do', element: <History /> }],
      },
    ],
  },
];

export const Routers = createBrowserRouter(routers);
