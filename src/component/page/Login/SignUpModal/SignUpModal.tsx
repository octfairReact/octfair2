import { useRef, useState } from "react";
import { SignUpModalStyled } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import axios from "axios";

import { SignUp } from "../../../../api/api";
import { postSignUpApi } from "../../../../api/postSignUpApi";
import { IPostResponse } from "../../../../models/interface/INotice";

export const SignUpModal = () => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [userType, setUserType] = useState<string>(""); // 초기값 설정
    const loginId = useRef<HTMLInputElement>();
    const password = useRef<HTMLInputElement>();
    const name = useRef<HTMLInputElement>();
    const [userGender, setUserGender] = useState<string>("");
    const birth = useRef<HTMLInputElement>();
    const phone = useRef<HTMLInputElement>();
    const email = useRef<HTMLInputElement>();
    const zipCode = useRef<HTMLInputElement>();
    const userAddress = useRef<HTMLInputElement>();
    const userDetailAddress = useRef<HTMLInputElement>();

    const blank = "";

    const handleUserType = (e) => {
        setUserType(e.target.value);
    };

    const handleUserGender = (e) => {
        setUserGender(e.target.value);
    };

    const handlerSave = async (e) => {
        e.preventDefault();

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
                    <thead style={{ display: "none" }}>
                        <tr>
                            <th>헤더 1</th>
                            <th>헤더 2</th>
                            <th>헤더 3</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="hidden" name="ckIdcheckreg" value="" />
                                <input type="hidden" name="ckEmailcheckreg" value="" />
                                <input type="hidden" name="action" value="" />
                            </td>
                            <td></td>
                        </tr>
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
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호</th>
                            <td>
                                <input
                                    type="text"
                                    ref={password}
                                    placeholder="숫자, 영문자, 특수문자 조합으로 8~15자리"
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th>비밀번호 확인</th>
                            <td>
                                <input type="text"></input>
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
