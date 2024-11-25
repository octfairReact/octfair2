import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { IUser, IUserDetailResponse } from "../../../../models/interface/IUser";
import { ILoginInfo } from "../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../stores/userInfo";
import { MyPage } from "../../../../api/api";
import { postApi } from "../../../../api/postApi";
import { SignUpModalStyled } from "../../Login/style/styled";
import { Button } from "react-bootstrap";

export const MyPageMain = () => {
    //  const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
    const [userDetail, setUserDetail] = useState<IUser>();
    const userLoginId = userInfo.loginId;

    console.log(userLoginId);

    // useEffect로 컴포넌트 마운트 시 searchDetail 호출
    useEffect(() => {
        searchDetail();
    }, []);

    const searchDetail = async () => {
        const param = { loginId: userInfo.loginId };
        console.log(param);
        const detailApi = await postApi<IUserDetailResponse>(MyPage.getDetail, param);
        if (detailApi) {
            setUserDetail(detailApi.detail);
        }
    };

    return (
        <SignUpModalStyled>
            <table className="table">
                <tbody>
                    <tr>
                        <th>아이디</th>
                        <td>
                            <input
                                type="text"
                                placeholder="숫자, 영문자 조합으로 6~20자리"
                                defaultValue={userDetail?.loginId}
                                readOnly
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th>비밀번호</th>
                        <td>
                            <Button>수정</Button>
                        </td>
                    </tr>
                    <tr>
                        <th>이름</th>
                        <td>
                            <input type="text" defaultValue={userDetail?.name}></input>
                        </td>

                        <th>성별</th>
                        <td>
                            <select className="selectUserType" defaultValue={userDetail?.userGender}>
                                <option value="">선택</option>
                                <option value="1">남자</option>
                                <option value="2">여자</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>생년 월일</th>
                        <td>
                            <input type="date" defaultValue={userDetail?.birth}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>전화번호</th>
                        <td>
                            <input type="text" defaultValue={userDetail?.phone}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>이메일</th>
                        <td>
                            <input type="text" defaultValue={userDetail?.email}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>우편번호</th>
                        <td className="address-container">
                            <input type="text" defaultValue={userDetail?.zipCode} placeholder="우편번호 입력" />
                        </td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>
                            <input type="text" defaultValue={userDetail?.address}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>상세 주소</th>
                        <td>
                            <input type="text" defaultValue={userDetail?.detailAddress}></input>
                        </td>
                    </tr>
                </tbody>
            </table>
        </SignUpModalStyled>
    );
};
