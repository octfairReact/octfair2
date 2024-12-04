import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApprovalSearchStyled } from "./styled";
import { Button } from "../../../common/Button/Button";
import { ApprovalContext } from "../../../../api/provider/ApprovalProvider";
export const ApprovalSearch = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState<{
    searchTitle: string;
    searchStDate: string;
    searchEdDate: string;
  }>({
    searchTitle: "",
    searchStDate: "",
    searchEdDate: "",
  });

  const { setSearchKeyWord } = useContext(ApprovalContext);

  useEffect(() => {
    window.location.search &&
      navigate(window.location.pathname, { replace: true });
  }, [navigate]);

  const handlerSearch = () => {
    setSearchKeyWord(searchValue);
  };

  return (
    <ApprovalSearchStyled>
      <div className="input-box">
        <input
          onChange={(e) =>
            setSearchValue({ ...searchValue, searchTitle: e.target.value })
          }
        ></input>
        <input
          type="date"
          onChange={(e) =>
            setSearchValue({ ...searchValue, searchStDate: e.target.value })
          }
        ></input>
        <input
          type="date"
          onChange={(e) =>
            setSearchValue({ ...searchValue, searchEdDate: e.target.value })
          }
        ></input>
        <Button onClick={handlerSearch}>검색</Button>
      </div>
    </ApprovalSearchStyled>
  );
};

export default ApprovalSearch;
