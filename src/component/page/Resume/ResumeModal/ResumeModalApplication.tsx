import { FC, useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { IScrap } from "../../../../models/interface/IScrap";
import { IBizDetail, IPostDetail } from "../../../../models/interface/IPost";
import { getApi } from "../../../../api/getApi";
import { postApi } from "../../../../api/postApi";

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
  onSuccess: () => void;
  scrap: IScrap | null;
  post: IPostDetail | null;
  biz: IBizDetail | null;
}

interface IpostResponse {
  result: string;
  message: string;
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
  const [selectedResumeIdx, setSelectedResumeIdx] = useState<number>();

  useEffect(() => {
    if (modal) getResumes();
  }, [modal]);

  const getResumes = async () => {
    const response = await getApi<ApiResponse>(
      "/api/jobs/applyUserResumeDetail.do"
    );
    if (response) {
      setUserResumes(response.userResumeList);
    }
  };

  const handlerRadioChange = (resumeIdx: number) => {
    setSelectedResumeIdx(resumeIdx);
  };

  const handlerApply = () => {
    if (!selectedResumeIdx) {
      alert("이력서를 선택하세요.");
      return;
    }
    saveApply();
  };

  const saveApply = async () => {
    const request = {
      postIdx: scrap ? scrap.postIdx : post.postIdx,
      resumeIdx: selectedResumeIdx,
    };
    const response = await postApi<IpostResponse>(
      "/api/jobs/saveApply.do",
      request
    );

    if (response?.result === "success") {
      alert("이력서가 지원 완료되었습니다.");
      handlerClose();
    } else if (response?.message === "이미 지원 완료된 공고입니다.") {
      alert("이미 지원 완료된 공고입니다.");
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
          <hr />
          {userResumes && userResumes.length > 0 ? (
            userResumes.map((resume) => (
              <div key={resume.resumeIdx}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <div>
                    <p>{resume.resumeTitle}</p>
                    <p>{resume.userEmail}</p>
                    <p>{resume.userPhone}</p>
                  </div>
                  <input
                    type="radio"
                    name="scrapSelect"
                    checked={selectedResumeIdx === resume.resumeIdx}
                    onChange={() => handlerRadioChange(resume.resumeIdx)}
                  />
                </div>
                <hr
                  style={{
                    border: "none",
                    borderTop: "3px solid #ccc",
                  }}
                />
              </div>
            ))
          ) : (
            <p>등록된 이력서가 없습니다.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handlerApply}>
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
