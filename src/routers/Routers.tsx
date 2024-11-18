import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { DashBoard } from "../component/layout/DashBoard/DashBoard";
import { NotFound } from "../component/common/NotFound/NotFound";
import { Notice } from "../pages/Notice";
import { History } from "../pages/History";
import { NoticeRouter } from "../component/page/Notice/NoticeRouter/NoticeRouter";

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
        path: "apply",
        children: [
          { path: "history.do", element: <History /> },
        ],
      },
    ],
  },
];

export const Routers = createBrowserRouter(routers);
