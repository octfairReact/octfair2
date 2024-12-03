import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { IResume, IResumeListResponse } from '../../../../models/interface/IResume';
import { ResumeContext } from '../../../../api/provider/ResumeProvider';
import { postApi } from '../../../../api/postApi';
import { StyledTable, StyledTd, StyledTh } from '../../../common/styled/StyledTable';
import { Resume } from '../../../../api/api';
import { Button } from 'react-bootstrap';
import axios from 'axios';

export const ResumeMain = () => {
  const [resumeList, setResumeList] = useState<IResume[]>();
  const { searchKeyWord } = useContext(ResumeContext);
  const navigate = useNavigate();

  useEffect(() => {
    searchResumeList();
  }, [searchKeyWord]);

  const searchResumeList = async () => {
    const searchParam = {
      ...searchKeyWord,
    };

    const searchList = await postApi<IResumeListResponse>(Resume.getList, searchParam);

    if (searchList) {
      setResumeList(searchList.payload);
    }
  };

  const handlerDetail = (resumeSeq: number) => {
    navigate('/react/apply/resumeDetail.do', { state: { idx: resumeSeq } });
  };

  const copyResumeList = async (resumeSeq: number) => {
    const copyList = await postApi<IResumeListResponse>(Resume.getCopy, { resIdx: resumeSeq });

    if (copyList) {
      searchResumeList();
    }
  };

  const deleteResumeList = async (resumeSeq: number) => {
    const deleteList = await postApi<IResumeListResponse>(Resume.getDelete, { resIdx: resumeSeq });

    if (deleteList) {
      searchResumeList();
    }
  };

  const downloadFile = async (resIdx: number) => {
    axios.post('/api/apply/fileDownload.do', { resIdx: resIdx }, {
      headers: {
        'Content-Type': 'application/json',
      },
      responseType: 'blob',
    }).then((res) => {
        const file = new Blob([res.data], { type: res.headers['content-type'] });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(file);
        link.download = res.headers['content-disposition'].split('filename*=UTF-8\'\'')[1]; // 헤더에서 파일명 추출
        link.click(); 
        URL.revokeObjectURL(link.href);    
    })
  };

  return (
    <>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh size={50}>이력서 제목</StyledTh>
            <StyledTh size={20}>관리</StyledTh>
            <StyledTh size={10}>최종수정일</StyledTh>
          </tr>
        </thead>
        <tbody>
          {resumeList?.length > 0 ? (
            resumeList?.map((resume) => {
              return (
                <tr key={resume.resIdx}>
                  <StyledTd>
                    <p 
                      onClick={() => handlerDetail(resume.resIdx)}
                      style={{ 
                        marginTop: "10px",
                        marginBottom: "12px",
                        fontWeight: "600",
                      }}
                    >
                      {resume.resTitle}
                    </p>
                    { resume.fileName && 
                      <p
                        onClick={() => downloadFile(resume.resIdx)}
                        style={{  
                          marginBottom: "3px",
                          fontSize: "13px",
                          color: "#2c6dd4",
                          fontWeight: "500",
                        }}
                      >
                        첨부파일 : {resume.fileName}
                      </p> 
                    }
                  </StyledTd>
                  <StyledTd>
                    <div className="input-box">
                      <Button 
                        variant="primary" 
                        style={{ margin: '3px' }} 
                        onClick={() => copyResumeList(resume.resIdx)}
                      >
                        복사하기
                      </Button>
                      <Button
                        variant="secondary"
                        style={{ margin: '3px' }}
                        onClick={() => deleteResumeList(resume.resIdx)}
                      >
                        삭제하기
                      </Button>
                    </div>
                  </StyledTd>
                  <StyledTd style={{ fontSize: "15px", color: "gray" }}>
                    {resume.updatedDate}
                  </StyledTd>
                </tr>
              );
            })
          ) : (
            <tr>
              <StyledTd colSpan={3}>데이터가 없습니다.</StyledTd>
            </tr>
          )}
        </tbody>
      </StyledTable>
    </>
  );
};
