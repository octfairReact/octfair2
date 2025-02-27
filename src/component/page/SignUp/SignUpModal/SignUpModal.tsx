import { SignUpModalStyled } from "../styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { SignUp } from "../../../../api/api";
import { postSignUpApi } from "../../../../api/postSignUpApi";
import { IPostResponse, SignUpOtherUserData, SignUpUserTypeToCheckPw } from "../../../../models/interface/ISignUp";
import { UserInit } from "../../Login/User/UserInit";
import PostCode from "../../../common/Utils/PostCode/PostCode";
import { idChkState } from "../../../../stores/idChkState";
import { loginIdSchema, userTypeToCheckPwSchema } from "../../../common/Validate/Schemas/User/SignUpSchema";
import { otherUserDataSchema } from "../../../common/Validate/Schemas/User/UserSchema";
import { formatPhoneNumber } from "./../../../common/Utils/Format/FormatPhone";
import { handleAddressComplete } from "../../../common/Utils/PostCode/HandlerAddress";

export const SignUpModal = () => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [checkIdExist, setCheckIdExist] = useRecoilState<boolean>(idChkState);

    //User.ts에서 유저 정보 초기값 불러오기
    const { state, refs } = UserInit();
    const {
        userType,
        setUserType,
        sex,
        setSex,
        address,
        setAddress,
        zipCode,
        setZipCode,
        firstCheckId,
        setFirstCheckId,
    } = state;
    const { loginId, password, checkPassword, name, birthday, phone, email, userDetailAddress } = refs;

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
                setCheckIdExist(!checkIdExist);
                setFirstCheckId(loginId.current.value);
                alert("사용 가능한 ID입니다");
            }
        } catch (error) {
            alert("ID 중복 체크에 실패했습니다. 다시 시도해주세요.");
        }
    };

    const onAddressComplete = (data) => {
        handleAddressComplete(data, setAddress, setZipCode); // 모듈화된 함수 사용
    };

    const handlerSave = async (e) => {
        e.preventDefault();

        //SignUpOtherUserDetails = zod userSchema.safeParse용으로 zipCode(number)까지 string으로 타입 통일된 인터페이스
        const userTypeToCheckPw: SignUpUserTypeToCheckPw = {
            userType: userType,
            loginId: loginId.current.value,
            password: password.current.value,
            checkPassword: checkPassword.current.value,
        };

        const nameToDetailAddress: SignUpOtherUserData = {
            name: name.current.value,
            sex: sex,
            phone: phone.current.value,
            email: email.current.value,
            birthday: birthday.current.value,
            zipCode: zipCode,
            address: address,
            detailAddress: userDetailAddress.current.value,
        };

        const validUserTypeToCheckPw = userTypeToCheckPwSchema.safeParse(userTypeToCheckPw);
        const validNameToDa = otherUserDataSchema.safeParse(nameToDetailAddress);

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

        if (checkIdExist !== true) {
            alert("ID 중복 검사를 진행해주세요");
            return;
        }
        if (loginId.current.value !== firstCheckId) {
            setCheckIdExist(!checkIdExist);
            alert("입력하신 ID가 변경되었습니다. 중복 검사를 다시 진행해주세요");
            return;
        }

        //유효성 검증 완료 후 폼 제출
        const param = {
            action: "I",
            loginId: loginId.current.value,
            userType: userType,
            name: name.current.value,
            password: password.current.value,
            sex: sex,
            phone: phone.current.value,
            email: email.current.value,
            birthday: birthday.current.value,
            zipCode: zipCode,
            address: address,
            detailAddress: userDetailAddress.current.value,
        };

        const save = await postSignUpApi<IPostResponse>(SignUp.register, param);
        if (save.result === "SUCCESS") {
            alert("회원 가입이 완료되었습니다");
            handlerModal();
        }
    };

    const handlerModal = () => {
        setCheckIdExist(!checkIdExist);
        setModal(!modal);
    };

    return (
        <form>
            <SignUpModalStyled>
                <table className="table">
                    <tbody>
                        <tr>
                            <th className="required">회원 유형</th>
                            <td>
                                <select
                                    className="selectUserType"
                                    value={userType}
                                    onChange={(e) => setUserType(e.target.value)}
                                >
                                    <option value="">선택</option>
                                    <option value="A">개인회원</option>
                                    <option value="B">기업회원</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th className="required">아이디</th>
                            <td>
                                <div className="input-with-button">
                                    <input
                                        type="text"
                                        ref={loginId}
                                        placeholder="숫자, 영문자 조합으로 6~20자리"
                                    ></input>
                                    <button onClick={checkId}>중복확인</button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <th className="required">비밀번호</th>
                            <td>
                                <input
                                    type="password"
                                    ref={password}
                                    placeholder="숫자, 영문자, 특수문자 조합으로 8~15자리"
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th className="required">비밀번호 확인</th>
                            <td>
                                <input type="password" ref={checkPassword}></input>
                            </td>
                        </tr>
                        <tr>
                            <th className="required">이름</th>
                            <td>
                                <input type="text" ref={name} name="userName"></input>
                            </td>

                            <th className="required">성별</th>
                            <td>
                                <select className="selectUserType" value={sex} onChange={(e) => setSex(e.target.value)}>
                                    <option value="">선택</option>
                                    <option value="1">남자</option>
                                    <option value="2">여자</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th className="required">생년 월일</th>
                            <td>
                                <input type="date" ref={birthday}></input>
                            </td>
                        </tr>
                        <tr>
                            <th className="required">전화번호</th>
                            <td>
                                <input
                                    type="text"
                                    ref={phone}
                                    onChange={(e) => {
                                        phone.current.value = formatPhoneNumber(e.target.value);
                                    }}
                                    placeholder="ex) 010-xxxx-xxxx"
                                ></input>
                            </td>
                        </tr>
                        <tr>
                            <th className="required">이메일</th>
                            <td>
                                <input type="text" ref={email}></input>
                            </td>
                        </tr>
                        <tr>
                            <th className="required">우편번호</th>
                            <td className="address-container">
                                <input
                                    type="text"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value)}
                                    placeholder="우편번호 입력"
                                />

                                <PostCode onHandleComplete={onAddressComplete} />
                            </td>
                        </tr>
                        <tr>
                            <th className="required">주소</th>
                            <td>
                                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}></input>
                            </td>
                        </tr>
                        <tr>
                            <th>상세 주소</th>
                            <td>
                                <input type="text" ref={userDetailAddress}></input>
                            </td>
                        </tr>
                    </tbody>
                    <div className="modal-footer">
                        <button onClick={handlerModal}>나가기</button>
                        <button onClick={handlerSave}>등록</button>
                    </div>
                </table>
            </SignUpModalStyled>
        </form>
    );
};
