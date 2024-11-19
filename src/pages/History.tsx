import { ApplyProvider } from "../api/provider/ApplyProvider"
import { HistoryMain } from "../component/page/History/HistoryMain/HistoryMain"
import { HistorySearch } from "../component/page/History/HistorySearch/HistorySearch"

export const History = () => {
    return (
        <div>
            <ApplyProvider>
            <HistorySearch/>
            <HistoryMain/>
            </ApplyProvider>
        </div>
    )
}