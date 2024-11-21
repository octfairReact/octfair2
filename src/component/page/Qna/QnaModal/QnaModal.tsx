import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import { QnaModalStyled } from './styled';
import { loginInfoState } from '../../../../stores/userInfo';
import { ILoginInfo } from '../../../../models/interface/store/userInfo';
import { IDetailResponse, IPostResponse, IQnaDetail } from '../../../../models/interface/IQna';
import { postApi } from '../../../../api/postApi';
import { Qna } from '../../../../api/api';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { postNoticeApi } from '../../../../api/postNoticeApi';

interface IQnaModalProps {
  onSuccess: () => void;
  qnaSeq: number;
  setQnaSeq: (qnaSeq: number) => void;
}

export const QnaModal: FC<IQnaModalProps> = ({ onSuccess, qnaSeq, setQnaSeq }) => {
  const [modal, setModal] = useRecoilState<Boolean>(modalState);
  const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
  const [qnaDetail, setQnaDetail] = useState<IQnaDetail>();
  const [imageUrl, setImageUrl] = useState<string>();
  const [fileData, setFileData] = useState<File>();
  const title = useRef<HTMLInputElement>();
  const context = useRef<HTMLInputElement>();
  const ans_content = useRef<HTMLInputElement>();
  const password = useRef<HTMLInputElement>();

  useEffect(() => {
    qnaSeq && searchDetail();
    return () => {
      qnaSeq && setQnaSeq(undefined);
    };
  }, []);

  const searchDetail = async () => {
    const detailApi = await postApi<IDetailResponse>(Qna.getDetail, { qnaSeq });

    if (detailApi) {
      setQnaDetail(detailApi.detail);
      const { fileExt, logicalPath } = detailApi.detail;
      if (fileExt === 'jpg' || fileExt === 'gif' || fileExt === 'png') {
        setImageUrl(logicalPath);
      } else {
        setImageUrl('');
      }
    }
  };

  const handlerModal = () => {
    setModal(!modal);
  };

  const handlerFileSave = (e) => {
    const fileForm = new FormData();
    const textData = {
      qnaTit: title.current.value,
      qnaCon: context.current.value,
      loginId: userInfo.loginId,
      password: password.current.value,
    };
    fileData && fileForm.append('file', fileData);
    fileForm.append('text', new Blob([JSON.stringify(textData)], { type: 'application/json' }));

    axios.post('/board/qnaSaveFileForm.do', fileForm).then((res: AxiosResponse<IPostResponse>) => {
      res.data.result === 'success' && onSuccess();
    });
  };

  const handlerFileUpdate = () => {
    const fileForm = new FormData();
    const textData = {
      qnaTit: title.current.value,
      qnaCon: context.current.value,
      password: password.current.value,
      qnaSeq,
    };
    fileData && fileForm.append('file', fileData);
    fileForm.append('text', new Blob([JSON.stringify(textData)], { type: 'application/json' }));

    axios.post('/board/qnaUpdateFileForm.do', fileForm).then((res: AxiosResponse<IPostResponse>) => {
      res.data.result === 'success' && onSuccess();
    });
  };

  const handlerDelete = async () => {
    const deleteApi = await postApi<IPostResponse>(Qna.getDelete, { qnaSeq });
    console.log(deleteApi);
    if (deleteApi && deleteApi.result === 'success') onSuccess();
  };

  const handlerFile = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInfo = e.target.files;
    if (fileInfo?.length > 0) {
      const fileInfoSplit = fileInfo[0].name.split('.');
      const fileExtension = fileInfoSplit[1].toLowerCase();

      if (fileExtension === 'jpg' || fileExtension === 'gif' || fileExtension === 'png') {
        setImageUrl(URL.createObjectURL(fileInfo[0]));
      } else {
        setImageUrl('');
      }
      setFileData(fileInfo[0]);
    }
  };

  const downloadFile = async () => {
    const param = new URLSearchParams();
    param.append('qnaSeq', qnaSeq.toString());

    const postAction: AxiosRequestConfig = {
      url: '/board/qnaDownload.do',
      method: 'POST',
      data: param,
      responseType: 'blob',
    };
    await axios(postAction).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', qnaDetail?.fileName as string);
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  };

  return (
    <QnaModalStyled>
      <div className="container">
        <label>
          제목<input type="text" ref={title} defaultValue={qnaDetail?.title}></input>
        </label>
        <label>
          내용<input type="text" ref={context} defaultValue={qnaDetail?.content}></input>
        </label>
        파일
        <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handlerFile}></input>
        <label className="img-label" htmlFor="fileInput">
          파일 첨부하기
        </label>
        <div onClick={downloadFile}>
          {imageUrl ? (
            <div>
              <label>미리보기</label>
              <img src={imageUrl} />
              {fileData?.name || qnaDetail.fileName}
            </div>
          ) : (
            <div>{fileData?.name}</div>
          )}
        </div>
        <label>
          비밀번호<input type="text" ref={password} defaultValue={qnaDetail?.password}></input>
        </label>
        <label>
          답변<input type="text" ref={ans_content} defaultValue={qnaDetail?.ans_content}></input>
        </label>
        <div className={'button-container'}>
          {<button onClick={qnaSeq ? handlerFileUpdate : handlerFileSave}>{qnaSeq ? '수정' : '등록'}</button>}
          {qnaSeq && <button onClick={handlerDelete}>삭제</button>}
          <button onClick={handlerModal}>닫기</button>
        </div>
      </div>
    </QnaModalStyled>
  );
};
