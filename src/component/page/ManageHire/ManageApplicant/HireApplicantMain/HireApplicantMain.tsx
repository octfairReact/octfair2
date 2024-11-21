import React, { useContext, useEffect, useState } from 'react'
import { HireApplicantContext } from '../../../../../api/provider/HireApplicantProvider.';
import axios from 'axios';
import { PageNavigate } from '../../../../common/pageNavigation/PageNavigate';
import {
  StyledTable,
  StyledTd,
  StyledTh,
} from "../../../../common/styled/StyledTable";
import { HireApplicantMainStyled } from './styled';

const HireApplicantMain = () => {
  const [applicantList, setApplicantList] = useState<IApplicant[]>();
  const { searchKeyWord } = useContext(HireApplicantContext);
  const [cPage, setCPage] = useState<number>();
  const [listCount, setListCount] = useState<number>(0);
  const [applicantSeq, setApplicantSeq] = useState<number>();
  

  interface IApplicant {
    "appId": number,
    "userIdx": number,
    "loginId": string,
    "postIdx": number,
    "title": string,
    "endDate": null,
    "applyDate": string,
    "viewed": number,
    "status": string,
    "resIdx": number,
    "name": string,
    "email": string,
    "phone": string,
    "hirProcess": null,
    "resTitle": string,
    "schoolName": string,
    "grdStatus": string,
    "company": string,
  }
  useEffect(() => {

    if (Object.keys(searchKeyWord).length != 0) {
      console.log(searchKeyWord);
      loadApplicantList();
    }
  }, [searchKeyWord])

  const loadApplicantList = (currentPage?: number) => {
    currentPage = currentPage || 1;
    const searchParam = {
      ...searchKeyWord,
      currentPage: currentPage.toString(),
      pageSize: "5",
    };
    console.log(searchParam);
    axios.post('/api/manage-hire/applicantList.do', searchParam).then((res) => {
      const data = res.data;
      console.log(data);
      setApplicantList(data.list);
      setListCount(data.count);
      setCPage(currentPage);
    })
  }

  const handlerSuccessStatus = (loginId,status) => {
    const nextStatus='';
    const currentStatus = status;

  }

  const handlerFailStatus = (loginId,status) => {
    const nextStatus='';
    const currentStatus = status;

  }

  return (
    <>
    <HireApplicantMainStyled>
      <div id="listTable">
        <table className="col"
        style={{width: '1000px', border: "1px solid"}}
        >
          <thead id="resultList">
            <tr>
              <th colSpan={3} className="header" style={{ textAlign: "left" }}>지원자 <span>{listCount}</span>
                명
              </th>
            </tr>
            {applicantList?.length <= 0 ? (
              <tr className="row-separator">
                <td>지원자가 없습니다.</td>
              </tr>
            ) : (applicantList?.map((list) => {
              return (
                <>
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
                    <td rowSpan={2}><a href="#" className="btn btn-primary res" style={{backgroundColor:'white'}}
                      data-resIdx={list.resIdx} data-user-id={list.loginId}>지원자 이력서
                      보기</a></td>
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
                          onClick={() => handlerSuccessStatus(list.loginId,list.status)}>합격</button>
                          <button style={{backgroundColor:'white'}} id="btnFail" className="btn btn-danger" 
                          onClick={() => handlerFailStatus(list.loginId,list.status)}>불합격</button>
                        </>
                      ) : null}
                      {list.viewed == 1 && list.status == '서류탈락' || list.status == '면접탈락' ? (
                        <button style={{backgroundColor:'white'}} id="btnPass" className="btn btn-resume"
                        onClick={() => handlerSuccessStatus(list.loginId,list.status)}>추가합격</button>
                      ) : null}

                    </td>
                  </tr>
                  <tr>
                    <td> <span className="highlight">이메일:</span>{list.email}</td>
                  </tr>
                  <input type="hidden" id="totcnt" name="totcnt" value={listCount} />
                  <input type="hidden" id="postIdx" name="postIdx"
                    // value={postIdx}
                  />
                  <input type="hidden" id="hiringProcSerch" name="hiringProcSerch"
                    // value={hiringProcSerch}
                  />
                </>
              )
            })


            )}

          </thead>
        </table>
      </div>
      </HireApplicantMainStyled>
      <PageNavigate
        totalItemsCount={listCount}
        onChange={loadApplicantList}
        activePage={cPage}
        itemsCountPerPage={5}
      ></PageNavigate>
    </>
  )
}

export default HireApplicantMain