import React, { useContext, useEffect, useState } from 'react'
import { HireApplicantContext } from '../../../../../api/provider/HireApplicantProvider.';
import axios from 'axios';
import { PageNavigate } from '../../../../common/pageNavigation/PageNavigate';
import { HireApplicantMainStyled } from './styled';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../../stores/modalState';
import { ResumeModalPreview } from '../../../Resume/ResumeModal/ResumeModalPreview';
import { Portal } from '../../../../common/potal/Portal';
import { IApplicant, IApplicantResponse } from '../../../../../models/interface/IHireApplicant';
import { HireApplicant } from '../../../../../api/api';
import { postApi } from '../../../../../api/postApi';
import { Table } from "react-bootstrap";


const HireApplicantMain = () => {
  const [applicantList, setApplicantList] = useState<IApplicant[]>();
  const { searchKeyWord } = useContext(HireApplicantContext);
  const [cPage, setCPage] = useState<number>();
  const [listCount, setListCount] = useState<number>(0);
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [resSeq, setResSeq] = useState<number>();
    
  useEffect(() => {
    if (Object.keys(searchKeyWord).length != 0) {
      loadApplicantList();
    }
  }, [searchKeyWord])

  const loadApplicantList = async (currentPage?: number) => {
    currentPage = currentPage || 1;
    const searchParam = {
      ...searchKeyWord,
      currentPage: currentPage.toString(),
      pageSize: "5",
    };
    const searchList= await postApi<IApplicantResponse>(
      HireApplicant.getList,
      searchParam
    );
    if(searchList){
      setApplicantList(searchList.list);
      setListCount(searchList.count);
      setCPage(currentPage);
    }
    // axios.post('/api/manage-hire/applicantList.do', searchParam).then((res) => {
    //   const data = res.data;
    //   setApplicantList(data.list);
    //   setListCount(data.count);
    //   setCPage(currentPage);
    // })
  }

  const statusUpdate = async (userId:string, nextStatus:string, postIdx:number) => {
    const params = {
      loginId: userId,
      postIdx: postIdx,
      keyword: nextStatus
    };

    const status = await postApi<{result:string}>(
      HireApplicant.updateStatus,
      params
    )
    if(status.result == "success"){
      alert("상태가 업데이트 되었습니다.");
    }else{
      alert("오류가 발생하였습니다.");
    }
  
    // axios.post('/api/manage-hire/statusUpdate.do', params).then((res) => {
    //   const data = res.data;
    // })
  }

  const handlerSuccessStatus = (loginId:string, status:string, postId:number) => {
    const userId =loginId;
    const currentStatus = status;
    const postIdx = postId;
    if (currentStatus === '서류심사중') {
      const nextStatus = '면접진행중'; 
      statusUpdate(userId,nextStatus, postIdx)
      loadApplicantList();
    } else if (currentStatus === '면접진행중') {
      const nextStatus = '최종합격'; 
      statusUpdate(userId,nextStatus, postIdx)
      loadApplicantList();
    } else if (currentStatus.includes('탈락')){
      const nextStatus = '서류심사중'; 
      statusUpdate(userId,nextStatus, postIdx)
      loadApplicantList();
    } else {
      alert('더 이상 진행할 수 없는 상태입니다.');
      return;
    }  
  }

  const handlerFailStatus = (loginId:string, status:string, postId:number) => {
    const userId =loginId;
    const currentStatus = status;
    const postIdx = postId;
    if (currentStatus === '서류심사중') {
      const nextStatus = '서류탈락'; 
      statusUpdate(userId,nextStatus, postIdx)
      loadApplicantList();
      return
    } else if (currentStatus === '면접진행중') {
      const nextStatus = '면접탈락'; 
      statusUpdate(userId,nextStatus, postIdx)
      loadApplicantList();
      return
    } else {
      alert('더 이상 진행할 수 없는 상태입니다.');
      return;
    }
  }
  
  const viewChange = async (loginId: string, postId:number) => {
    const params = {
      loginId: loginId,
      postIdx: postId,
    };
    const res= await postApi<{result:string}>(
      HireApplicant.viewUpadate,
      params
    );
    if(res.result =='success'){
      console.log('이력서 확인');
      loadApplicantList();
    }
    // axios.post('/api/manage-hire/viewUpdate.do', params).then((res) => {
    //   const data = res.data;    
    // })
    // loadApplicantList();
  }

  const handlerModal = (loginId: string,resSeq: number, postId:number) => {
    viewChange(loginId,postId);
		setModal(!modal);
		setResSeq(resSeq);
	  };
	
	const onPostSuccess = () => {
		setModal(!modal);
		loadApplicantList();
	  };

  return (
    <>
    <HireApplicantMainStyled>
      <div id="listTable">
        <Table className="col" style={{border: "1px solid"}} >
          <thead id="resultList">
            <tr>
              <th colSpan={3} className="header" style={{ textAlign: "left" }}>지원자 <span>{listCount}</span>
                명
              </th>
            </tr>
          </thead>
            {applicantList?.length <= 0 ? (
              <tr className="row-separator">
                <td>지원자가 없습니다.</td>
              </tr>           
            ) : (applicantList?.map((list) => {
              return (
                <tbody key={list.appId}>
                  <tr className="row-separator">
                    <td rowSpan={4}>
                      <span className="highlight">{list.name}</span> <br />
                      <span className="resTitle">{list.resTitle}</span><br />
                      <span>{list.applyDate.substring(0, 10)}</span>
                    </td>
                    {list.company === null ? (
                      <td rowSpan={2} style={{ verticalAlign: "middle" }}>
                        <span className="highlight">학력: </span>
                        {list.schoolName}
                        ({list.grdStatus})
                      </td>
                    ) : (
                      <td><span className="highlight">학력: </span>
                        {list.schoolName}
                        ({list.grdStatus})
                      </td>
                    )}
                    <td rowSpan={2}><span className="btn btn-primary res" style={{backgroundColor:'white'}}
                      onClick={() => handlerModal(list.loginId, list.resIdx, list.postIdx)}>지원자 이력서
                      보기</span></td>
                  </tr>
                  <tr>
                    {list.company !== null ? (
                      <td>
                        <span className="highlight">경력:</span>{list.company}
                      </td>
                    ) : null}
                  </tr>
                  <tr>
                    <td> <span className="highlight">전화번호:</span>{list.phone}</td>
                    <td rowSpan={2}>
                      {list.viewed == 1 && list.status == '서류심사중' || list.status == '면접진행중' ? (
                        <>
                          <button id="btnPass" className="btn btn-resume" 
                          onClick={() => handlerSuccessStatus(list.loginId,list.status, list.postIdx)}>합격</button>
                          <button style={{backgroundColor:'white'}} id="btnFail" className="btn btn-danger" 
                          onClick={() => handlerFailStatus(list.loginId,list.status, list.postIdx)}>불합격</button>
                        </>
                      ) : null}
                      {list.viewed == 1 && list.status == '서류탈락' || list.status == '면접탈락' ? (
                        <button style={{backgroundColor:'white'}} id="btnPass" className="btn btn-resume"
                        onClick={() => handlerSuccessStatus(list.loginId,list.status, list.postIdx)}>추가합격</button>
                      ) : null}

                    </td>
                  </tr>
                  <tr>
                    <td> <span className="highlight">이메일:</span>{list.email}</td>
                  </tr>
                  
                </tbody>
              )
            })
            )}          
        </Table>
      </div>
      </HireApplicantMainStyled>
      <PageNavigate
        totalItemsCount={listCount}
        onChange={loadApplicantList}
        activePage={cPage}
        itemsCountPerPage={5}
      ></PageNavigate>
      {modal && (
        <Portal>
          <ResumeModalPreview
            onSuccess={onPostSuccess}
            resumeSeq={resSeq}
            setResumeSeq={setResSeq}
          />
        </Portal>
      )}
    </>
  )
}

export default HireApplicantMain