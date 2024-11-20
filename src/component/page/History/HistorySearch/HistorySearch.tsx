import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApplyContext } from "../../../../api/provider/ApplyProvider";

export const HistorySearch = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState<{
        startDate: string;
        viewStatus: string;
        sortOrder: string;
        keyword: string;
      }>({
        startDate: "",
        viewStatus: "",
        sortOrder: "",
        keyword: "",
      });
    const { setSearchKeyWord } = useContext(ApplyContext);

  useEffect(() => {
    window.location.search &&
      navigate(window.location.pathname, { replace: true });
  }, [navigate]);

  const CaculateStartDate = (e) => {
    const period= e.target.value;
    const today = new Date();

    switch (period) {
        case "1week":
          today.setDate(today.getDate() - 7);
          break;
        case "1month":
          today.setMonth(today.getMonth() - 1);
          break;
        case "2month":
          today.setMonth(today.getMonth() - 2);
          break;
        case "3month":
          today.setMonth(today.getMonth() - 3);
          break;
        case "6month":
          today.setMonth(today.getMonth() - 6);
          break;
        case "1year":
          today.setFullYear(today.getFullYear() - 1);
          break;
        default:
          today.setFullYear(today.getFullYear() - 3);
          break;
    }
    
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); 
    const day = String(today.getDate()).padStart(2, '0');
    const startDate=`${year}-${month}-${day}`;

    setSearchValue({ ...searchValue, startDate: startDate })
  }

  const handlerSearch = () => {
    setSearchKeyWord(searchValue);
  };

    return(
        <>
        <p className="conTitle">
							<span>입사지원 내역</span> <span className="fr"> <select
								className="period" id="period" onChange={CaculateStartDate} >
									<option value="all">조회기간 전체</option>
									<option value="1week">지난 1주일</option>
									<option value="1month">지난 1개월</option>
									<option value="2month">지난 2개월</option>
									<option value="3month">지난 3개월</option>
									<option value="6month">지난 6개월</option>
									<option value="1year">지난 1년</option>
							</select> <select className="view-status" id="view-status" defaultValue="all" onChange={(e) =>
                                    setSearchValue({ ...searchValue, viewStatus: e.target.value })}>
									<option value="all">열람여부 전체</option>
									<option value="1">열람</option>
									<option value="0">미열람</option>
							</select> <select className="sort-order" id="sort-order" defaultValue="desc" onChange={(e) =>
                                    setSearchValue({ ...searchValue, sortOrder: e.target.value })}>
									<option value="desc">최근지원순</option>
									<option value="asc">과거지원순</option>
							</select> <input type="text" className="keyword" id="keyword"
								placeholder="키워드 입력"  onChange={(e) =>
                                    setSearchValue({ ...searchValue, keyword: e.target.value })}/> 
                                <button className="btnType blue" onClick={handlerSearch}>검색</button> 
                                <a className="btnType gray" href="javascript:reset()"><span>초기화</span></a>
							</span>
						</p>
        </>
    );
}