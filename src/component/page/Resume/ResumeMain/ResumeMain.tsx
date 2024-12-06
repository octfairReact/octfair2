import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { IResume, IResumeListResponse } from '../../../../models/interface/IResume';
import { postApi } from '../../../../api/postApi';
import { StyledTable, StyledTd, StyledTh } from '../../../common/styled/StyledTable';
import { Resume } from '../../../../api/api';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import swal from 'sweetalert';

export const ResumeMain = () => {
  const [resumeList, setResumeList] = useState<IResume[]>();
  const navigate = useNavigate();

  useEffect(() => {
    searchResumeList();
  }, []);

  const searchResumeList = async () => {
    const searchList = await postApi<IResumeListResponse>(Resume.getList, {});

    if (searchList) {
      setResumeList(searchList.payload);
    }
  };

  const handlerDetail = (resIdx: number) => {
    navigate('/react/apply/resumeDetail.do', { state: { idx: resIdx } });
  };

  const copyResumeList = async (resIdx: number) => {
    const copyList = await postApi<IResumeListResponse>(Resume.getCopy, {resIdx});

    if (copyList) {
      swal("복사 완료", "이력서가 복사되었습니다.", "success");
      searchResumeList();
    }
  };

  const deleteResumeList = async (resIdx: number) => {
    const deleteList = await postApi<IResumeListResponse>(Resume.getDelete, {resIdx});

    if (deleteList) {
      swal("삭제 완료", "이력서가 삭제되었습니다.", "success");
      searchResumeList();
    }
  };

  const downloadFile = async (resIdx: number) => {
    axios.post('/api/apply/fileDownload.do', {resIdx}, {
      headers: {'Content-Type': 'application/json',},
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
    <StyledTable>
      <thead>
        <tr>
          <StyledTh size={50}>이력서 제목</StyledTh>
          <StyledTh size={20}>관리</StyledTh>
          <StyledTh size={15}>최종수정일</StyledTh>
        </tr>
      </thead>
      <tbody>
        {resumeList?.length > 0 ? (
          resumeList?.map((resume) => {
            return (
              <tr key={resume.resIdx}>
                <StyledTd>
                  <p className="detailTitle" onClick={() => handlerDetail(resume.resIdx)}>
                    {resume.resTitle}
                  </p>
                  { resume.fileName && 
                    <p className="detailFile" onClick={() => downloadFile(resume.resIdx)}>
                      첨부파일 : {resume.fileName}
                    </p> 
                  }
                </StyledTd>
                <StyledTd>
                  <div className="input-box">
                    <Button variant="primary" onClick={() => copyResumeList(resume.resIdx)}>
                      복사하기
                    </Button>
                    <Button variant="secondary" onClick={() => deleteResumeList(resume.resIdx)}>
                      삭제하기
                    </Button>
                  </div>
                </StyledTd>
                <StyledTd>
                  <span className="tdUpdateDate">{resume.updatedDate}</span>
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
  );
};
