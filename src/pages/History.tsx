import { ApplyProvider } from "../api/provider/ApplyProvider"
import { ContentBox } from "../component/common/ContentBox/ContentBox"
import { HistoryMain } from "../component/page/History/HistoryMain/HistoryMain"
import { HistorySearch } from "../component/page/History/HistorySearch/HistorySearch"

export const History = () => {
    return (
        <div>
            <ApplyProvider>
            <ContentBox>지원내역</ContentBox>
            <HistorySearch/>
            <HistoryMain/>
            </ApplyProvider>
        </div>
    )
}