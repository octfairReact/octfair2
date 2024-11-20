import { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { lodingState } from "../../../../../stores/lodingState";
import { postApi } from "../../../../../api/postApi";
import { HirePost } from "../../../../../api/api";
import { loginInfoState } from "../../../../../stores/userInfo";
import { ILoginInfo } from "../../../../../models/interface/store/userInfo";

const HirePostMain = ({
  searchParams,
}: {
  searchParams: { selectStatus: string; keyword: string };
}) => {
  const { selectStatus, keyword } = searchParams;
  const [loding, setLoding] = useRecoilState<boolean>(lodingState);
  const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
  const [printPost, setPrintPost] = useState();
  const [filterList, setFilterList] = useState();
  const [originalList, setOriginalList] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setLoding(true);
    getHirePostList();
  }, []);

  const getHirePostList = async () => {
    const param = {
      loginId: userInfo.loginId,
    };

    try {
      const response = await postApi(HirePost.getList, param);
      setOriginalList(response);
    } catch (error) {
      alert("서버에서 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoding(false);
    }
  };

  useEffect(() => {
    // 리스트 솔팅 메소드 구현
  }, [selectStatus, keyword]);

  return (
    <div className="mt-5">
      <div>
        <Button
          variant="outline-primary"
          onClick={() => {
            navigate("/react/manage-hire/new-post.do");
          }}
        >
          새 공고 등록하기
        </Button>
      </div>
      <div className="tableWrap mt-3" style={{ textAlign: "center" }}>
        {loding ? (
          <div className="spinner">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          <Table hover>
            <thead className="table-light">
              <tr>
                <th className="py-3">#</th>
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
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
              </tr>
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default HirePostMain;
