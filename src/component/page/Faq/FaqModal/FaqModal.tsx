import { FC, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import { postFaqApi } from '../../../../api/postFaqApi';
import { Faq } from '../../../../api/api';
import { IDetailResponse, IFaqDetail } from '../../../../models/interface/IFaq';
import { FaqModalStyled } from './styled';
import { ILoginInfo } from '../../../../models/interface/store/userInfo';
import { loginInfoState } from '../../../../stores/userInfo';
import axios, { AxiosResponse } from 'axios';
import { IPostResponse } from '../../../../models/interface/INotice';

interface IFaqModalProps {
  onSuccess: () => void;
  faqSeq: number;
  setFaqSeq: (faqSeq: number) => void;
}

export const FaqModal: FC<IFaqModalProps> = ({ onSuccess, faqSeq, setFaqSeq }) => {
  const [modal, setModal] = useRecoilState<Boolean>(modalState);
  const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
  const [faqDetail, setFaqDetail] = useState<IFaqDetail>();
  const faq_type = useRef<HTMLInputElement>();
  const title = useRef<HTMLInputElement>();
  const context = useRef<HTMLInputElement>();

  useEffect(() => {
    faqSeq && searchDetail();

    return () => {
      faqSeq && setFaqSeq(undefined);
    };
  }, []);

  const searchDetail = async () => {
    const detailApi = await postFaqApi<IDetailResponse>(Faq.getDetail, {
      faqSeq,
    });

    if (detailApi) {
      setFaqDetail(detailApi.detail);
    }
  };

  const handlerModal = () => {
    setModal(!modal);
  };

  const handlerSave = () => {
    const dataForm = new FormData();
    const textData = {
      title: title.current.value,
      context: context.current.value,
      loginId: userInfo.loginId,
      faq_type: faq_type.current.value,
    };
    dataForm.append('text', new Blob([JSON.stringify(textData)], { type: 'application/json' }));
    axios.post('/board/faqSavePart.do', dataForm).then((res: AxiosResponse<IPostResponse>) => {
      res.data.result === 'success' && onSuccess();
    });
  };

  const handlerUpdate = () => {
    const dataForm = new FormData();
    const textData = {
      title: title.current.value,
      context: context.current.value,
      faq_type: faq_type.current.value,
      faqSeq,
    };
    dataForm.append('text', new Blob([JSON.stringify(textData)], { type: 'application/json' }));
    axios.post('/board/faqUpdatePart.do', dataForm).then((res: AxiosResponse<IPostResponse>) => {
      res.data.result === 'success' && onSuccess();
    });
  };

  // const handlerDelete = () => {
  //   const deleteApi = postFaqApi<IPostResponse>(Faq.dsfs, {
  //     faqSeq,
  //   });
  //   if (deleteApi.result === 'success') onSuccess();
  // };

  return (
    <FaqModalStyled>
      <div className="container">
        <label>
          유형<input type="text" ref={faq_type} defaultValue={faqDetail?.faq_type}></input>
        </label>
        <label>
          제목<input type="text" ref={title} defaultValue={faqDetail?.title}></input>
        </label>
        <label>
          내용<input type="text" ref={context} defaultValue={faqDetail?.content}></input>
        </label>
        <div className={'button-container'}>
          <button onClick={faqSeq ? handlerUpdate : handlerSave}>{faqSeq ? '수정' : '등록'}</button>
          {faqSeq && <button>삭제</button>}
          <button onClick={handlerModal}>닫기</button>
        </div>
      </div>
    </FaqModalStyled>
  );
};
