import { Button } from "../../../common/Button/Button";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NoticeContext } from "../../../../api/provider/NoticeProvider";
import { ResumeAddStyled } from "./styled";

export const ResumeAdd = () => {
  const navigate = useNavigate();
  const { setSearchKeyWord } = useContext(NoticeContext);

  useEffect(() => {
    window.location.search &&
      navigate(window.location.pathname, { replace: true });
  }, [navigate]);

  const handlerAdd = () => {
    //
  };

  return (
    <ResumeAddStyled>
      <div className="input-box">
        <Button onClick={handlerAdd}>새 이력서작성</Button>
      </div>
    </ResumeAddStyled>
  );
};
