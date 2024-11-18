import { SignUpModalStyled } from "./styled";

export const SignUpModal = () => {
    return (
        <SignUpModalStyled>
            <div className="container">
                <p>
                    {" "}
                    회원 유형 &nbsp;&nbsp;
                    <select className="selectUserType">
                        <option value="">개인회원</option>
                        <option value="">기업회원</option>
                    </select>
                </p>
                <p>
                    제목 &nbsp;<input type="text"></input>
                </p>
                <p>
                    제목 &nbsp;<input type="text"></input>
                </p>
                <p>
                    제목 &nbsp;<input type="text"></input>
                </p>
                <p>
                    제목 &nbsp;<input type="text"></input>
                </p>
            </div>
        </SignUpModalStyled>
    );
};
