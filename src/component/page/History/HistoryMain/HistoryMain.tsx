import axios from "axios";
import { useEffect } from "react";

export const HistoryMain = () => {

    useEffect(() => {
        hitoryList();
    },[])
    const hitoryList = () => {
        axios.get('/api/apply/historyRest.do',).then((res) => {
            const data = res.data;
            console.log(data);
        })
    }

    return(
    <></>
    );
}