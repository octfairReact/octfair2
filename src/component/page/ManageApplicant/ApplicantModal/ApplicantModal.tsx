import { FC, useEffect, useState } from "react";
import { NoticeModalStyled } from "../../Notice/NoticeModal/styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { ILoginInfo } from "../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../stores/userInfo";
import { IPostResponse, IUser, IUserDetailResponse } from "../../../../models/interface/IUser";
import { postApi } from "../../../../api/postApi";
import { ManageApplicant } from "../../../../api/api";
import { UserInit } from "../../Login/Init/User";
import { Button } from "react-bootstrap";
import { Address } from "react-daum-postcode";
import PostCode from "../../../common/PostCode/PostCode";
import { SignUpOtherUserDetail } from "../../../../models/interface/ISignUp";
import { otherUserDataSchema } from "../../../common/Validate/Schemas/Schemas";

interface IApplicantModalProps {
    loginId: string;
}

export const ApplicantModal: FC<IApplicantModalProps> = ({ loginId }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
    const [applicantDetail, setApplicantDetail] = useState<IUser>();
    const { state, refs } = UserInit();
    const {
        userGender,
        setUserGender,
        userType,
        setUserType,
        userStatus,
        setUserStatus,
        address,
        setAddress,
        zipCode,
        setZipCode,
    } = state;
    const { name, birthday, phone, email, userDetailAddress, regdate } = refs;

    useEffect(() => {
        loginId && searchDetail(); // 컴포넌트 생성될 때 실행

    }, []);

    // userDetail 변경을 감지하고 userGender 업데이트
    useEffect(() => {
        if (applicantDetail?.sex || applicantDetail?.userType || applicantDetail?.statusYn) {
            setUserGender(applicantDetail?.sex);
            setUserType(applicantDetail?.userType);
            setUserStatus(applicantDetail?.statusYn);
            console.log(
                "Updated gender: ",
                applicantDetail?.sex,
                "   Updated userType: ",
                applicantDetail?.userType,
                "     Updated userStatus: ",
                applicantDetail?.statusYn
            );
        }
    }, [applicantDetail]);

    const handleUserType = (e) => {
        setUserType(e.target.value);
    };
    const handleUserGender = (e) => {
        setUserGender(e.target.value);
    };
     const handleUserStatus = (e) => {
         setUserStatus(e.target.value);
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

    const searchDetail = async () => {
        const param = { loginId: loginId };
        console.log(param);
        const detailApi = await postApi<IUserDetailResponse>(ManageApplicant.getDetail, param);
        if (detailApi) {
            setApplicantDetail(detailApi.detail);
        }
    };

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
            userType: userType,
            name: name.current.value,
            sex: userGender,
            birthday: birthday.current.value,
            phone: phone.current.value,
            email: email.current.value,
            regdate: regdate.current.value,
            zipCode: zipCode,
            address: address,
            detailAddress: userDetailAddress.current.value,
            loginId: loginId,
            statusYn: userStatus,
        };

        const updateApi = await postApi<IPostResponse>(ManageApplicant.getUpdate, param);

        if (updateApi.result === "success") {
            alert("회원 정보 수정이 완료되었습니다");
            handlerModal();
        }
    };

    const handlerModal = () => {
        setModal(!modal);
    };

    return (
        <NoticeModalStyled>
            <table className="table">
                <tbody>
                    <tr>
                        <th>회원 유형</th>
                        <td>
                            <select className="selectUserType" value={userType} onChange={handleUserType}>
                                <option value="" disabled>
                                    선택
                                </option>
                                <option value="A">개인회원</option>
                                <option value="B">기업회원</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>아이디</th>
                        <td>
                            <input
                                type="text"
                                placeholder="숫자, 영문자 조합으로 6~20자리"
                                defaultValue={applicantDetail?.loginId}
                                readOnly
                            ></input>
                        </td>
                    </tr>
                    <tr>
                        <th>비밀번호</th>
                        <td>
                            <Button>비밀번호 초기화</Button>
                        </td>
                    </tr>
                    <tr>
                        <th>이름</th>
                        <td>
                            <input type="text" ref={name} defaultValue={applicantDetail?.name}></input>
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
                            <input type="date" ref={birthday} defaultValue={applicantDetail?.birthday}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>전화번호</th>
                        <td>
                            <input type="text" ref={phone} defaultValue={applicantDetail?.phone}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>이메일</th>
                        <td>
                            <input type="text" ref={email} defaultValue={applicantDetail?.email}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>가입일자</th>
                        <td>
                            <input type="date" ref={regdate} value={applicantDetail?.regdate}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>활성화 여부</th>
                        <td>
                            <select className="selectUserType" value={userStatus} onChange={handleUserStatus}>
                                <option value="" disabled>
                                    선택
                                </option>
                                <option value="1">활성</option>
                                <option value="2">비활성</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>우편번호</th>
                        <td className="address-container">
                            <input
                                type="text"
                                value={zipCode}
                                defaultValue={applicantDetail?.zipCode}
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
                                defaultValue={applicantDetail?.address}
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
                                defaultValue={applicantDetail?.detailAddress}
                            ></input>
                        </td>
                    </tr>
                    <div className="footer">
                        <button onClick={handlerUpdate}>수정</button>
                    </div>
                </tbody>
            </table>
        </NoticeModalStyled>
    );
};