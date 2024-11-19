import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { DashBoard } from "../component/layout/DashBoard/DashBoard";
import { NotFound } from "../component/common/NotFound/NotFound";
import { Notice } from "../pages/Notice";
import { History } from "../pages/History";
import { NoticeRouter } from "../component/page/Notice/NoticeRouter/NoticeRouter";
import { JobPost } from "../pages/JobPost";
import { Resume } from "../pages/Resume";

const routers: RouteObject[] = [
  { path: "*", element: <NotFound /> },
  { path: "/", element: <Login /> },
  {
    path: "/react",
    element: <DashBoard />,
    children: [
      {
        path: "board",
        children: [
          { path: "notice.do", element: <Notice /> },
          { path: "notice.do/:noticeIdx", element: <NoticeRouter /> },
        ],
      },
      {
        path: "jobs",
        children: [{ path: "posts.do", element: <JobPost /> }],
      },
      {
        path: "apply",
        children: [
          { path: "resume.do", element: <Resume /> },
          { path: "history.do", element: <History /> }
        ],
      },
    ],
  },
];

export const Routers = createBrowserRouter(routers);
