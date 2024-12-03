import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../../api/provider/UserProvider";
import { NoticeSearchStyled } from "../../Notice/NoticeSearch/styled";
import { Button } from "react-bootstrap";

export const BusinessSearch = () => {
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState<{
        searchName: string;
    }>({ searchName: "" });

    const { setSearchKeyWord } = useContext(UserContext);

    useEffect(() => {
        window.location.search && navigate(window.location.pathname, { replace: true });
    }, [navigate]);

    const handlerSearch = () => {
        setSearchKeyWord(searchValue);
    };

    return (
        <>
            <NoticeSearchStyled>
                <div className="input-box">
                    기업명
                    <input onChange={(e) => setSearchValue({ ...searchValue, searchName: e.target.value })}></input>
                    <Button onClick={handlerSearch}>검색</Button>
                </div>
            </NoticeSearchStyled>
        </>
    );
};
