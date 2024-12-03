import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { IPostResponse, IUser, IUserDetailResponse } from "../../../../models/interface/IUser";
import { ILoginInfo } from "../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../stores/userInfo";
import { MyPage } from "../../../../api/api";
import { postApi } from "../../../../api/postApi";
import { Button } from "react-bootstrap";
import { UserInit } from "../../Login/Init/User";
import PostCode from "../../../common/Utils/PostCode/PostCode";
import { Address } from "react-daum-postcode";
import { SignUpOtherUserData } from "../../../../models/interface/ISignUp";
import { MyPageStyled } from "./styled";
import { modalState2 } from "../../../../stores/modalState";
import { Portal } from "../../../common/potal/Portal";
import { ChangePwModal } from "../ChangePwModal/ChangePwModal";
import { useNavigate } from "react-router-dom";
import { otherUserDataSchema } from "../../../common/Validate/Schemas/User/UserSchema";
import { formatPhoneNumber } from "../../../common/Utils/Format/FormatPhone";
import { handleAddressComplete } from "../../../common/Utils/PostCode/HandlerAddress";

export const MyPageMain = () => {
    const [findModal, setFindModal] = useRecoilState<boolean>(modalState2);
    const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
    const [userDetail, setUserDetail] = useState<IUser>();
    const { state, refs } = UserInit();
    const { sex, setSex, address, setAddress, zipCode, setZipCode } = state;
    const { name, birthday, phone, email, userDetailAddress } = refs;
    const [bizIdx, setBizIdx] = useState<number>(0);
    const navigate = useNavigate();

    const searchDetail = async () => {
        const param = { loginId: userInfo.loginId };
        console.log(param);
        const detailApi = await postApi<IUserDetailResponse>(MyPage.getDetail, param);

        if (detailApi) {
            setUserDetail(detailApi.detail);
            setBizIdx(detailApi.chkRegBiz.bizIdx);
            localStorage.setItem("userDetail", JSON.stringify(detailApi.detail));
        }
    };

    useEffect(() => {
        // userInfo가 변경되면 로컬 스토리지에서 사용자 정보 불러오기
        if (userInfo?.loginId) {
            const savedUserDetail = localStorage.getItem("userDetail");
            if (savedUserDetail) {
                const parsedDetail = JSON.parse(savedUserDetail);
                setUserDetail(parsedDetail);
            }
            // 상세 정보를 불러오는 API 호출
            searchDetail();
        }
        // 컴포넌트 언마운트 시 클린업
        return () => {
            setUserDetail(null); // 상태 초기화
            setBizIdx(null); // 상태 초기화
            localStorage.removeItem("userDetail"); // 로컬 스토리지 클린업
        };
    }, [userInfo]); // userInfo가 변경될 때마다 실행

    useEffect(() => {
        // userDetail 값이 변경되면 여기서 다른 작업을 수행할 수 있음
        if (userDetail) {
            console.log("User Detail updated:", userDetail);
            // 추가 작업 (예: UI에 사용자 상세 정보 반영)
            setSex(userDetail?.sex);
            setAddress(userDetail?.address);
            setZipCode(userDetail?.zipCode);
        }
    }, [userDetail]); // userDetail 값이 변경될 때마다 실행


    const handlerUpdate = async () => {
        const nameToDetailAddress: SignUpOtherUserData = {
            name: name.current.value,
            sex: sex,
            phone: phone.current.value,
            email: email.current.value,
            birthday: birthday.current.value,
            zipCode: zipCode,
            address: address,
            detailAddress: userDetailAddress.current.value,
        };

        const validNameToDa = otherUserDataSchema.safeParse(nameToDetailAddress);

        if (!validNameToDa.success) {
            alert(validNameToDa.error.errors[0].message);
            return;
        }

        const param = {
            name: name.current.value,
            sex: sex,
            birthday: birthday.current.value,
            phone: phone.current.value,
            email: email.current.value,
            zipCode: zipCode,
            address: address,
            detailAddress: userDetailAddress.current.value,
            loginId: userInfo.loginId,
        };

        const updateApi = await postApi<IPostResponse>(MyPage.getUpdate, param);

        if (updateApi.result === "success") {
            alert("회원 정보 수정이 완료되었습니다");
            searchDetail();
        }
    };

        const onAddressComplete = (data) => {
            handleAddressComplete(data, setAddress, setZipCode); // 모듈화된 함수 사용
        };

    const handlerUpdatePwModal = () => {
        setFindModal(!findModal);
    };

    return (
        <>
            <MyPageStyled>
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
                                <Button onClick={handlerUpdatePwModal}>수정</Button>
                            </td>
                        </tr>
                        <tr>
                            <th className="required">이름</th>
                            <td>
                                <input type="text" ref={name} defaultValue={userDetail?.name}></input>
                            </td>
                        </tr>
                        <tr>
                            <th className="required">성별</th>
                            <td>
                                <select
                                    className="selectUserType"
                                    value={sex || ""}
                                    onChange={(e) => setSex(e.target.value)}
                                >
                                    <option value="" disabled>
                                        선택
                                    </option>
                                    <option value="1">남자</option>
                                    <option value="2">여자</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th className="required">생년 월일</th>
                            <td>
                                <input
                                    className="selectBirth"
                                    type="date"
                                    ref={birthday}
                                    defaultValue={userDetail?.birthday}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th className="required">전화번호</th>
                            <td>
                                <input
                                    type="text"
                                    ref={phone}
                                    defaultValue={userDetail?.phone}
                                    onChange={(e) => {
                                        phone.current.value = formatPhoneNumber(e.target.value);
                                    }}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th className="required">이메일</th>
                            <td>
                                <input type="text" ref={email} defaultValue={userDetail?.email}></input>
                            </td>
                        </tr>
                        {userDetail?.userType === "B" && (
                            <tr>
                                <th>기업 정보</th>
                                <td>
                                    {bizIdx ? (
                                        <button onClick={() => navigate(`/react/company/companyUpdate.do/${bizIdx}`)}>
                                            기업 정보 수정
                                        </button>
                                    ) : (
                                        <button onClick={() => navigate(`/react/company/companyWrite.do/`)}>
                                            기업 등록
                                        </button>
                                    )}
                                </td>
                            </tr>
                        )}
                        <tr>
                            <th className="required">우편번호</th>
                            <td className="address-container">
                                <input
                                    type="text"
                                    value={zipCode || ""}
                                    defaultValue={userDetail?.zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    placeholder="우편번호 입력"
                                />
                                <PostCode onHandleComplete={onAddressComplete} />
                            </td>
                        </tr>
                        <tr>
                            <th className="required">주소</th>
                            <td>
                                <input
                                    type="text"
                                    defaultValue={userDetail?.address}
                                    value={address || ""}
                                    onChange={(e) => setAddress(e.target.value)}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th>상세 주소</th>
                            <td>
                                <input
                                    type="text"
                                    ref={userDetailAddress}
                                    defaultValue={userDetail?.detailAddress}
                                ></input>
                            </td>
                        </tr>
                        <div className="footer">
                            <button onClick={handlerUpdate}>수정</button>
                        </div>
                    </tbody>
                </table>
            </MyPageStyled>
            {findModal && (
                <Portal>
                    <ChangePwModal loginId={userInfo.loginId} />
                </Portal>
            )}
        </>
    );
};
