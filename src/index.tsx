import ReactDOM from "react-dom/client";
import { RecoilRoot } from "recoil";
import { RouterProvider } from "react-router-dom";
import { Routers } from "./routers/Routers";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/font/pretendard.css";
import GlobalStyles from "./component/common/styled/GlobalStyled";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <RecoilRoot>
    <GlobalStyles/>
      <RouterProvider router={Routers} />
  </RecoilRoot>
);
