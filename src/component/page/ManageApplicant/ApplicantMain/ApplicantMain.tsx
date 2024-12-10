import { useContext, useEffect, useState } from "react";
import { IUser, IUserListResponse } from "../../../../models/interface/IUser";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { UserContext } from "../../../../api/provider/UserProvider";
import { postApi } from "../../../../api/postApi";
import { ManageApplicant } from "../../../../api/api";
import { StyledTable, StyledTd, StyledTh } from "../../../common/styled/StyledTable";
import { Button } from "react-bootstrap";
import { PageNavigate } from "../../../common/pageNavigation/PageNavigate";
import { ApplicantModal } from "../ApplicantModal/ApplicantModal";
import { Portal } from "../../../common/potal/Portal";

export const ApplicantMain = () => {
    const [applicantList, setApplicantList] = useState<IUser[]>();
    const [listCount, setListCount] = useState<number>(0);
    const [modal, setModal] = useRecoilState<boolean>(modalState);

    const [loginId, setLoginId] = useState<string>("");
    const [cPage, setCPage] = useState<number>();
    const { searchKeyWord } = useContext(UserContext);

    useEffect(() => {
        // console.log(searchKeyWord);
        searchApplicantList();
    }, [searchKeyWord]);

    const searchApplicantList = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const searchParam = {
            ...searchKeyWord,
            currentPage: currentPage.toString(),
            pageSize: "5",
        };

        const searchList = await postApi<IUserListResponse>(ManageApplicant.getList, searchParam);

        if (searchList) {
            setApplicantList(searchList.applicant);
            setListCount(searchList.applicantCnt);
            setCPage(currentPage);
        }
    };

    const onPostSuccess = () => {
        setModal(!modal);
        searchApplicantList();
    };

    const handlerModal = (loginId: string) => {
        setModal(!modal);
        setLoginId(loginId);
    };
    return (
        <>
            총 갯수 : {listCount} 현재 페이지 : {cPage}
            <StyledTable>
                <thead>
                    <tr>
                        <StyledTh size={10}>회원번호</StyledTh>
                        <StyledTh size={20}>회원ID</StyledTh>
                        <StyledTh size={15}>회원명</StyledTh>
                        <StyledTh size={30}>이메일</StyledTh>
                        <StyledTh size={15}>회원 가입날짜</StyledTh>
                        <StyledTh size={10}>관리</StyledTh>
                    </tr>
                </thead>
                <tbody>
                    {applicantList?.length > 0 ? (
                        applicantList?.map((applicant) => {
                            return (
                                <tr>
                                    <StyledTd>{applicant.userIdx}</StyledTd>
                                    <StyledTd>{applicant.loginId}</StyledTd>
                                    <StyledTd>{applicant.name}</StyledTd>
                                    <StyledTd>{applicant.email}</StyledTd>
                                    <StyledTd>{applicant.regdate}</StyledTd>
                                    <StyledTd>
                                        <Button onClick={() => handlerModal(applicant.loginId)}>관리</Button>
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
                onChange={searchApplicantList}
                activePage={cPage}
                itemsCountPerPage={5}
            ></PageNavigate>
            {modal && (
                <Portal>
                    <ApplicantModal loginId={loginId} onSuccess={onPostSuccess} />
                </Portal>
            )}
        </>
    );
};
