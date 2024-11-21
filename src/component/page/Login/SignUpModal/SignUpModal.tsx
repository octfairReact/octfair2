import { useRef, useState } from "react";
import { SignUpModalStyled } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";

import { SignUp } from "../../../../api/api";
import { postSignUpApi } from "../../../../api/postSignUpApi";
import {
    IPostResponse,
    IPostResponseN,
    SignUpOtherUserDetail,
    SignUpPasswordDetail,
} from "../../../../models/interface/ISignUp";

import { userSchema1, userSchema2 } from "./Validate/Schemas";

export const SignUpModal = () => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [userType, setUserType] = useState<string>(""); // 초기값 설정
    const loginId = useRef<HTMLInputElement>();
    const password = useRef<HTMLInputElement>();
    const checkPassword = useRef<HTMLInputElement>();
    const name = useRef<HTMLInputElement>();
    const [userGender, setUserGender] = useState<string>("");
    const birth = useRef<HTMLInputElement>();
    const phone = useRef<HTMLInputElement>();
    const email = useRef<HTMLInputElement>();
    const zipCode = useRef<HTMLInputElement>();
    const userAddress = useRef<HTMLInputElement>();
    const userDetailAddress = useRef<HTMLInputElement>();

    const handleUserType = (e) => {
        setUserType(e.target.value);
    };

    const handleUserGender = (e) => {
        setUserGender(e.target.value);
    };

    const checkId = async () => {
        const param = {
            loginId: loginId.current.value,
        };
        console.log(param);
        // const checkId = await postSignUpApi<IPostResponseN>(SignUp.checkId, param);
        // console.log(checkId.result);
        // if (checkId === 0) {
        //     alert("사용 가능한 ID입니다");
        // } else {
        //     alert("중복된 ID입니다");
        // }
    };

    const handlerSave = async (e) => {
        e.preventDefault();

        const userTypeToCheckPassword: SignUpPasswordDetail = {
            userType: userType,
            loginId: loginId.current.value,
            password: password.current.value,
            checkPassword: checkPassword.current.value,
        };

        //SignUpOtherUserDetails
        //= zod userSchema.safeParse용으로 zipCode(number)까지 string으로 타입 통일된 인터페이스
        const nameToDetailAddress: SignUpOtherUserDetail = {
            name: name.current.value,
            userGender: userGender,
            phone: phone.current.value,
            email: email.current.value,
            birth: birth.current.value,
            zipCode: zipCode.current.value,
            address: userAddress.current.value,
            detailAddress: userDetailAddress.current.value,
        };

        const validResult1 = userSchema1.safeParse(userTypeToCheckPassword);
        const validResult2 = userSchema2.safeParse(nameToDetailAddress);

        // validResult1이 성공한 경우
        if (validResult1.success) {
            // validResult2 검사
            if (!validResult2.success) {
                alert(validResult2.error.errors[0].message);
                return; // validResult2 검증 실패 시 리턴
            }
        } else {
            alert(validResult1.error.errors[0].message);
            return; // validResult1 검증 실패 시 리턴
        }

        const param = {
            action: "I",
            // ckIdcheckreg: 0,
            // ckEmailcheckreg: 0,
            loginId: loginId.current.value,
            userType: userType,
            name: name.current.value,
            password: password.current.value,
            sex: userGender,
            phone: phone.current.value,
            email: email.current.value,
            birthday: birth.current.value,
            zipCode: zipCode.current.value,
            address: userAddress.current.value,
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
                                <input type="text" ref={zipCode} placeholder="우편번호 입력" />
                                <button>우편번호 찾기</button>
                            </td>
                        </tr>
                        <tr>
                            <th>주소</th>
                            <td>
                                <input type="text" ref={userAddress}></input>
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
