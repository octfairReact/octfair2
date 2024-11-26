/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from "react";
import { Button, Spinner, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { lodingState } from "../../../../../stores/lodingState";
import { postApi } from "../../../../../api/postApi";
import { HirePost } from "../../../../../api/api";
import { loginInfoState } from "../../../../../stores/userInfo";
import { ILoginInfo } from "../../../../../models/interface/store/userInfo";
import {
  IHirePost,
  IHirePostListResponse,
} from "../../../../../models/interface/IPost";
import { ReactComponent as MyIcon } from "../../../../../assets/swap_vert_24dp_666666_FILL0_wght400_GRAD0_opsz24.svg";
import "./HirePostMain.css";


const HirePostMain = ({
  searchParams,
}: {
  searchParams: { selectStatus: string; keyword: string };
}) => {
  const { selectStatus, keyword } = searchParams;
  const [loding, setLoding] = useRecoilState<boolean>(lodingState);
  const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
  const [printPost, setPrintPost] = useState<IHirePost[]>([]);
  const [originalList, setOriginalList] = useState<IHirePost[]>([]);
  const [sortColumn, setSortColumn] = useState<string>(""); // 정렬 기준 열
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // 정렬 방향
  const navigate = useNavigate();

  useEffect(() => {
    setLoding(true);
    userInfo.loginId && getHirePostList();
  }, [userInfo]);

  const getHirePostList = async () => {
    const param = {
      loginId: userInfo.loginId,
    };

    try {
      const response = await postApi<IHirePostListResponse>(
        HirePost.getList,
        param
      );
      response && setOriginalList(response.payload);
    } catch (error) {
      alert("서버에서 오류가 발생하였습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoding(false);
    }
  };

  const filtered = originalList?.filter((post) => {
    const today = new Date();

    const endDate = new Date(post.endDate);

    const isInProgress = endDate >= today && post.appStatus === "승인";

    const isCompleted = endDate < today || post.appStatus === "불허";

    const isUpcoming = endDate >= today && post.appStatus === "대기중";

    const statusMatch =
      selectStatus === "all" ||
      (selectStatus === "inProgress" && isInProgress) ||
      (selectStatus === "completed" && isCompleted) ||
      (selectStatus === "upcoming" && isUpcoming);

    const keywordMatch =
      !keyword || post.title.toLowerCase().includes(keyword.toLowerCase());

    return statusMatch && keywordMatch;
  });

  useEffect(() => {
    setPrintPost(filtered);
  }, [selectStatus, keyword, originalList]);

  const getStatus = (endDate: string, status: string) => {
    const today = new Date();
    const isExpired = new Date(endDate).getTime() < today.getTime();
    if (isExpired) {
      return `(${status}) 마감`;
    } else if (status === "승인") {
      return "진행중";
    }
    return status;
  };

  const sortList = (column: keyof IHirePost) => {
    const newOrder =
      sortColumn === column && sortOrder === "asc" ? "desc" : "asc";
    setSortColumn(column);
    setSortOrder(newOrder);

    const sorted = [...printPost].sort((a, b) => {
      const aValue = a[column] || "";
      const bValue = b[column] || "";

      if (aValue < bValue) return newOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return newOrder === "asc" ? 1 : -1;
      return 0;
    });

    setPrintPost(sorted);
  };

  const handlerPostDetail = (postIdx:number) => {
    navigate(`/react/jobs/post-detail/${postIdx}`);
  }

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
            <thead>
              <tr>
                <th>#</th>
                <th>
                  공고 제목
                  <MyIcon height={19} onClick={() => sortList("title")} />
                </th>
                <th>
                  경력 사항
                  <MyIcon height={19} onClick={() => sortList("expRequired")} />
                </th>
                <th>
                  게시일
                  <MyIcon height={19} onClick={() => sortList("startDate")} />
                </th>
                <th>
                  마감일
                  <MyIcon height={19} onClick={() => sortList("endDate")} />
                </th>
                <th>
                  진행여부
                  <MyIcon height={19} onClick={() => sortList("appStatus")} />
                </th>
                <th>
                  근무지역
                  <MyIcon
                    height={19}
                    onClick={() => sortList("workLocation")}
                  />
                </th>
              </tr>
            </thead>
            <tbody className="table-group-divider">
              {printPost?.length > 0 ? (
                printPost.map((hirePost, index) => (
                  <tr key={index} onClick={() => handlerPostDetail(hirePost.postIdx)}>
                    <td>{index + 1}</td>
                    <td>{hirePost.title}</td>
                    <td>{hirePost.expRequired}</td>
                    <td>{hirePost.startDate}</td>
                    <td>{hirePost.endDate}</td>
                    <td>{getStatus(hirePost.endDate, hirePost.appStatus)}</td>
                    <td>{hirePost.workLocation}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center" }}>
                    <p>
                      <img
                        src={
                          "https://www.saraminimage.co.kr/sri/person/resume/img_empty_announce.png"
                        }
                      />
                    </p>
                    <p>등록된 공고가 없습니다.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default HirePostMain;
