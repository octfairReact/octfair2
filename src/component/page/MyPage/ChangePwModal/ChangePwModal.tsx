import { Button } from "react-bootstrap";
import { UserInit } from "../../Login/Init/User";
import { MyPage } from "../../../../api/api";
import { IPostResponse } from "../../../../models/interface/ISignUp";
import { useRecoilState } from "recoil";
import { modalState2 } from "../../../../stores/modalState";
import { ChangePwModalStyled } from "./styled";
import { useRef } from "react";
import { postApi } from "../../../../api/postApi";
import { passwordCheckPwSchema } from "../../../common/Validate/Schemas/User/UserSchema";

export const ChangePwModal = (loginId) => {
    const [findModal, setFindModal] = useRecoilState<boolean>(modalState2);

    const { refs } = UserInit();
    const { password, checkPassword } = refs;
    const oldPassword = useRef<HTMLInputElement>(null);

    const handlerModal = () => {
        setFindModal(!findModal);
    };

    const updatePw = async () => {
        if (oldPassword.current.value === "") {
            alert("현재 비밀번호를 입력해주세요");
            return;
        }

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
            passwd: oldPassword.current.value,
            newPasswd: password.current.value,
            newPasswdConfirm: checkPassword.current.value,
            loginId: loginId.loginId,
        };
        console.log(param);
        const updateUserPw = await postApi<IPostResponse>(MyPage.updatePw, param);
        if (updateUserPw.result === "fail1") {
            alert("현재 비밀번호와 일치하지 않습니다");
            return;

        } if (updateUserPw.result === "success") {
            alert("비밀번호 변경이 완료되었습니다.");
            handlerModal();
        }
    };

    return (
        <ChangePwModalStyled>
            <div className="changePwArea">
                
                <div>
                    <label>현재 비밀번호</label>
                    <input type="password" ref={oldPassword}></input>
                </div>
                <div>
                    <label>새 비밀번호</label>
                    <input type="password" ref={password}></input>
                </div>
                <div>
                    <label>비밀번호 확인</label>
                    <input type="password" ref={checkPassword}></input>
                </div>
                    <br></br>
                    <Button onClick={updatePw}>비밀번호 변경</Button>
                    <Button onClick={handlerModal}>나가기</Button>
                
            </div>
        </ChangePwModalStyled>
    );
};
