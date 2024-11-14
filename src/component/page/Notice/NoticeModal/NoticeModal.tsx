import { NoticeModalStyled } from "./styled";
import { modalState } from "../../../../stores/modalState";
import { useRecoilState } from "recoil";
import { FC, useEffect, useRef, useState } from "react";
import { ILoginInfo } from "../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../stores/userInfo";
import {
  IDetailReponse,
  INoticeDetail,
  IPostResponse,
} from "../../../../models/interface/INotice";
import { postNoticeApi } from "../../../../api/postNoticeApi";
import { Notice } from "../../../../api/api";

interface INoticeModalProps {
  onSuccess: () => void;
  noticeSeq: number;
  setNoticeSeq: (noticeSeq: number) => void;
}

export const NoticeModal: FC<INoticeModalProps> = ({
  onSuccess,
  noticeSeq,
  setNoticeSeq,
}) => {
  const [modal, setModal] = useRecoilState<boolean>(modalState); // recoil에 저장된 state
  const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
  const [noticeDetail, setNoticeDetail] = useState<INoticeDetail>();
  const title = useRef<HTMLInputElement>();
  const context = useRef<HTMLInputElement>();

  useEffect(() => {
    noticeSeq && searchDetail(); // 컴포넌트 생성될 때 실행

    // 클린업 함수, 컴포넌트가 사라지기 직전에 실행
    return () => {
      noticeSeq && setNoticeSeq(undefined);
    };
  }, []);

  const searchDetail = async () => {
    const detailApi = await postNoticeApi<IDetailReponse>(Notice.getDetail, {
      noticeSeq,
    });
    if (detailApi) setNoticeDetail(detailApi.detail);
  };

  const handlerModal = () => {
    setModal(!modal);
  };

  const handlerSave = async () => {
    const param = {
      title: title.current.value,
      context: context.current.value,
      loginId: userInfo.loginId,
    };

    const saveApi = await postNoticeApi<IPostResponse>(Notice.getSave, param);

    if (saveApi.result === "success") onSuccess();
  };

  const handlerUpdate = async () => {
    const param = {
      title: title.current.value,
      context: context.current.value,
      noticeSeq,
    };

    const updateApi = await postNoticeApi<IPostResponse>(
      Notice.getUpdate,
      param
    );

    if (updateApi.result === "success") onSuccess();
  };

  const handlerDelete = async () => {
    const deleteApi = await postNoticeApi<IPostResponse>(Notice.getDelete, {
      noticeSeq,
    });

    if (deleteApi.result === "success") onSuccess();
  };

  return (
    <NoticeModalStyled>
      <div className="container">
        <label>
          제목 :
          <input
            type="text"
            ref={title}
            defaultValue={noticeDetail?.title} // ? 붙이는 이유 : useState 비동기
          ></input>
        </label>
        <label>
          내용 :{" "}
          <input
            type="text"
            ref={context}
            defaultValue={noticeDetail?.content}
          ></input>
        </label>
        파일 :
        <input type="file" id="fileInput" style={{ display: "none" }}></input>
        <label className="img-label" htmlFor="fileInput">
          파일 첨부하기
        </label>
        <div>
          <div>
            <label>미리보기</label>
            <img src="" />
          </div>
        </div>
        <div className={"button-container"}>
          <button onClick={noticeSeq ? handlerUpdate : handlerSave}>
            {noticeSeq ? "수정" : "등록"}
          </button>
          {noticeSeq && <button onClick={handlerDelete}>삭제</button>}
          <button onClick={handlerModal}>나가기</button>
        </div>
      </div>
    </NoticeModalStyled>
  );
};
