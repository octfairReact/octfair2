import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { HireApplicantContext } from '../../../../../api/provider/HireApplicantProvider.';

const HireApplicantSearch = () => {
  const navigate = useNavigate();
  const [bizList, setBizList] = useState<IBiz[]>();
  const [searchValue, setSearchValue] = useState<{
    postIdx : string,
		keyword : string,
  }>({
    postIdx: "",
    keyword: "",
  });
const { setSearchKeyWord } = useContext(HireApplicantContext);

  interface IBiz {
    postIdx: number,
    title: string,
  }

  useEffect(() => {
    window.location.search &&
    navigate(window.location.pathname, { replace: true});
  },[navigate]);

  useEffect(() => {    
    bizDetailList();     
  },[]);

  useEffect(() => {     
    if(searchValue.postIdx !== ''){
      setSearchKeyWord(searchValue);
    }      
  },[searchValue])

  const bizDetailList = () => {
    axios.post('/api/manage-hire/applicant.do',).then((res) => {
      const data = res.data;
      setBizList(data.MDetail);
       
      if(data.MDetail.length===0){
        alert("지원자가 없습니다.");
        navigate("/react/manage-hire/post.do");        
      }else{
        setSearchValue({postIdx : data.MDetail[0].postIdx.toString(), keyword : "서류심사중" });            
      }
    })
  }
  const handlerSearch = (e) => {
    setSearchValue({...searchValue, keyword : e.target.value})
    // console.log(searchValue);    
    // setSearchKeyWord(searchValue);
  };

  return (
    <div className="inputSelect">
      <span id="selectText" ></span>
      <select id="postTitle" 
      onChange={(e) => setSearchValue({...searchValue, postIdx : e.target.value})}
      value={searchValue.postIdx}
      >
        {bizList?.map((MDetail) => (
          <option key={MDetail.postIdx} value={MDetail.postIdx}>
            {MDetail.title}
          </option>
        ))}

      </select>
      <select id="selectValue" onChange={(e) => 
        handlerSearch(e)} value={searchValue.keyword}>
        <option value="서류심사중" >서류심사</option>
        <option value="면접진행중" >면접진행</option>
        <option value="최종합격" >최종합격</option>
        <option value="탈락" >불합격</option>
      </select>
    </div>
  )
}

export default HireApplicantSearch