import { useContext, useEffect, useState } from "react";
import { PostContext } from "../../../../api/provider/PostProvider";
import { useNavigate } from "react-router-dom";
import { PostSearchStyled } from "./styled";
import { Button } from "../../../common/Button/Button";
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
  
    const { setSearchKeyWord } = useContext(PostContext);
  
    useEffect(() => {
      window.location.search &&
        navigate(window.location.pathname, { replace: true });
    }, [navigate]);
  
    const handlerSearch = () => {
      setSearchKeyWord(searchValue);
      // console.log(searchValue);
    };
  
    return (
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
    );
}