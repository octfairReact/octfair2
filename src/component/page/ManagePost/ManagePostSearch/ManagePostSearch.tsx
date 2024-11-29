import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ManagePostContext } from "../../../../api/provider/ManagePostProvider";
import { Button } from "../../../common/Button/Button";
import { PostSearchStyled } from "../../Job/Post/PostSearch/styled";

export const ManagePostSearch = () => {
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

  const { setSearchKeyWord } = useContext(ManagePostContext);

  useEffect(() => {
    window.location.search &&
      navigate(window.location.pathname, { replace: true });
  }, [navigate]);

  const handlerSearch = () => {
    setSearchKeyWord(searchValue);
  };

  return (
    <>
      <PostSearchStyled>
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
      </PostSearchStyled>
    </>
  );
};

export default ManagePostSearch;
