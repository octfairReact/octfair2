import { UserProvider } from "../api/provider/UserProvider";
import { ContentBox } from "../component/common/ContentBox/ContentBox";
import { BusinessMain } from "../component/page/ManageBusiness/BusinessMain/BusinessMain";
import { BusinessSearch } from "../component/page/ManageBusiness/BusinessSearch/BusinessSearch";



export const ManageBusiness = () => {
    return (
        <>
            <UserProvider>
                <ContentBox>기업 회원 관리</ContentBox>
                <BusinessSearch />
                <BusinessMain />
            </UserProvider>
        </>
    );
};
