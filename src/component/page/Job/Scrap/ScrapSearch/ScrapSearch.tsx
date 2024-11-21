import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScrapContext } from "../../../../../api/provider/ScrapProvider";
import { ScrapSearchStyled } from "./styled";
import { Button } from "../../../../common/Button/Button";

export const ScrapSearch = () => {
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

  const { setSearchKeyWord } = useContext(ScrapContext);

  useEffect(() => {
    window.location.search &&
      navigate(window.location.pathname, { replace: true });
  }, [navigate]);

  const handlerSearch = () => {
    // console.log(searchValue);
    setSearchKeyWord(searchValue);
  };

  return (
    <ScrapSearchStyled>
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
        <Button>삭제</Button>
      </div>
    </ScrapSearchStyled>
  );
};
