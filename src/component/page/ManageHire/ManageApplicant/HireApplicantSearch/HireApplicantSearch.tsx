import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { HireApplicantContext } from '../../../../../api/provider/HireApplicantProvider.';
import { IApplicantSearch, IBiz, IBizSearch } from '../../../../../models/interface/IHireApplicant';
import { Form, Stack } from 'react-bootstrap';
import { postApi } from '../../../../../api/postApi';
import { HireApplicant } from '../../../../../api/api';

const HireApplicantSearch = () => {
  const navigate = useNavigate();
  const [bizList, setBizList] = useState<IBiz[]>();
  const [searchValue, setSearchValue] = useState<IApplicantSearch>({
    postIdx: "",
    keyword: "",
  });
const { setSearchKeyWord } = useContext(HireApplicantContext);

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

  const bizDetailList = async () => {
    const searchList = await postApi<IBizSearch>(
      HireApplicant.getBizList,
      {}
    );
    if(searchList.MDetail.length>0){
      console.log(searchList);
      setBizList(searchList.MDetail);
      setSearchValue({postIdx : searchList.MDetail[0].postIdx.toString(), keyword : "서류심사중" });
    }else{
      alert("지원자가 없습니다.");
      navigate("/react/manage-hire/post.do");    
    }

    // axios.post('/api/manage-hire/applicant.do',).then((res) => {
    //   const data = res.data;
    //   setBizList(data.MDetail);
       
    //   if(data.MDetail.length===0){
    //     alert("지원자가 없습니다.");
    //     navigate("/react/manage-hire/post.do");        
    //   }else{
    //     setSearchValue({postIdx : data.MDetail[0].postIdx.toString(), keyword : "서류심사중" });            
    //   }
    // })
  }
  const handlerSearch = (e) => {
    setSearchValue({...searchValue, keyword : e.target.value})
  };

  return (
    <div className="inputSelect">
      <Stack direction="horizontal" gap={2} className="me-3">
      <Form.Select id="postTitle" 
      onChange={(e) => setSearchValue({...searchValue, postIdx : e.target.value})}
      value={searchValue.postIdx} >
        {bizList?.map((MDetail) => (
          <option key={MDetail.postIdx} value={MDetail.postIdx}>
            {MDetail.title}
          </option>
        ))}
      </Form.Select>
      <Form.Select id="selectValue" onChange={(e) => 
        handlerSearch(e)} value={searchValue.keyword}>
        <option value="서류심사중" >서류심사</option>
        <option value="면접진행중" >면접진행</option>
        <option value="최종합격" >최종합격</option>
        <option value="탈락" >불합격</option>
      </Form.Select>
      </Stack>
    </div>
  )
}

export default HireApplicantSearch