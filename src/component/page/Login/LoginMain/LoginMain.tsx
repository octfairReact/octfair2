import { useState } from "react";
import { LoginStyled } from "./styled";
import axios from "axios";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useNavigate } from "react-router-dom";
import { loginInfoState } from "../../../../stores/userInfo";
import { ILoginInfo } from "../../../../models/interface/store/userInfo";
import logo_img from "../../../../assets/logo_img.png";
import { modalState, modalState2 } from "../../../../stores/modalState";
import { Portal } from "../../../common/potal/Portal";
import { SignUpModal } from "../../SignUp/SignUpModal/SignUpModal";
import { FindIdPwModal } from "../../FindIdPw/FindIdPwModal/FindIdPwModal";

export interface IAccount {
    lgn_Id: string;
    pwd: string;
}

export const LoginMain = () => {
    const setLoginInfo = useSetRecoilState<ILoginInfo>(loginInfoState);
    const [account, setAccount] = useState<IAccount>({
        lgn_Id: "",
        pwd: "",
    });
    const navigate = useNavigate();

    //회원 가입 모달 창 띄우기
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    //ID, PW 찾는 모달 창 띄우기
    const [findModal, setFindModal] = useRecoilState<boolean>(modalState2);

    const handlerSignUpModal = () => {
        setModal(!modal);
        setFindModal(findModal);
    };
    const handlerFindIdPwModal = () => {
        setModal(modal);
        setFindModal(!findModal);
    };

    const loginHandler = () => {
        const param = new URLSearchParams();
        param.append("lgn_Id", account.lgn_Id);
        param.append("pwd", account.pwd);

        axios.post("/api/loginProc.do", param).then((res) => {
            const data = res.data;

            if (data.result === "SUCCESS") {
                setLoginInfo(data);
                sessionStorage.setItem("userInfo", JSON.stringify(data));
                navigate("/react");
            } else {
                alert("ID 혹은 비밀번호가 틀립니다");
                return;
            }
        });
    };

    const activeEnter  = (e) => {
        if (e.key === "Enter") {
            loginHandler();
        }
    };

    return (
        <>
            <LoginStyled>
                <div className="login-container">
                    <div>
                        <div className="login-text">
                            <div className="login-image">
                                <img alt="" src={logo_img} />
                            </div>
                            <h3> 안되는 것이 실패가 아니라 포기하는 것이 실패다 </h3>
                            <div>
                                성공은 실패의 꼬리를 물고 온다.지금 포기한 것이 있는가 ?
                                <br />
                                그렇다면 다시 시작해 보자. <br />
                                안되는 것이 실패가 아니라 포기하는 것이 실패다. <br />
                                포기한 순간이 성공하기 5 분전이기 쉽다. <br />
                                실패에서 더 많이 배운다. <br />
                                실패를 반복해서 경험하면 실망하기 쉽다. <br />
                                하지만 포기를 생각해선 안된다.실패는 언제나 중간역이지 종착역은 아니다. <br />
                            </div>
                            <div> -이대희, ‘1 % 의 가능성을 희망으로 바꾼 사람들’ 에서 </div>
                        </div>
                        <div className="login-box">
                            <div className="buttons inputs">
                                <div>
                                    <label> 아이디 </label>
                                    <input
                                        required
                                        onChange={(e) => {
                                            setAccount((prev: IAccount) => {
                                                return { ...prev, lgn_Id: e.target.value };
                                            });
                                        }}
                                        onKeyDown={(e) => activeEnter(e)}
                                    />
                                </div>
                                <div>
                                    <label> 비밀번호 </label>
                                    <input
                                        required
                                        type="password"
                                        onChange={(e) => {
                                            setAccount((prev: IAccount) => {
                                                return { ...prev, pwd: e.target.value };
                                            });
                                        }}
                                        onKeyDown={(e) => activeEnter(e)}
                                    />
                                </div>
                                <div>
                                    <button className="login-button" onClick={loginHandler}>
                                        Login
                                    </button>
                                    <button className="signup-button" onClick={handlerSignUpModal}>
                                        {" "}
                                        Sign Up{" "}
                                    </button>
                                </div>
                                <button onClick={handlerFindIdPwModal}>아이디/비밀번호 찾기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </LoginStyled>
            {modal && (
                <Portal>
                    <SignUpModal />
                </Portal>
            )}
            {findModal && (
                <Portal>
                    <FindIdPwModal />
                </Portal>
            )}
        </>
    );
};
