import { FC, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { IScrap } from "../../../../models/interface/IScrap";
import { IBizDetail, IPostDetail } from "../../../../models/interface/IPost";
import { getApi } from "../../../../api/getApi";

interface ApplyResume {
  resumeIdx: number;
  applyIdx: number | null;
  resumeTitle: string | null;
  userPhone: string | null;
  userEmail: string | null;
}
interface ApiResponse {
  loginId: string;
  userResumeList: ApplyResume[];
}
interface IResumeModalProps {
  //   title: string;
  //   contents: string;
  //   onConfirm: () => void;
  //   onClose: () => void;
  //   isVisible: boolean;

  onSuccess: () => void;
  scrap: IScrap | null;
  post: IPostDetail | null;
  biz: IBizDetail | null;
}

export const ResumeModalApplication: FC<IResumeModalProps> = ({
  onSuccess,
  scrap,
  post,
  biz,
}) => {
  const handlerClose = () => setModal(false);
  const [modal, setModal] = useRecoilState<boolean>(modalState); // recoil에 저장된 state
  const [userResumes, setUserResumes] = useState<ApplyResume[] | null>(null);

  useEffect(() => {
    getResumes();
  }, [modal]);

  const getResumes = async () => {
    const response = await getApi<ApiResponse>(
      "/api/jobs/applyUserResumeDetail.do"
    );
    console.log("response: ", response);
    if (response) {
      setUserResumes(response.userResumeList);
    }
  };
  return (
    <>
      <Modal show={modal} onHide={handlerClose}>
        <Modal.Header closeButton>
          <Modal.Title>입사 지원</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{scrap?.postBizName || biz?.bizName}</p>
          <p>{scrap?.postTitle || post?.title}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlerClose}>
            입사지원
          </Button>
          <Button variant="primary" onClick={handlerClose}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
