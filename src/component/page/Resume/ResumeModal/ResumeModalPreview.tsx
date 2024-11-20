import { FC, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useRecoilState } from 'recoil';
import { modalState } from '../../../../stores/modalState';

interface IResumeModalProps {
  // title: string;
  // onConfirm: () => void;
  // onClose: () => void;
  // isVisible: boolean;
  onSuccess: () => void;
  resumeSeq: number;
  setResumeSeq: (resumeSeq: number) => void;
}

export const ResumeModalPreview: FC<IResumeModalProps> = ({
  onSuccess,
  resumeSeq,
}) => {
  const [modal, setModal] = useRecoilState<boolean>(modalState); // recoil에 저장된 state
  // const [noticeDetail, setNoticeDetail] = useState<INoticeDetail>();
  // const [imageUrl, setImageUrl] = useState<string>();
  // const [fileData, setFileData] = useState<File>();
  // const title = useRef<HTMLInputElement>();
  // const context = useRef<HTMLInputElement>();

  const [show, setShow] = useState(true);

  // const searchDetail = s

  const handlerModal = () => {
    setModal(!modal);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
      <Modal 
        show={show} 
        onHide={handleClose}
        size="lg"
      >
        <Modal.Header closeButton>
          <h5 className="modal-title">이력서 미리 보기</h5>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <p>resTitle</p>
            </div>
            <div>
              <p>이름 : </p>
            </div>
            <div>
              <p>이메일 : </p>
            </div>
            <div>
              <p>연락처 : </p>
            </div>

            <div>
              {/* <c:if test="${not empty resumeInfo.shortIntro}"> */}
                <div>
                  <p >shortIntro</p>
                </div>
              {/* </c:if> */}
              {/* <c:if test="${not empty resumeInfo.proLink}"> */}
                <div >
                  <p >
                    링크 : proLink
                  </p>
                </div>
              {/* </c:if> */}
              {/* <c:if test="${not empty resumeInfo.fileName}"> */}
                <div>
                  <p >
                    첨부파일 : fileName
                  </p>
                </div>
              {/* </c:if> */}
            </div>

            <Modal.Body>
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th scope="col">경력</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                  </tr>
                </tbody>
              </table>
            </Modal.Body>

            <Modal.Body>
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th scope="col">학력</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                    <td>Otto</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                    <td>Thornton</td>
                  </tr>
                  {/* <tr>
                    <td>3</td>
                    <td colSpan={2}>Larry the Bird</td>
                    <td>@twitter</td>
                  </tr> */}
                </tbody>
              </table>
            </Modal.Body>

            <Modal.Body>
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th scope="col">스킬</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Mark</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Jacob</td>
                  </tr>
                </tbody>
              </table>
            </Modal.Body>

            <Modal.Body>
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th scope="col">자격증 및 외국어</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                </tbody>
              </table>
            </Modal.Body>

            <Modal.Body>
              <table className="table">
                <thead className="table-light">
                  <tr>
                    <th scope="col">자기소개서</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>자기소개서 내용</td>
                  </tr>
                </tbody>
              </table>
            </Modal.Body>

            {/* <c:if test="${not empty careerInfo}"> */}
              <div>
                <div>경력</div>
                <div>
                  <ul>
                    {/* <c:forEach var="data" items="${careerInfo}"> */}
                      <li >
                        <div>
                          {/* <span> <fmt:formatDate value="${data.startDate}"
                              pattern="yyyy.MM" /> ~ <fmt:formatDate
                              value="${data.endDate}" pattern="yyyy.MM" />
                          </span> */}
                        </div>
                        <div>
                          {/* <span style="font-weight: 900; font-size: 15px;">${data.company}</span><span
                            style="font-weight: 900;"> &nbsp;&nbsp; | ${data.dept} |
                            ${data.position}</span> */}
                          <p >crrDesc</p>
                        </div>
                      </li>
                    {/* </c:forEach> */}
                  </ul>
                </div>
              </div>
            {/* </c:if> */}

            {/* <c:if test="${not empty eduInfo}"> */}
              <div>
                <div >
                  학력</div>
                <div>
                  <ul >
                    {/* <c:forEach var="data" items="${eduInfo}"> */}
                      <li >
                        <div >
                          <span>grdStatus</span>
                        </div>
                        <div >
                          <span >schoolName</span>
                          {/* <c:if test="${not empty data.major}"> */}
                            {/* <span style="font-weight: 900;"> &nbsp;&nbsp; |
                              &nbsp;&nbsp;${data.major} </span> */}
                          {/* </c:if> */}
                        </div>
                        <div >
                          {/* <span style="font-weight: 900;"> <span> <fmt:formatDate
                                value="${data.admDate}" pattern="yyyy.MM" /> ~ <fmt:formatDate
                                value="${data.grdDate}" pattern="yyyy.MM" />
                          </span>
                          </span> */}
                        </div>
                      </li>
                    {/* </c:forEach> */}
                  </ul>
                </div>
              </div>
            {/* </c:if> */}

            {/* <c:if test="${not empty skillInfo}"> */}
              <div>
                <div>
                  스킬</div>
                <ul >
                  {/* <c:forEach var="data" items="${skillInfo}"> */}
                    <li>
                      <div>
                        <span>skillName</span>
                      </div>
                      <div>
                        <p  >skillDetail</p>
                      </div>
                    </li>
                  {/* </c:forEach> */}
                </ul>
              </div>
            {/* </c:if> */}

            {/* <c:if test="${not empty certInfo}"> */}
              <div>
                <div >
                  자격증 및 외국어</div>
                {/* <c:forEach var="data" items="${certInfo}"> */}
                  <li >
                    <div>
                      {/* <span><fmt:formatDate value="${data.acqDate}"
                          pattern="yyyy.MM" /></span> */}
                    </div>
                    <div>
                      <span  >certName</span>
                      <span  >grade</span>
                      <span >issuer</span>
                    </div>
                    <div>
                      {/* <span style="font-weight: 900;"> <span> <fmt:formatDate
                            value="${data.acqDate}" pattern="yyyy.MM" /></span> */}
                    </div>
                  </li>
                {/* </c:forEach> */}
              </div>
            {/* </c:if> */}

            {/* <c:if test="${not empty resumeInfo.perStatement}"> */}
              <div>
                <div>
                  자기소개서
                </div>
                <div>
                  <p  >perStatement</p>
                </div>
              </div>
            {/* </c:if> */}
          </div>





        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleClose}>
            인쇄
          </Button>
        </Modal.Footer>
      </Modal>
  );
};