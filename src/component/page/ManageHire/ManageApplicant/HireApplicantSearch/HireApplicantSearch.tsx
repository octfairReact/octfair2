import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const HireApplicantSearch = () => {
  const navigate = useNavigate();
  const [bizList, setBizList] = useState<IBiz[]>();
  interface IBiz {
    postIdx: number,
    title: string,
  }

  const bizDetailList = () => {
    axios.post('/api/apply/historySearchRest.do',).then((res) => {
      const data = res.data;
      setBizList(data.result);
    })
  }

  return (
    <div className="inputSelect">
      <span id="selectText" ></span>
      <select id="postTitle">
        {bizList?.map((MDetail) => (
          <option key={MDetail.postIdx} value={MDetail.postIdx}>
            {MDetail.title}
          </option>
        ))}

      </select>
      <select id="selectValue">
        <option value="서류심사중" >서류심사</option>
        <option value="면접진행중" >면접진행</option>
        <option value="최종합격" >최종합격</option>
        <option value="탈락" >불합격</option>
      </select>
    </div>
  )
}

export default HireApplicantSearch