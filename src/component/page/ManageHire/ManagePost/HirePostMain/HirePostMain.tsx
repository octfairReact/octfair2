import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const HirePostMain = () => {
  const navigate = useNavigate();

  return (
    <div className="mt-5">
      <div>
        <Button variant="outline-primary" onClick={()=>{navigate("/react/manage-hire/new-post.do")}}>
          새 공고 등록하기
        </Button>
      </div>
      <div className="tableWrap mt-3" style={{ textAlign: "center" }}>
        <Table hover>
          <thead className="table-light">
            <tr>
              <th className="py-3 w-50">공고제목</th>
              <th className="py-3">경력여부</th>
              <th className="py-3">게시일</th>
              <th className="py-3">마감일</th>
              <th className="py-3">승인여부</th>
              <th className="py-3">진행상태</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
              <td>@mdo</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default HirePostMain;
