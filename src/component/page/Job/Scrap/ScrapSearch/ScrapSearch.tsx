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

  // const { setSearchKeyWord, selectedScrapIdx, setSelectedScrapIdx } =
  const { setSearchKeyWord, selectedScrapIdxList, setSelectedScrapIdxList } =
    useContext(ScrapContext);

  useEffect(() => {
    window.location.search &&
      navigate(window.location.pathname, { replace: true });
  }, [navigate]);

  const handlerSearch = () => {
    // console.log(searchValue);
    setSearchKeyWord(searchValue);
  };

  const handlerDelete = async () => {
    // if (selectedScrapIdx == null) {
    if (selectedScrapIdxList.length === 0) {
      alert("삭제할 스크랩을 선택해주세요.");
      return;
    }

    // console.log("selectedScrapIdx : ", selectedScrapIdx);
    // const deleteApi = await postNoticeApi<IPostResponse>(Scrap.getDelete, {
    //   scrapIdx: selectedScrapIdx,
    // });

    // if (deleteApi?.result === "success") {
    //   alert("삭제되었습니다.");

    // setSelectedScrapIdx(null);

    const deletedApi = selectedScrapIdxList.map((scrapIdx) =>
      postNoticeApi<IPostResponse>(Scrap.getDelete, { scrapIdx })
    );

    const results = await Promise.all(deletedApi);

    if (results.every((res) => res?.result === "success")) {
      alert("삭제되었습니다.");
      setSelectedScrapIdxList([]);
    }
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
