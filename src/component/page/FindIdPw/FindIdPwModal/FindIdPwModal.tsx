import { useState } from "react";
import { FindIdPwModalStyled } from "../styled";
import { Button } from "react-bootstrap";
import { UserInit } from "../../Login/User/UserInit";
import { postSignUpApi } from "../../../../api/postSignUpApi";
import { SignUp } from "../../../../api/api";

import { useRecoilState } from "recoil";
import { modalState2 } from "../../../../stores/modalState";
import { IPostResponse } from "../../../../models/interface/IUser";
import { emailAndNameSchema, loginIdEmailSchema } from "../../../common/Validate/Schemas/User/FindIdPwSchema";
import { passwordCheckPwSchema } from "../../../common/Validate/Schemas/User/UserSchema";

export const FindIdPwModal = () => {
    const [findModal, setFindModal] = useRecoilState<boolean>(modalState2);
    const [openFindId, setOpenFindId] = useState<boolean>(false);
    const [openFindPw, setOpenFindPw] = useState<boolean>(false);
    const [openChangePw, setOpenChangePw] = useState<boolean>(false);
    const { refs } = UserInit();

    const { loginId, name, email, password, checkPassword } = refs;
    const [passLoginId, setPassLoginId] = useState("");

    const handlerModal = () => {
        setFindModal(!findModal);
    };

    const openFindIdArea = (e) => {
        e.preventDefault();
        setOpenFindId(true);
        setOpenFindPw(false);
        setOpenChangePw(false);
    };

    const openFindPwArea = (e) => {
        e.preventDefault();
        setOpenFindPw(true);
        setOpenFindId(false);
    };

    const findId = async (e) => {
        e.preventDefault();

        const userEmailName = {
            email: email.current.value,
            name: name.current.value,
        };

        const validUserNameEmail = emailAndNameSchema.safeParse(userEmailName);
        if (!validUserNameEmail.success) {
            alert(validUserNameEmail.error.errors[0].message);
            return; // validUserEmail 검증 실패 시 리턴
        }

        const param = {
            name: name.current.value,
            email: email.current.value,
        };
        console.log(param);

        const findUserId = await postSignUpApi<IPostResponse>(SignUp.findId, param);
        if (findUserId.result === "SUCCESS") {
            alert("회원님의 ID는  " + findUserId.id + "  입니다.");
            handlerModal();
        } else {
            alert("존재하지 않는 회원 정보입니다");
            return;
        }
    };

    const findPw = async (e) => {
        e.preventDefault();

        const loginIdValue = loginId.current.value;
        setPassLoginId(loginIdValue);

        const userLoginIdEmail = {
            loginId: loginId.current.value,
            email: email.current.value,
        };
        const validUserLoginIdEmail = loginIdEmailSchema.safeParse(userLoginIdEmail);
        if (!validUserLoginIdEmail.success) {
            alert(validUserLoginIdEmail.error.errors[0].message);
            return; // validUserEmail 검증 실패 시 리턴
        }

        const param = {
            id: loginId.current.value,
            email: email.current.value,
        };
        console.log(param);

        const findUserPw = await postSignUpApi<IPostResponse>(SignUp.findPw, param);
        if (findUserPw.result === "SUCCESS") {
            setOpenChangePw(true);
        } else {
            alert("존재하지 않는 회원 정보입니다");
            return;
        }
    };

    const updatePw = async () => {
        const userPasswordCheck = {
            password: password.current.value,
            checkPassword: checkPassword.current.value,
        };
        const validUserPassword = passwordCheckPwSchema.safeParse(userPasswordCheck);
        if (!validUserPassword.success) {
            alert(validUserPassword.error.errors[0].message);
            return; // validUserEmail 검증 실패 시 리턴
        }

        const param = {
            pw: password.current.value,
            id: passLoginId,
        };
        console.log(param);
        const updateUserPw = await postSignUpApi<IPostResponse>(SignUp.updatePw, param);
        if (updateUserPw.result === "SUCCESS") {
            alert("비밀번호 변경이 완료되었습니다.");
            handlerModal();
        }
    };

    return (
        <FindIdPwModalStyled>
            <div className="modal-header">
                <Button className="close-button" onClick={handlerModal}>
                    X
                </Button>
            </div>

            <div className="findButton">
                <Button onClick={openFindIdArea}>ID 찾기</Button>
                <Button onClick={openFindPwArea}>PW 찾기</Button>
            </div>

            <div className="findArea">
                <div>
                    {openFindId && (
                        <div>
                            <div className="form-group">
                                <table>
                                    <tr>
                                        <td>
                                            <label className="form-label">이름</label>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                ref={name}
                                                placeholder="가입하신 이름을 입력하세요"
                                                className="form-input"
                                            />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label className="form-label">이메일</label>
                                        </td>
                                        <td>
                                            <input
                                                type="text"
                                                ref={email}
                                                placeholder="가입하신 이메일을 입력하세요"
                                                className="form-input"
                                            />
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <Button className="form-button" onClick={findId}>
                                확인
                            </Button>
                        </div>
                    )}
                </div>
                <div>
                    {openFindPw &&
                        !openChangePw && ( // openChangePw가 false일 때만 표시되도록 조건 추가
                            <div>
                                <div className="form-group">
                                    <table>
                                        <tr>
                                            <td>
                                                <label className="form-label">아이디</label>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    ref={loginId}
                                                    placeholder="가입하신 아이디를 입력하세요"
                                                    className="form-input"
                                                ></input>
                                            </td>
                                        </tr>

                                        <tr>
                                            <td>
                                                <label className="form-label">이메일</label>
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    ref={email}
                                                    placeholder="가입하신 이메일을 입력하세요"
                                                    className="form-input"
                                                ></input>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <Button className="form-button" onClick={findPw}>
                                    확인
                                </Button>
                            </div>
                        )}
                </div>
                <div>
                    {openChangePw && (
                        <div>
                            <input type="hidden" value={passLoginId}></input>
                            <div>
                                <table>
                                    <tr>
                                        <td>
                                            <label className="form-label">비밀번호</label>
                                        </td>
                                        <td>
                                            <input type="password" ref={password} className="form-input"></input>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
                                            <label className="form-label">비밀번호 확인</label>
                                        </td>
                                        <td>
                                            <input type="password" ref={checkPassword} className="form-input"></input>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <Button className="form-button" onClick={updatePw}>
                                비밀번호 변경
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            {/* 
            <div className="modal-footer">
                <Button onClick={handlerModal}>나가기</Button>
            </div> */}
        </FindIdPwModalStyled>
    );
};
