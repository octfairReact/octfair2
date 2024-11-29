import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { HireApplicantContext } from '../../../../../api/provider/HireApplicantProvider.';
import { IApplicantSearch, IBiz, IBizSearch } from '../../../../../models/interface/IHireApplicant';
import { Form, Stack } from 'react-bootstrap';
import { postApi } from '../../../../../api/postApi';
import { HireApplicant } from '../../../../../api/api';
import { useRecoilState } from 'recoil';
import { ILoginInfo } from '../../../../../models/interface/store/userInfo';
import { loginInfoState } from '../../../../../stores/userInfo';

const HireApplicantSearch = () => {
  const navigate = useNavigate();
  const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
  const [bizList, setBizList] = useState<IBiz[]>();
  const [searchValue, setSearchValue] = useState<IApplicantSearch>({
    postIdx: "",
    keyword: "",
    title: "",
    procArray: [],
  });
  const { setSearchKeyWord } = useContext(HireApplicantContext);

  useEffect(() => {
    window.location.search &&
    navigate(window.location.pathname, { replace: true});
  },[navigate]);

  useEffect(() => {    
    bizDetailList();     
    // console.log('배열테스트'+bizList[Number(searchValue.postIdx)].procArray);
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
      // console.log(searchList.MDetail[0].hirProcess);      
      searchList.MDetail.forEach(element => {
        if (element.hirProcess && typeof element.hirProcess === 'string') {
        const procArry = element.hirProcess.split(' > ').map((step)=>({proc: step}));
        element.procArray = procArry;
        }
      });
      // console.log(searchList.MDetail[0].procArray);
      setBizList(searchList.MDetail);
      setSearchValue({postIdx : searchList.MDetail[0].postIdx.toString(), keyword : searchList.MDetail[0].procArray[0].proc
        ,procArray : searchList.MDetail[0].procArray, title : searchList.MDetail[0].title
       });
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

  const handlerBiz = (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const index = selectedOption.getAttribute('data-index');
    const postidx = selectedOption.getAttribute('data-postidx');
    setSearchValue({...searchValue, postIdx : postidx, procArray : bizList[index].procArray, 
      title : e.target.value, keyword: bizList[index].procArray[0].proc})
  };

  return (
        
    <div className="inputSelect" >
      <Stack direction="horizontal" gap={2} className="me-3">
      <Form.Select id="postTitle" 
      onChange={(e) => handlerBiz(e)}
      value={searchValue.title} >
      {bizList?.map((MDetail,index) => (   
        <React.Fragment key={MDetail.postIdx}>
          <option key={MDetail.postIdx} value={MDetail.title} data-postidx={MDetail.postIdx.toString()} data-index={index}>
            {MDetail.title}
          </option>
        </React.Fragment> 
         ))}          
      </Form.Select>
      <Form.Select id="selectValue" onChange={(e) => 
        handlerSearch(e)} value={searchValue.keyword}>
        {bizList?.map((MDetail) => (
          <>
          {MDetail.postIdx.toString() == searchValue.postIdx ? (            
            MDetail.procArray.map((procArray)=>(          
            <option value={procArray.proc} >{procArray.proc}</option>  
            ))       
          ) : null }
          </>
        ))} 
        <option value="최종합격" >최종합격</option>
        <option value="탈락" >불합격</option> 
        </Form.Select>  
        
      </Stack>
    </div>       
    
  )
}

export default HireApplicantSearch