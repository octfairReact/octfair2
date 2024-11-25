import { useState } from "react";
import { FindIdPwModalStyled } from "./styled";
import { Button } from "react-bootstrap";
import { UserInit } from "../Init/User";
import { postSignUpApi } from "../../../../api/postSignUpApi";
import { SignUp } from "../../../../api/api";
import { IPostResponse, IUserInfoResponse } from "../../../../models/interface/ISignUp";
import { useRecoilState } from "recoil";
import { modalState2 } from "../../../../stores/modalState";
import { loginIdEmailSchema, nameEmailSchema, passwordCheckPwSchema } from "../Validate/Schemas";

export const FindIdPwModal = () => {
    const [findModal, setFindModal] = useRecoilState<boolean>(modalState2);
    const [openFindId, setOpenFindId] = useState<boolean>(false);
    const [openFindPw, setOpenFindPw] = useState<boolean>(false);
    const [openChangePw, setOpenChangePw] = useState<boolean>(false);
    const { refs } = UserInit();

    const { loginId, name, email, password, checkPassword } = refs;

    const handlerModal = () => {
        setFindModal(!findModal);
    };

    const openFindIdArea = (e) => {
        e.preventDefault();
        setOpenFindId(true);
        setOpenFindPw(false);
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

        const validUserNameEmail = nameEmailSchema.safeParse(userEmailName);
        if (!validUserNameEmail.success) {
            alert(validUserNameEmail.error.errors[0].message);
            return; // validUserEmail 검증 실패 시 리턴
        }

        const param = {
            name: name.current.value,
            email: email.current.value,
        };
        console.log(param);

        const findUserId = await postSignUpApi<IUserInfoResponse>(SignUp.findId, param);
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

        const findUserPw = await postSignUpApi<IUserInfoResponse>(SignUp.findPw, param);
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
            id: loginId.current.value,
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
            <Button onClick={openFindIdArea}>ID 찾기</Button>

            <Button onClick={openFindPwArea}>PW 찾기</Button>

            <div className="findIdArea">
                {openFindId && (
                    <p>
                        이름<input type="text" ref={name} placeholder="가입하신 이름을 입력하세요"></input>
                        <br></br>
                        이메일<input type="text" ref={email} placeholder="가입하신 이메일을 입력하세요"></input>
                        <br></br>
                        <Button onClick={findId}>확인</Button>
                    </p>
                )}
            </div>

            <div className="findPwArea">
                {openFindPw && (
                    <p>
                        아이디<input type="text" ref={loginId} placeholder="가입하신 아이디를 입력하세요"></input>
                        <br></br>
                        이메일<input type="text" ref={email} placeholder="가입하신 이메일을 입력하세요"></input>
                        <br></br>
                        <Button onClick={findPw}>확인</Button>
                    </p>
                )}
            </div>

            <div className="changePwArea">
                {openChangePw && (
                    <p>
                        비밀번호<input type="password" ref={password}></input>
                        <br></br>
                        비밀번호 확인<input type="password" ref={checkPassword}></input>
                        <br></br>
                        <Button onClick={updatePw}>비밀번호 변경</Button>
                    </p>
                )}
            </div>

            <Button onClick={handlerModal}>나가기</Button>
        </FindIdPwModalStyled>
    );
};
