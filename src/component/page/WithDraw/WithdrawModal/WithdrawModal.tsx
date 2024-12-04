import { useRef } from "react";
import { WithdrawModalStyled } from "./styled";
import { useRecoilState } from "recoil";
import { ILoginInfo } from "../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../stores/userInfo";
import { postApi } from "../../../../api/postApi";
import { IPostResponse } from "../../../../models/interface/IUser";
import { MyPage } from "../../../../api/api";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { modalState } from "../../../../stores/modalState";

export const WithdrawModal = () => {
    const password = useRef<HTMLInputElement>(null);
    const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const navigate = useNavigate();

    const handlerDeleteUser = async () => {
        const param = {
            password: password.current.value,
            loginId: userInfo.loginId,
        };
        const deleteUser = await postApi<IPostResponse>(MyPage.deleteUser, param);
        if (deleteUser.result === "fail") {
            alert("비밀번호가 일치하지 않습니다.");
            return;
        }
        if (deleteUser.result === "success") {
            alert("회원 탈퇴 처리가 완료되었습니다.");
            handlerModal();
            handlerLogout();
        }
    };

    const handlerLogout = () => {
        sessionStorage.setItem("userInfo", "");
        navigate("/");
    };

    const handlerModal = () => {
        setModal(!modal);
    };

    return (
        <>
            <WithdrawModalStyled>
                <div>
                    <strong>비밀번호 확인</strong>
                    <input type="password" ref={password}></input>
                </div>
                <div>
                    <Button onClick={handlerDeleteUser}>탈퇴</Button>
                    <Button onClick={handlerModal}>나가기</Button>
                </div>
            </WithdrawModalStyled>
        </>
    );
};
