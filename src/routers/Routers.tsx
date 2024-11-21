import { RouteObject, createBrowserRouter } from "react-router-dom";
import { Login } from "../pages/Login";
import { DashBoard } from "../component/layout/DashBoard/DashBoard";
import { NotFound } from "../component/common/NotFound/NotFound";
import { Notice } from "../pages/Notice";
import { History } from "../pages/History";
import { NoticeRouter } from "../component/page/Notice/NoticeRouter/NoticeRouter";
import { Post } from "../pages/Post";
import ManageHirePost from "../pages/ManageHirePost";
import ManageHireApplicant from "../pages/ManageHireApplicant";
import NewHirePost from "../component/page/ManageHire/NewHirePost/NewHirePost";
import { Faq } from "../pages/Faq";
import { FaqRouter } from "../component/page/Faq/FaqRouter/FaqRouter";
import { Resume } from "../pages/Resume";
import { PostDetails } from "../component/page/Job/Post/PostDetails/PostDetails";
import { ResumeWrite } from "../component/page/Resume/ResumeDetail/ResumeWrite";
import { Qna } from "../pages/Qna";
import { Scrap } from "../pages/Scrap";

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
                    {
                        path: "board",
                        children: [
                            { path: "notice.do", element: <Notice /> },
                            { path: "notice.do/:noticeIdx", element: <NoticeRouter /> },
                            { path: "faq.do", element: <Faq /> },
                            { path: "faq.do/:faqIdx", element: <FaqRouter /> },
                            { path: "qna.do", element: <Qna /> },
                        ],
                    },
                    {
                        path: "jobs",
                        children: [{ path: "posts.do", element: <Post /> }],
                    },
                    {
                        path: "manage-post",
                        children: [{ path: ":postIdx/:bizIdx", element: <PostDetails /> }],
                    },
                    {
                        path: "apply",
                        children: [
                            { path: "resume.do", element: <Resume /> },
                            { path: "resumeDetail.do", element: <ResumeWrite /> },
                            { path: "history.do", element: <History /> },
                        ],
                    },
                    {
                        path: "manage-hire",
                        children: [
                            { path: "post.do", element: <ManageHirePost /> },
                            { path: "new-post.do", element: <NewHirePost /> },
                            { path: "applicant.do", element: <ManageHireApplicant /> },
                        ],
                    },
                ],
            },
            {
                path: "jobs",
                children: [
                    { path: "posts.do", element: <Post /> },
                    { path: "postDetail/:postIdx", element: <PostDetails /> },
                    { path: "scrap.do", element: <Scrap /> },
                ],
            },
            {
                path: "apply",
                children: [
                    { path: "resume.do", element: <Resume /> },
                    { path: "resumeDetail.do", element: <ResumeWrite /> },
                    { path: "history.do", element: <History /> },
                ],
            },
            {
                path: "manage-hire",
                children: [
                    { path: "post.do", element: <ManageHirePost /> },
                    { path: "new-post.do", element: <NewHirePost /> },
                    { path: "applicant.do", element: <ManageHireApplicant /> },
                ],
            },
        ],
    },
];

export const Routers = createBrowserRouter(routers);
