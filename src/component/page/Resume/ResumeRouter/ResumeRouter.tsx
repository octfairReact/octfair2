import { useLocation, useParams } from "react-router-dom";

export const ResumeRouter = () => {
  const { resumeIdx } = useParams();
  const { state } = useLocation();

  return (
    <>
      다이나믹 라우터로 변경된 url의 값 : {resumeIdx} <br></br>
      url이 변경될 때, 상태값을 넘겨서 받아온 값 : {state.title}
    </>
  );
};
