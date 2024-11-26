/* eslint-disable jsx-a11y/alt-text */
import { NoticeModalStyled } from "./styled";
import { modalState } from "../../../../stores/modalState";
import { useRecoilState } from "recoil";
import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import { ILoginInfo } from "../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../stores/userInfo";
import {
  IDetailReponse,
  INoticeDetail,
  IPostResponse,
} from "../../../../models/interface/INotice";
import { postNoticeApi } from "../../../../api/postNoticeApi";
import { Notice } from "../../../../api/api";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

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
  const [imageUrl, setImageUrl] = useState<string>();
  const [fileData, setFileData] = useState<File>();
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

    if (detailApi) {
      setNoticeDetail(detailApi.detail);
      const { fileExt, logicalPath } = detailApi.detail;
      if (fileExt === "jpg" || fileExt === "gif" || fileExt === "png") {
        setImageUrl(logicalPath);
        console.log(logicalPath);
      } else {
        setImageUrl("");
      }
      // console.log(logicalPath);
    }
  };

  const handlerModal = () => {
    setModal(!modal);
  };

  // const handlerSave = async () => {
  //   const param = {
  //     title: title.current.value,
  //     context: context.current.value,
  //     loginId: userInfo.loginId,
  //   };

  //   const saveApi = await postNoticeApi<IPostResponse>(Notice.getSave, param);

  //   if (saveApi.result === "success") onSuccess();
  // };

  const handlerFileSave = (e) => {
    const fileForm = new FormData();
    const textData = {
      title: title.current.value,
      context: context.current.value,
      loginId: userInfo.loginId,
    };
    fileData && fileForm.append("file", fileData);
    fileForm.append(
      "text",
      new Blob([JSON.stringify(textData)], { type: "application/json" })
    );

    axios
      .post("/board/noticeSaveFileForm.do", fileForm)
      .then((res: AxiosResponse<IPostResponse>) => {
        res.data.result === "success" && onSuccess();
      });
  };

  // const handlerUpdate = async () => {
  //   const param = {
  //     title: title.current.value,
  //     context: context.current.value,
  //     noticeSeq,
  //   };

  //   const updateApi = await postNoticeApi<IPostResponse>(
  //     Notice.getUpdate,
  //     param
  //   );

  //   if (updateApi.result === "success") onSuccess();
  // };

  const handlerFileUPdate = () => {
    const fileForm = new FormData();
    const textData = {
      title: title.current.value,
      context: context.current.value,
      noticeSeq,
    };
    fileData && fileForm.append("file", fileData);
    fileForm.append(
      "text",
      new Blob([JSON.stringify(textData)], { type: "application/json" })
    );

    axios
      .post("/board/noticeUpdateFileForm.do", fileForm)
      .then((res: AxiosResponse<IPostResponse>) => {
        res.data.result === "success" && onSuccess();
      });
  };

  const handlerDelete = async () => {
    const deleteApi = await postNoticeApi<IPostResponse>(Notice.getDelete, {
      noticeSeq,
    });

    if (deleteApi.result === "success") onSuccess();
  };

  const handlerFile = (e: ChangeEvent<HTMLInputElement>) => {
    const fileInfo = e.target.files;
    if (fileInfo?.length > 0) {
      const fileInfoSplit = fileInfo[0].name.split(".");
      const fileExtension = fileInfoSplit[1].toLowerCase();

      if (
        fileExtension === "jpg" ||
        fileExtension === "gif" ||
        fileExtension === "png"
      ) {
        setImageUrl(URL.createObjectURL(fileInfo[0]));
      } else {
        setImageUrl("");
      }

      setFileData(fileInfo[0]);
    }
  };

  const downloadFile = async () => {
    const param = new URLSearchParams();
    param.append("noticeSeq", noticeSeq.toString());

    const postAction: AxiosRequestConfig = {
      url: "/board/noticeDownload.do",
      method: "POST",
      data: param,
      responseType: "blob",
    };

    await axios(postAction).then((res) => {
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", noticeDetail?.fileName as string);
      document.body.appendChild(link);
      link.click();

      link.remove(); // 다운로드 후 a태그 삭제
    });
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
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handlerFile}
        ></input>
        <label className="img-label" htmlFor="fileInput">
          파일 첨부하기
        </label>
        <div onClick={downloadFile}>
          {imageUrl ? (
            <div>
              <label>미리보기</label>
              <img src={imageUrl} />
              {fileData?.name || noticeDetail.fileName}
            </div>
          ) : (
            <div>{fileData?.name}</div>
          )}
        </div>
        <div className={"button-container"}>
          <button onClick={noticeSeq ? handlerFileUPdate : handlerFileSave}>
            {noticeSeq ? "수정" : "등록"}
          </button>
          {noticeSeq && <button onClick={handlerDelete}>삭제</button>}
          <button onClick={handlerModal}>나가기</button>
        </div>
      </div>
    </NoticeModalStyled>
  );
};
