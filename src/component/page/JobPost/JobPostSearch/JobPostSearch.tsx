import { useContext, useEffect, useState } from "react";
import { JobPostSearchStyled } from "./styled";
import { Button } from "react-bootstrap";
import { JobPostContext } from "../../../../api/provider/JobPostProvider";
import { useNavigate } from "react-router-dom";

export const JobPostSearch = () => {
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

  const { setSearchKeyWord } = useContext(JobPostContext);

  useEffect(() => {
    window.location.search &&
      navigate(window.location.pathname, { replace: true });
  }, [navigate]);

  const handlerSearch = () => {
    setSearchKeyWord(searchValue);
    console.log(searchValue);
  };

  return (
    <JobPostSearchStyled>
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
    </JobPostSearchStyled>
  );
};
