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
import { pwChkState } from '../../../../stores/pwChkState';

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
  const ans_content = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>();
  const password2 = useRef<HTMLInputElement>();
  const [showAnsBox, setShowAnsBox] = useState<boolean>(false);
  const [isPwChecked, setIsPwChecked] = useRecoilState<boolean>(pwChkState);

  useEffect(() => {
    qnaSeq && searchDetail();
    return () => {
      qnaSeq && setQnaSeq(undefined);
    };
  }, [qnaSeq]);

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

  const handlerCloseModal = () => {
    setModal(!modal);
    setIsPwChecked(!isPwChecked);
  };

  const handlerFileSave = (e) => {
    if (!title.current.value) {
      alert('제목을 입력해주세요.');
      title.current.focus();
      return;
    } else if (!context.current.value) {
      alert('내용을 입력해주세요.');
      context.current.focus();
      return;
    } else if (!password.current.value) {
      alert('비밀번호를 입력해주세요.');
      password.current.focus();
      return;
    }

    const fileForm = new FormData();
    const textData = {
      qna_type: userInfo.userType,
      qnaTit: title.current.value,
      qnaCon: context.current.value,
      loginId: userInfo.loginId,
      password: password.current.value,
    };
    setShowAnsBox(false);
    fileData && fileForm.append('file', fileData);
    fileForm.append('text', new Blob([JSON.stringify(textData)], { type: 'application/json' }));

    axios.post('/board/qnaSaveFileForm.do', fileForm).then((res: AxiosResponse<IPostResponse>) => {
      res.data.result === 'success' && onSuccess();
    });
    setIsPwChecked(!isPwChecked);
  };

  const handlerFileUpdate = () => {
    if (!title.current.value) {
      alert('제목을 입력해주세요.');
      title.current.focus();
      return;
    } else if (!context.current.value) {
      alert('내용을 입력해주세요.');
      context.current.focus();
      return;
    } else if (!password.current.value) {
      alert('비밀번호를 입력해주세요.');
      password.current.focus();
      return;
    }
    const fileForm = new FormData();
    const textData = {
      qnaTit: title.current.value,
      qnaCon: context.current.value,
      password: password.current.value,
      ans_content: ans_content.current?.value || null,
      qnaSeq,
    };

    fileData && fileForm.append('file', fileData);
    fileForm.append('text', new Blob([JSON.stringify(textData)], { type: 'application/json' }));

    axios.post('/board/qnaUpdateFileForm.do', fileForm).then((res: AxiosResponse<IPostResponse>) => {
      res.data.result === 'success' && onSuccess();
    });
    setIsPwChecked(!isPwChecked);
  };

  const handlerDelete = async () => {
    const deleteApi = await postApi<IPostResponse>(Qna.getDelete, { qnaSeq });
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

  const pwConfirm = async () => {
    const confirmPassword = password2.current.value;
    if (confirmPassword === qnaDetail?.password) {
      setIsPwChecked(!isPwChecked);
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  return (
    <>
      {userInfo.userType === 'M' || isPwChecked ? (
        <QnaModalStyled>
          <div className="container">
            <label>
              제목
              <input
                type="text"
                ref={title}
                value={qnaDetail?.title || ''}
                onChange={(e) => setQnaDetail({ ...qnaDetail, title: e.target.value })}
              ></input>
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
              비밀번호<input type="password" ref={password} defaultValue={qnaDetail?.password}></input>
            </label>
            {(userInfo.userType === 'M' || qnaDetail?.ans_content) && (
              <label>
                답변
                <input type="text" ref={ans_content} defaultValue={qnaDetail?.ans_content || null}></input>
              </label>
            )}
            {!qnaDetail?.ans_content && (
              <button onClick={qnaSeq ? handlerFileUpdate : handlerFileSave}>{qnaSeq ? '수정' : '등록'}</button>
            )}
            {qnaSeq && !qnaDetail?.ans_content && <button onClick={handlerDelete}>삭제</button>}
            <button onClick={handlerCloseModal}>닫기</button>
          </div>
        </QnaModalStyled>
      ) : (
        <QnaModalStyled>
          <div className="container">
            <label>
              비밀번호
              <input type="password" ref={password2}></input>
            </label>
            <button onClick={pwConfirm}>확인</button>
            <button onClick={handlerModal}>취소</button>
          </div>
        </QnaModalStyled>
      )}
    </>
  );
};
