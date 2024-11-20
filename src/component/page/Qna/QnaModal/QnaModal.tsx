import { FC, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import { QnaModalStyled } from './styled';
import { loginInfoState } from '../../../../stores/userInfo';
import { ILoginInfo } from '../../../../models/interface/store/userInfo';
import { IDetailResponse, IQnaDetail } from '../../../../models/interface/IQna';
import { postApi } from '../../../../api/postApi';
import { Qna } from '../../../../api/api';

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
  const title = useRef<HTMLInputElement>();
  const context = useRef<HTMLInputElement>();
  const ans_content = useRef<HTMLInputElement>();

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
    }
  };

  const handlerModal = () => {
    setModal(!modal);
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
        <label>
          파일<input type="file" id="fileInput" style={{ display: 'none' }}></input>
        </label>
        {/* <div>
          {imageUrl ? (
            <div>
              <label>미리보기</label>
              <img src={imageUrl} />
              {fileD}
            </div>
          )}
        </div> */}
        {/* <label>
          미리보기<input type="text" ref={} defaultValue={}></input>
        </label>
        <label>
          비밀번호<input type="text" ref={} defaultValue={}></input>
        </label> */}
        <label>
          답변<input type="text" ref={ans_content} defaultValue={qnaDetail?.ans_content}></input>
        </label>
        <div className={'button-container'}>
          {/* <button onClick={qnaSeq ?  : }>{qnaSeq ? '수정' : '등록'}</button> */}
          {qnaSeq && <button>삭제</button>}
          <button onClick={handlerModal}>닫기</button>
        </div>
      </div>
    </QnaModalStyled>
  );
};
