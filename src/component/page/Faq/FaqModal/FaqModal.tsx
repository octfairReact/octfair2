import { FC, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';
import { Faq } from '../../../../api/api';
import { IDetailResponse, IFaqDetail, IFaqPostResponse } from '../../../../models/interface/IFaq';
import { FaqModalStyled } from './styled';
import { ILoginInfo } from '../../../../models/interface/store/userInfo';
import { loginInfoState } from '../../../../stores/userInfo';
import axios, { AxiosResponse } from 'axios';
import { postApi } from '../../../../api/postApi';
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
    const detailApi = await postApi<IDetailResponse>(Faq.getDetail, {
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
    axios.post('/board/faqSavePart.do', dataForm).then((res: AxiosResponse<IFaqPostResponse>) => {
      res.data.result === 'success' && onSuccess();
    });
  };

  const handlerUpdate = () => {
    const dataForm = new FormData();
    const textData = {
      title: title.current.value,
      context: context.current.value,
      // faq_type: faq_type.current.value,
      faqSeq,
    };
    dataForm.append('text', new Blob([JSON.stringify(textData)], { type: 'application/json' }));
    axios.post('/board/faqUpdatePart.do', dataForm).then((res: AxiosResponse<IFaqPostResponse>) => {
      res.data.result === 'success' && onSuccess();
    });
  };

  const handlerDelete = async () => {
    const deleteApi = await postApi<IFaqPostResponse>(Faq.getDelete, {
      faqSeq,
    });
    if (deleteApi && deleteApi.result === 'success') onSuccess();
  };

  return (
    <FaqModalStyled>
      <div className="container">
        <>
          <label>
            <input type="radio" name="faq_type" value="1" checked={faqDetail?.faq_type === '1'} />
            개인회원
            <input type="radio" name="faq_type" value="2" checked={faqDetail?.faq_type === '2'} />
            기업회원
          </label>
        </>
        <label>
          제목<input type="text" ref={title} defaultValue={faqDetail?.title}></input>
        </label>
        <label>
          내용<input type="text" ref={context} defaultValue={faqDetail?.content}></input>
        </label>
        <div className={'button-container'}>
          <button onClick={faqSeq ? handlerUpdate : handlerSave}>{faqSeq ? '수정' : '등록'}</button>
          {faqSeq && <button onClick={handlerDelete}>삭제</button>}
          <button onClick={handlerModal}>닫기</button>
        </div>
      </div>
    </FaqModalStyled>
  );
};
