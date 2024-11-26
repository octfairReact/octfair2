import { UserProvider } from "../api/provider/UserProvider";
import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { ApplicantMain } from "../component/page/ManageApplicant/ApplicantMain/ApplicantMain";
import { ApplicantSearch } from "../component/page/ManageApplicant/ApplicantSearch/ApplicantSearch";


export const ManageApplicant = () => {
    return (
        <>
            <UserProvider>
                <ContentBox>구직자 회원 관리</ContentBox>
                <ApplicantSearch />
                <ApplicantMain />
            </UserProvider>
        </>
    );
};
