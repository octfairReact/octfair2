import { Button } from "../../../common/Button/Button";
import { useContext } from "react";
import { ResumeContext } from "../../../../api/provider/ResumeProvider";

export const ResumeState = () => {
  const { setSearchKeyWord } = useContext(ResumeContext);

  const handlerAdd = () => {
    //
  };

  const handlerDelete = () => {
    //
  };

  return (
    <div className="input-box">
      <Button onClick={handlerAdd}>복사하기</Button>
      <Button onClick={handlerDelete}>삭제하기</Button>
    </div>
  );
};
