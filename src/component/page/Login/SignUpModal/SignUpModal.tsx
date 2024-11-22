import { useRef, useState } from "react";
import { SignUpModalStyled } from "../style/styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";

import { SignUp } from "../../../../api/api";
import { postSignUpApi } from "../../../../api/postSignUpApi";
import { IPostResponse, SignUpOtherUserDetail, SignUpPasswordDetail } from "../../../../models/interface/ISignUp";
import { loginIdSchema, userTypeToCheckPwSchema, userNameToDaSchema } from "../Validate/Schemas";
import { UserInit } from "../Init/User";
import PostCode from "../Init/PostCode";
import { Address } from "react-daum-postcode";


export const SignUpModal = () => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);

    //UserInit.ts에서 유저 정보 초기값 불러오기
    const { state, refs } = UserInit();
    const { userType, setUserType, userGender, setUserGender, addressData, setAddressData, zipCode, setZipCode } = state;
    const { loginId, password, checkPassword, name, birth, phone, email, userDetailAddress } =
        refs;

    //select-option으로 값 바뀌는 userType과 Gender 값 세팅
    const handleUserType = (e) => {
        setUserType(e.target.value);
    };
    const handleUserGender = (e) => {
        setUserGender(e.target.value);
    };

    //Id 중복 체크 버튼용 함수
    const checkId = async (e) => {
        e.preventDefault();
        const param = {
            loginId: loginId.current.value,
        };

        const loginIdValid = loginIdSchema.safeParse(param);

        if (!loginIdValid.success) {
            alert(loginIdValid.error.errors[0]?.message);
            return; // 유효하지 않으면 함수 종료
        } // 유효성 검사를 통과한 경우에만 postSignUpApi 호출
        try {
            const checkIdResponse = await postSignUpApi<IPostResponse>(SignUp.checkId, param);
            if (checkIdResponse.result === "success") {
                alert("중복된 ID입니다");
            } else {
                alert("사용 가능한 ID입니다");
            }
        } catch (error) {
            alert("ID 중복 체크에 실패했습니다. 다시 시도해주세요.");
        }
    };

    // 우편번호 api 및 input
    const handleAddressComplete = (data: Address) => {
        // 검색된 주소로 `zipCode`와 `userAddress` 상태 업데이트
        setAddressData({
            zipCode: data.zonecode, // zonecode는 우편번호
            userAddress: data.address, // address는 전체 주소 // address는 전체 주소
        });

        setZipCode(addressData.zipCode);
    };

    const handlerSave = async (e) => {
        e.preventDefault();

        //폼 완성 전 제출하려 할 때 이미 중복 검사를 완료해 폼을 제출할 땐 굳이 중복 검사가 필요없도록 전반부에 배치
        const loginIdParam = { loginId: loginId.current.value };

        const checkId1 = await postSignUpApi<IPostResponse>(SignUp.checkId, loginIdParam);
        if (checkId1.result === "success") {
            alert("중복된 ID입니다");
            return;
        }

        //SignUpOtherUserDetails
        //= zod userSchema.safeParse용으로 zipCode(number)까지 string으로 타입 통일된 인터페이스
        const userTypeToCheckPassword: SignUpPasswordDetail = {
            userType: userType,
            loginId: loginId.current.value,
            password: password.current.value,
            checkPassword: checkPassword.current.value,
        };
        const nameToDetailAddress: SignUpOtherUserDetail = {
            name: name.current.value,
            userGender: userGender,
            phone: phone.current.value,
            email: email.current.value,
            birth: birth.current.value,
            zipCode: zipCode,
            address: addressData.userAddress,
            detailAddress: userDetailAddress.current.value,
        };

        const validUserTypeToCheckPw = userTypeToCheckPwSchema.safeParse(userTypeToCheckPassword);
        const validNameToDa = userNameToDaSchema.safeParse(nameToDetailAddress);

        if (validUserTypeToCheckPw.success) {
            // validUserTypeToCheckPw이 성공한 경우 validNameToDa 검사
            if (!validNameToDa.success) {
                alert(validNameToDa.error.errors[0].message);
                return; // validNameToDa 검증 실패 시 리턴
            }
        } else {
            alert(validUserTypeToCheckPw.error.errors[0].message);
            return; // validUserTypeToCheckPw 검증 실패 시 리턴
        }

        //유효성 검증 완료 후 폼 제출
        const param = {
            action: "I",
            loginId: loginId.current.value,
            userType: userType,
            name: name.current.value,
            password: password.current.value,
            sex: userGender,
            phone: phone.current.value,
            email: email.current.value,
            birthday: birth.current.value,
            zipCode: zipCode,
            address: addressData.userAddress,
            detailAddress: userDetailAddress.current.value,
        };

        const save = await postSignUpApi<IPostResponse>(SignUp.register, param);
        if (save.result === "SUCCESS") {
            alert("회원 가입이 완료되었습니다");
            handlerModal();
        }
    };

    const handlerModal = () => {
        setModal(!modal);
    };

    return (
        <form>
            <SignUpModalStyled>
                <table className="table">
                    <tbody>
                        <tr>
                            <th>회원 유형</th>
                            <td>
                                <select className="selectUserType" value={userType} onChange={handleUserType}>
                                    <option value="">선택</option>
                                    <option value="A">개인회원</option>
                                    <option value="B">기업회원</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>아이디</th>
                            <td>
                                <input type="text" ref={loginId} placeholder="숫자, 영문자 조합으로 6~20자리"></input>
                                <button onClick={checkId}>중복확인</button>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td>
                                <input
                                    type="password"
                                    ref={password}
                                    placeholder="숫자, 영문자, 특수문자 조합으로 8~15자리"
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호 확인</th>
                            <td>
                                <input type="password" ref={checkPassword}></input>
                            </td>
                        </tr>
                        <tr>
                            <th>이름</th>
                            <td>
                                <input type="text" ref={name} name="userName"></input>
                            </td>

                            <th>성별</th>
                            <td>
                                <select className="selectUserType" value={userGender} onChange={handleUserGender}>
                                    <option value="">선택</option>
                                    <option value="1">남자</option>
                                    <option value="2">여자</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>생년 월일</th>
                            <td>
                                <input type="date" ref={birth}></input>
                            </td>
                        </tr>
                        <tr>
                            <th>전화번호</th>
                            <td>
                                <input type="text" ref={phone}></input>
                            </td>
                        </tr>
                        <tr>
                            <th>이메일</th>
                            <td>
                                <input type="text" ref={email}></input>
                            </td>
                        </tr>
                        <tr>
                            <th>우편번호</th>
                            <td className="address-container">
                                <input
                                    type="text"
                                    value={zipCode}
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
                                    value={addressData.userAddress}
                                    onChange={(e) => setAddressData({ ...addressData, userAddress: e.target.value })}
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th>상세 주소</th>
                            <td>
                                <input type="text" ref={userDetailAddress}></input>
                            </td>
                        </tr>
                        <div className="modal-footer">
                            <button onClick={handlerModal}>나가기</button>
                            <button onClick={handlerSave}>등록</button>
                        </div>
                    </tbody>
                </table>
            </SignUpModalStyled>
        </form>
    );
};
