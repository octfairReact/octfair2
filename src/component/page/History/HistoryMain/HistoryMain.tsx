import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { ApplyContext } from "../../../../api/provider/ApplyProvider";
import { PageNavigate } from "../../../common/pageNavigation/PageNavigate";
import { useNavigate } from "react-router-dom";


export const HistoryMain = () => {
    const [applyList,setApplyList] = useState<IApply[]>();
    const { searchKeyWord } = useContext(ApplyContext);
    const navigate = useNavigate();
    const [cPage, setCPage] = useState<number>();
  const [listCount, setListCount] = useState<number>(0);

    interface IApply {
    appId: number;
	userIdx: number;
	postingId: number;
	applyDate: Date;
	viewed: string;
	status: string;
	resIdx: number;
	postTitle: string;
	bizIdx: number;
	bizName: string;
    }
    useEffect(() => {
        searchApplyList();
        // historyApplyList();
    },[searchKeyWord])

    const historyApplyList = () => {        
        axios.post('/api/apply/historyRest.do',).then((res) => {
            const data = res.data;
            setApplyList(data.result)            
        })
    }

    const searchApplyList = () => {
        
        const searchParam = {
            ...searchKeyWord,           
          };
          console.log(searchKeyWord);
        axios.post('/api/apply/historySearchRest.do',searchParam).then((res) => {
            const data = res.data;
            setApplyList(data.result)
            
        })
    }

    return(
    <>
    <div className="divComGrpCodList">
							<table className="col">
								<caption>지원내역 테이블</caption>
								<colgroup>
									<col width="15%" />
									<col width="40%" />
									<col width="15%" />
									<col width="15%" />
									<col width="15%" />
								</colgroup>

								<thead>
									<tr>
										<th scope="col">지원일</th>
										<th scope="col">지원내역</th>
										<th scope="col">공고진행상태</th>
										<th scope="col">열람</th>
										<th scope="col">취소/삭제</th>
									</tr>
								</thead>
								<tbody id="resultList">
                                    {applyList?.length <= 0 ? (
										<tr>
											<td style={{height: '400px'}} colSpan={5}>
												<p>
													<img src="https://www.saraminimage.co.kr/sri/person/resume/img_empty_announce.png" />
												</p>
												<p style={{ fontSize: '18px', fontWeight: 'bold', color: '#868686', padding: '15px'}}>입사
													지원 내역이 없어요.</p>
												<p style={{fontSize: "14px"}}>
													<a href="/jobs/posts.do" style={{color: '#3157dd'}}>현재 채용중인
														공고 보러가기 {">"} </a>
												</p>
											</td>
										</tr>
                                    ) : ( applyList?.map((data)=> {
                                        return(                                        
											<tr className="resume-entry">
												<td className="application-date">
													<p className="status" style={{fontSize: "10px"}}>지원완료</p>
													<p className="date">
														{/* <fmt:formatDate value="${data.applyDate}"
															pattern="yyyy .MM .dd" /> */}
                                                            </p>
												</td>
												<td className="application-details">
													<p className="company-name"
														style={{textAlign: 'left', paddingLeft: '50px', marginTop: '5px', fontSize: '14px'}}>
														<a href="/company/companyDetailPage.do/${data.postingId}/${data.bizIdx}">{data.bizName}</a>
													</p>
													<p className="job-title"
														style={{textAlign: 'left', paddingLeft: '50px', marginTop: '5px', fontSize: '15px', fontWeight: "bold"}}>
														<a href="/manage-post/${data.postingId}/${data.bizIdx}">{data.postTitle}</a>
													</p>
													<p className="resume-link"
														style={{textAlign: 'left', paddingLeft: '50px', margin: '5px 0px 5px 0px', fontSize: '13px'}}>
														<a href="javascript:previewResume({data.resIdx})"><span>지원이력서</span></a>
													</p>
												</td>
												<td className="job-status">
													<p className="status">{data.status}</p>
												</td>
												<td className="view-status">
													<p>
														{/* <c:choose>
															<c:when test="${data.viewed == 1}">열람</c:when>
															<c:otherwise>미열람</c:otherwise>
														</c:choose> */}
													</p>
												</td>
												<td className="cancel">
                                                    {/* <c:if test="${data.status == '지원완료'}"> */}
														<a className="cancleApply"
															href="javascript:cancleApply(${data.appId})"><span>지원취소</span></a>
													{/* </c:if> <c:if test="${data.status != '지원완료'}"> */}
														<span style={{color: '#868686'}}>지원취소</span>
													{/* </c:if> */}
                                                </td>
											</tr>
                                            )
                                        })
                                    )}
								</tbody>
							</table>
						</div>
                        <PageNavigate
        totalItemsCount={listCount}
        onChange={searchApplyList}
        activePage={cPage}
        itemsCountPerPage={5}
      ></PageNavigate>
    </>
    );
}