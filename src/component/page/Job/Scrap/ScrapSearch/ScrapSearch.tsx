import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ScrapContext } from "../../../../../api/provider/ScrapProvider";
import { ScrapSearchStyled } from "./styled";
import { Button } from "../../../../common/Button/Button";
import { postNoticeApi } from "../../../../../api/postNoticeApi";
import { Scrap } from "../../../../../api/api";
import { IPostResponse } from "../../../../../models/interface/IScrap";

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

  const { setSearchKeyWord, selectedScrapIdxList, setSelectedScrapIdxList } =
    useContext(ScrapContext);

  useEffect(() => {
    window.location.search &&
      navigate(window.location.pathname, { replace: true });
  }, [navigate]);

  const handlerSearch = () => {
    setSearchKeyWord(searchValue);
  };

  const handlerDelete = async () => {
    if (selectedScrapIdxList.length === 0) {
      alert("삭제할 스크랩을 선택해주세요.");
      return;
    }

    const deletedApi = postNoticeApi<IPostResponse>(Scrap.getDelete, {
      scrapIdxList: selectedScrapIdxList,
    });

    deletedApi.then((res) => {
      alert("삭제되었습니다.");
      setSelectedScrapIdxList([]);
    });
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
        <Button onClick={handlerDelete}>삭제</Button>
      </div>
    </ScrapSearchStyled>
  );
};
