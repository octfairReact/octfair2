import { useContext, useEffect, useState } from "react";
import { IBiz, IBizListResponse } from "../../../../models/interface/IBiz";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { UserContext } from "../../../../api/provider/UserProvider";
import { postApi } from "../../../../api/postApi";
import { ManageBusiness } from "../../../../api/api";
import { StyledTable, StyledTd, StyledTh } from "../../../common/styled/StyledTable";
import { Button } from "react-bootstrap";
import { PageNavigate } from "../../../common/pageNavigation/PageNavigate";
import { Portal } from "../../../common/potal/Portal";
import { BusinessModal } from "../BusinessModal/BusinessModal";

export const BusinessMain = () => {

    const [businessList, setBusinessList] = useState<IBiz[]>();
    const [listCount, setListCount] = useState<number>(0);
    const [modal, setModal] = useRecoilState<boolean>(modalState);

    const [loginId, setLoginId] = useState<string>("");
    const [bizIdx, setBizIdx] = useState<number>(0);
    const [cPage, setCPage] = useState<number>();
    const { searchKeyWord } = useContext(UserContext);

     useEffect(() => {
     // console.log(searchKeyWord);
     searchBizList();
 }, [searchKeyWord]);
    
    const searchBizList = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const searchParam = {
            ...searchKeyWord,
            currentPage: currentPage.toString(),
            pageSize: "5",
        };

        const searchList = await postApi<IBizListResponse>(ManageBusiness.getList, searchParam);

        if (searchList) {
            setBusinessList(searchList.biz);
            setListCount(searchList.bizCnt);
            setCPage(currentPage);
        }
    };

    const onPostSuccess = () => {
        setModal(!modal);
        searchBizList();
    };

    const handlerModal = (bizIdx: number) => {
        setModal(!modal);
        setBizIdx(bizIdx);
    };


    return (
        <>
            총 갯수 : {listCount} 현재 페이지 : {cPage}
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={10}>사업자번호</StyledTh>
                        <StyledTh size={20}>사업자명</StyledTh>
                        <StyledTh size={15}>대표자</StyledTh>
                        <StyledTh size={15}>연락처</StyledTh>
                        <StyledTh size={30}>홈페이지</StyledTh>
                        <StyledTh size={10}>관리</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {businessList?.length > 0 ? (
                        businessList?.map((biz) => {
                            return (
                                <tr>
                                    <StyledTd>{biz.bizIdx}</StyledTd>
                                    <StyledTd>{biz.bizName}</StyledTd>
                                    <StyledTd>{biz.bizCeoName}</StyledTd>
                                    <StyledTd>{biz.bizContact}</StyledTd>
                                    <StyledTd>{biz.bizWebUrl}</StyledTd>
                                    <StyledTd>
                                        <Button onClick={() => handlerModal(biz.bizIdx)}>관리</Button>
                                    </StyledTd>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <StyledTd colSpan={3}>데이터가 없습니다.</StyledTd>
                        </tr>
                    )}
                </tbody>
            </StyledTable>
            <PageNavigate
                totalItemsCount={listCount}
                onChange={searchBizList}
                activePage={cPage}
                itemsCountPerPage={5}
            ></PageNavigate>
            {modal && (
                <Portal>
                    <BusinessModal bizIdx={bizIdx} onSuccess={onPostSuccess} />
                </Portal>
            )}
        </>
    );
};
