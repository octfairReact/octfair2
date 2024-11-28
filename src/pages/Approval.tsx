import { ApprovalProvider } from "../api/provider/ApprovalProvider";
import { ContentBox } from "../component/common/ContentBox/ContentBox";
import ApprovalMain from "../component/page/Approval/ApprovalMain/ApprovalMain";
import { ApprovalSearch } from "../component/page/Approval/ApprovalSearch/ApprovalSearch"

export const Approval = () => {
    return(
        <>
            <ApprovalProvider>
                <ContentBox>공고 심사</ContentBox>
                <ApprovalSearch />
                <ApprovalMain />
            </ApprovalProvider>
        </>
    );
}