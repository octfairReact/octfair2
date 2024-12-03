import { FC, useEffect, useState } from "react";
import { NoticeModalStyled } from "../../Notice/NoticeModal/styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import {
    IPostResponse,
    IUser,
    IUserDetailResponse,
    manageUpdateApplicantData,
} from "../../../../models/interface/IUser";
import { postApi } from "../../../../api/postApi";
import { ManageApplicant } from "../../../../api/api";
import { UserInit } from "../../Login/User/UserInit";
import { Button } from "react-bootstrap";
import { Address } from "react-daum-postcode";
import PostCode from "../../../common/Utils/PostCode/PostCode";
import { manageApplicantSchema } from "../../../common/Validate/Schemas/User/ManageApplicantSchema";
import { ApplicantModalStyled } from "./css/styled";
import { formatPhoneNumber } from "../../../common/Utils/Format/FormatPhone";
import { handleAddressComplete } from "../../../common/Utils/PostCode/HandlerAddress";

interface IApplicantModalProps {
    onSuccess: () => void;
    loginId: string;
}

export const ApplicantModal: FC<IApplicantModalProps> = ({ onSuccess, loginId }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [applicantDetail, setApplicantDetail] = useState<IUser>();
    const { state, refs } = UserInit();
    const { sex, setSex, userType, setUserType, userStatus, setUserStatus, address, setAddress, zipCode, setZipCode } =
        state;
    const { name, birthday, phone, email, userDetailAddress, regdate } = refs;

    useEffect(() => {
        loginId && searchDetail(); // 컴포넌트 생성될 때 실행
    }, []);

    // userDetail 변경을 감지하고 userGender 업데이트
    useEffect(() => {
        if (applicantDetail) {
            setSex(applicantDetail?.sex);
            setUserType(applicantDetail?.userType);
            setUserStatus(applicantDetail?.statusYn);
            setZipCode(applicantDetail?.zipCode);
            setAddress(applicantDetail?.address);
        }
    }, [applicantDetail]);

    const onAddressComplete = (data) => {
        handleAddressComplete(data, setAddress, setZipCode); // 모듈화된 함수 사용
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
        const allApplicantDetail: manageUpdateApplicantData = {
            name: name.current.value,
            phone: phone.current.value,
            email: email.current.value,
            birthday: birthday.current.value,
            zipCode: zipCode,
            address: address,
            regdate: regdate.current.value,
        };

        const validApplicantDetail = manageApplicantSchema.safeParse(allApplicantDetail);

        if (!validApplicantDetail.success) {
            alert(validApplicantDetail.error.errors[0].message);
            return;
        }

        const param = {
            userType: userType,
            name: name.current.value,
            sex: sex,
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
            onSuccess();
        }
    };

    const handlerResetPw = async () => {
        const param = { loginId: loginId };

        const resetPwApi = await postApi<IPostResponse>(ManageApplicant.getResetPw, param);
        if (resetPwApi.result === "success") {
            alert("비밀번호 초기화가 완료되었습니다.");
        }
    };

    const handlerModal = () => {
        setModal(!modal);
    };

    return (
        <ApplicantModalStyled>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <div className="title-container">
                                <strong>구직자 회원 관리</strong>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>회원 유형</th>
                        <td>
                            <select
                                className="selectUserType"
                                value={userType || ""}
                                onChange={(e) => setUserType(e.target.value)}
                            >
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
                            <Button onClick={handlerResetPw}>비밀번호 초기화</Button>
                        </td>
                    </tr>
                    <tr>
                        <th>이름</th>
                        <td>
                            <input type="text" ref={name} defaultValue={applicantDetail?.name}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>성별</th>
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
                        <th>생년 월일</th>
                        <td>
                            <input type="date" ref={birthday} defaultValue={applicantDetail?.birthday}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>전화번호</th>
                        <td>
                            <input
                                type="text"
                                ref={phone}
                                defaultValue={applicantDetail?.phone}
                                onChange={(e) => {
                                    phone.current.value = formatPhoneNumber(e.target.value);
                                }}
                                placeholder="ex) 010-xxxx-xxxx"
                            ></input>
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
                            <input type="date" ref={regdate} defaultValue={applicantDetail?.regdate}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>활성화 여부</th>
                        <td>
                            <select
                                className="selectUserType"
                                value={userStatus || ""}
                                onChange={(e) => setUserStatus(e.target.value)}
                            >
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
                                value={zipCode || ""}
                                defaultValue={applicantDetail?.zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                placeholder="우편번호 입력"
                            />
                            <PostCode onHandleComplete={onAddressComplete} />
                        </td>
                    </tr>
                    <tr>
                        <th>주소</th>
                        <td>
                            <input
                                type="text"
                                defaultValue={applicantDetail?.address}
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
                                defaultValue={applicantDetail?.detailAddress}
                            ></input>
                        </td>
                    </tr>
                    <div className="footer">
                        <button onClick={handlerModal}>나가기</button>
                        <button onClick={handlerUpdate}>수정</button>
                    </div>
                </tbody>
            </table>
        </ApplicantModalStyled>
    );
};
