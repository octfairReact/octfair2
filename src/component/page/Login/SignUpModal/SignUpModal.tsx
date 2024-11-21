import { useRef, useState } from "react";
import { SignUpModalStyled } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";

import { SignUp } from "../../../../api/api";
import { postSignUpApi } from "../../../../api/postSignUpApi";
import { IPostResponse, ISignUp, ISignUpForValidation } from "../../../../models/interface/ISignUp";
import { z } from "zod";
import { userSchema } from './Validate/Schemas';
import { postApi } from "../../../../api/postApi";

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

    // const loginIdRegex = new RegExp(/^[a-z0-9]{6,20}$/g);
    // const passwordRegex = new RegExp(/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/);
    // const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
    // const phoneRegex = new RegExp(/^(010)-?\d{3,4}-?\d{4}$/);

    // const userSchema = z.object({
    //     userType: z.string().min(1, "회원 유형을 선택해주세요"),
    //     loginId: z.string().min(1, "아이디를 입력해주세요").regex(loginIdRegex, "올바른 아이디 형식이 아닙니다"),
    //     password: z
    //         .string()
    //         .min(1, "비밀번호를 입력해주세요")
    //         .regex(passwordRegex, "비밀번호는 숫자, 영문자, 특수문자 조합으로 8~15자리여야 합니다"),
    //     checkPassword: z.string().min(1, "확인용 비밀번호를 입력해주세요"),
    //     name: z.string().min(1, "이름을 입력해주세요"),
    //     userGender: z.string().min(1, "성별을 선택해주세요"),
    //     birth: z.string().min(1, "생년월일을 선택해주세요"),
    //     phone: z.string().min(1, "전화번호를 입력해주세요").regex(phoneRegex, "올바른 전화번호 형식이 아닙니다"),
    //     email: z.string().min(1, "이메일을 입력해주세요").regex(emailRegex, "올바른 이메일 형식이 아닙니다"),
    //     zipCode: z
    //         .string()
    //         .min(1, "우편번호를 입력해주세요")
    //         .max(5, "우편번호는 다섯 자리 숫자입니다")
    //         .regex(/^\d{5}$/, "우편번호는 반드시 다섯 자리 숫자여야 합니다") // 숫자만 허용
    //         .transform((val) => parseInt(val, 10)), // 문자열을 숫자로 변환,
    //     userAddress: z.string().min(1, "주소를 입력해주세요"),
    // });

    const handleUserType = (e) => {
        setUserType(e.target.value);
    };

    const handleUserGender = (e) => {
        setUserGender(e.target.value);
    };

    const handlerSave = async (e) => {
        e.preventDefault();

        const data: ISignUpForValidation = {
            userType: userType,
            loginId: loginId.current.value,
            password: password.current.value,
            checkPassword: checkPassword.current.value,
            name: name.current.value,
            userGender: userGender, // gender 필드 수정: userGender -> sex로 변경
            phone: phone.current.value,
            email: email.current.value,
            birth: birth.current.value,
            zipCode: zipCode.current.value,
            address: userAddress.current.value,
            detailAddress: userDetailAddress.current.value,
        };

        const validResult = userSchema.safeParse(data);
        if (!validResult.success) {
            alert(validResult.error.errors[0].message);
            return;
        }
        // // Zod 유효성 검사
        // const result = userSchema.safeParse({
        //     userType: userType,
        //     loginId: loginId.current.value,
        //     password: password.current.value,
        //     checkPassword: checkPassword.current.value,
        //     name: name.current.value,
        //     userGender: userGender,
        //     birth: birth.current.value,
        //     phone: phone.current.value,
        //     email: email.current.value,
        //     zipCode: zipCode.current.value,
        //     userAddress: userAddress.current.value,
        // }); 
        // if (!result.success) {
        //     alert(result.error.errors[0].message); // 에러 메시지 출력
        //     return; // 유효성 검사 실패 시 폼 제출 중지
        // }

        const param = {
            action: "I",
            ckIdcheckreg: 1,
            ckEmailcheckreg: 0,
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
                                {/* ValidType 컴포넌트를 <td> 안에 넣고 props로 전달
                                <ValidType userType={userType} setUserType={setUserType} /> */}
                            </td>
                        </tr>
                        <tr>
                            <th>아이디</th>
                            <td>
                                <input type="text" ref={loginId} placeholder="숫자, 영문자 조합으로 6~20자리"></input>
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
                                <input type="text" ref={checkPassword}></input>
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
