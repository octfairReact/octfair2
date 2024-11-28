import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import {
    IPostResponse,
    IUser,
    IUserCheckBizRegResponse,
    IUserDetailResponse,
} from "../../../../models/interface/IUser";
import { ILoginInfo } from "../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../stores/userInfo";
import { MyPage } from "../../../../api/api";
import { postApi } from "../../../../api/postApi";
import { Button } from "react-bootstrap";
import { UserInit } from "../../Login/Init/User";
import PostCode from "../../../common/PostCode/PostCode";
import { Address } from "react-daum-postcode";
import { SignUpOtherUserDetail } from "../../../../models/interface/ISignUp";
import { otherUserDataSchema } from "../../../common/Validate/Schemas/Schemas";
import { MyPageStyled } from "./styled";
import { modalState2 } from "../../../../stores/modalState";
import { Portal } from "../../../common/potal/Portal";
import { ChangePwModal } from "../ChangePwModal/ChangePwModal";
import { useNavigate } from "react-router-dom";

export const MyPageMain = () => {
    const [findModal, setFindModal] = useRecoilState<boolean>(modalState2);
    const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
    const [userDetail, setUserDetail] = useState<IUser>();
    const { state, refs } = UserInit();
    const { userGender, setUserGender, address, setAddress, zipCode, setZipCode } = state;
    const { name, birthday, phone, email, userDetailAddress } = refs;
    const [bizIdx, setBizIdx] = useState<number>(0);
    const navigate = useNavigate();

    // // useEffect로 컴포넌트 마운트 시 searchDetail 호출
    // useEffect(() => {
    //     searchDetail();
    // }, []);

    // useEffect(() => {
    //     const initializePage = async () => {
    //         await searchDetail(); // 사용자 정보 조회
    //         await checkUserBizReg(); // 기업 등록 여부 확인
    //     };

    //     initializePage();
    // }, []);

    // // userDetail 변경을 감지하고 userGender 업데이트
    // useEffect(() => {
    //     if (userDetail?.sex) {
    //         setUserGender(userDetail?.sex);
    //         console.log("Updated gender:", userDetail?.sex);
    //     }
    // }, [userDetail]);

    // useEffect(() => {
    //     // 로컬 스토리지에서 이전 userDetail을 가져오기
    //     const savedUserDetail = localStorage.getItem("userDetail");
    //     if (savedUserDetail) {
    //         setUserDetail(JSON.parse(savedUserDetail)); // 로컬 스토리지에서 값 읽어오기
    //     }
    // }, []);

    // useEffect(() => {
    //     if (userDetail) {
    //         // userDetail이 변경되면 로컬 스토리지에 저장
    //         localStorage.setItem("userDetail", JSON.stringify(userDetail));
    //     }
    // }, [userDetail]);

    const handleUserGender = (e) => {
        setUserGender(e.target.value);
    };

    const searchDetail = async () => {
        const param = { loginId: userInfo.loginId };
        console.log(param);
        const detailApi = await postApi<IUserDetailResponse>(MyPage.getDetail, param);

        if (detailApi) {
            setUserDetail(detailApi.detail);
        }
    };

    const checkUserBizReg = async () => {
        const param = { loginId: userInfo.loginId };
        const checkRegBizApi = await postApi<IUserCheckBizRegResponse>(MyPage.getDetail, param);
        if (checkRegBizApi) {
            setBizIdx(checkRegBizApi.chkRegBiz.bizIdx);
            console.log(bizIdx);
        }
    };

    // 컴포넌트 마운트 시 데이터 로드 및 로컬 스토리지 처리
    useEffect(() => {
        const initializePage = async () => {
            // 로컬 스토리지에서 이전 userDetail을 가져오기
            const savedUserDetail = localStorage.getItem("userDetail");
            if (savedUserDetail) {
                setUserDetail(JSON.parse(savedUserDetail)); // 로컬 스토리지에서 값 읽어오기
            } else {
                await searchDetail(); // 로컬 스토리지에 없으면 데이터 API 호출
            }

            // 기업 등록 여부 확인
            await checkUserBizReg();
        };

        initializePage();
    }, []); // 처음 한 번만 실행

    // userDetail 변경을 감지하고 userGender 업데이트 및 로컬 스토리지 저장
    useEffect(() => {
        if (userDetail?.sex) {
            setUserGender(userDetail?.sex);
        }

        // userDetail이 변경되면 로컬 스토리지에 저장
        if (userDetail) {
            localStorage.setItem("userDetail", JSON.stringify(userDetail));
        }
    }, [userDetail]); // userDetail이 변경될 때마다 실행

    const handlerUpdate = async () => {
        const nameToDetailAddress: SignUpOtherUserDetail = {
            name: name.current.value,
            userGender: userGender,
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
            sex: userGender,
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
        }
    };

    // 우편번호 api 및 input
    const handleAddressComplete = (data: Address) => {
        // 검색된 주소로 `zipCode`와 `userAddress` 상태 업데이트
        const userAddress = data.address;
        const useZipCode = data.zonecode;

        if (userAddress !== "" || useZipCode !== "") {
            setAddress(userAddress);
            setZipCode(useZipCode);
        }
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
                            <th>이름</th>
                            <td>
                                <input type="text" ref={name} defaultValue={userDetail?.name}></input>
                            </td>

                            <th>성별</th>
                            <td>
                                <select className="selectUserType" value={userGender} onChange={handleUserGender}>
                                    <option value="" disabled>
                                        선택
                                    </option>
                                    <option value="1">남자</option>
                                    <option value="2">여자</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>생년 월일</th>
                            <td>
                                <input type="date" ref={birthday} defaultValue={userDetail?.birthday}></input>
                            </td>
                        </tr>
                        <tr>
                            <th>전화번호</th>
                            <td>
                                <input type="text" ref={phone} defaultValue={userDetail?.phone}></input>
                            </td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td>
                                <input type="text" ref={email} defaultValue={userDetail?.email}></input>
                            </td>
                        </tr>
                        {userDetail?.userType === "B" && (
                            <tr>
                                <th>기업 정보</th>
                                <td>
                                    {bizIdx ? (
                                        <button onClick={() => navigate(`/react/company/companyUpdate.do/${bizIdx}`)}>기업 정보 수정</button>
                                    ) : (
                                        <button onClick={() => navigate(`/react/company/companyWrite.do/`)}>기업 등록</button>
                                    )}
                                </td>
                            </tr>
                        )}

                        <tr>
                            <th>우편번호</th>
                            <td className="address-container">
                                <input
                                    type="text"
                                    value={zipCode}
                                    defaultValue={userDetail?.zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    placeholder="우편번호 입력"
                                />
                                <PostCode onHandleComplete={handleAddressComplete} />
                            </td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td>
                                <input
                                    type="text"
                                    defaultValue={userDetail?.address}
                                    value={address}
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
