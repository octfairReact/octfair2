import { useRecoilState } from "recoil";
import { useEffect, useState } from "react";
import { IPostResponse, IUser, IUserDetailResponse } from "../../../../models/interface/IUser";
import { ILoginInfo } from "../../../../models/interface/store/userInfo";
import { loginInfoState } from "../../../../stores/userInfo";
import { MyPage } from "../../../../api/api";
import { postApi } from "../../../../api/postApi";
import { Button } from "react-bootstrap";
import { UserInit } from "../../Login/User/UserInit";
import PostCode from "../../../common/Utils/PostCode/PostCode";
import { Address } from "react-daum-postcode";
import { SignUpOtherUserData } from "../../../../models/interface/ISignUp";
import { MyPageStyled, StyledMypage } from "./styled";
import { modalState } from "../../../../stores/modalState";
import { Portal } from "../../../common/potal/Portal";
import { ChangePwModal } from "../ChangePwModal/ChangePwModal";
import { useNavigate } from "react-router-dom";
import { otherUserDataSchema } from "../../../common/Validate/Schemas/User/UserSchema";
import { formatPhoneNumber } from "../../../common/Utils/Format/FormatPhone";
import { handleAddressComplete } from "../../../common/Utils/PostCode/HandlerAddress";

export const MyPageMain = () => {
  const [modal, setModal] = useRecoilState<boolean>(modalState);
  const [userInfo] = useRecoilState<ILoginInfo>(loginInfoState);
  const [userDetail, setUserDetail] = useState<IUser>();
  const { state, refs } = UserInit();
  const { sex, setSex, address, setAddress, zipCode, setZipCode } = state;
  const { name, birthday, phone, email, userDetailAddress } = refs;
  const [bizIdx, setBizIdx] = useState<number>(0);
  const navigate = useNavigate();

  const searchDetail = async () => {
    const param = { loginId: userInfo.loginId };
    const detailApi = await postApi<IUserDetailResponse>(MyPage.getDetail, param);

    if (detailApi) {
      setUserDetail(detailApi.detail);
      setBizIdx(detailApi.chkRegBiz.bizIdx);
      localStorage.setItem("userDetail", JSON.stringify(detailApi.detail));
    }
  };

  useEffect(() => {
    // userInfo가 변경되면 로컬 스토리지에서 사용자 정보 불러오기
    if (userInfo?.loginId) {
      const savedUserDetail = localStorage.getItem("userDetail");
      if (savedUserDetail) {
          const parsedDetail = JSON.parse(savedUserDetail);
          setUserDetail(parsedDetail);
      }
      // 상세 정보를 불러오는 API 호출
      searchDetail();
    }
    // 컴포넌트 언마운트 시 클린업
    return () => {
      setUserDetail(null); // 상태 초기화
      setBizIdx(null); // 상태 초기화
      localStorage.removeItem("userDetail"); // 로컬 스토리지 클린업
    };
  }, [userInfo]); // userInfo가 변경될 때마다 실행

  useEffect(() => {
    // userDetail 값이 변경되면 여기서 다른 작업을 수행할 수 있음
    if (userDetail) {
      // 추가 작업 (예: UI에 사용자 상세 정보 반영)
      setSex(userDetail?.sex);
      setAddress(userDetail?.address);
      setZipCode(userDetail?.zipCode);
    }
  }, [userDetail]); // userDetail 값이 변경될 때마다 실행

  const handlerUpdate = async () => {
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

    const validNameToDa = otherUserDataSchema.safeParse(nameToDetailAddress);

    if (!validNameToDa.success) {
      alert(validNameToDa.error.errors[0].message);
      return;
    }

    const param = {
      name: name.current.value,
      sex: sex,
      birthday: birthday.current.value,
      phone: phone.current.value,
      email: email.current.value,
      zipCode: zipCode,
      address: address,
      detailAddress: userDetailAddress.current.value,
      loginId: userInfo.loginId,
    };

    const updateApi = await postApi<IPostResponse>(MyPage.getUpdate, param);

    if (updateApi.result === "success") {
      alert("회원 정보 수정이 완료되었습니다");
      searchDetail();
    }
  };

  const onAddressComplete = (data) => {
    handleAddressComplete(data, setAddress, setZipCode); // 모듈화된 함수 사용
  };

  const handlerUpdatePwModal = () => {
    setModal(!modal);
  };

  return (
    <>
      <StyledMypage>
        <table className="table">
          <tbody>
            <tr>
              <th>아이디</th>
              <td>
                <input
                  type="text" 
                  className="form-control loginId" 
                  placeholder="숫자, 영문자 조합으로 6~20자리"
                  defaultValue={userDetail?.loginId}
                  readOnly
                />
                <button className="btn btn-outline-primary" onClick={handlerUpdatePwModal}>비밀번호 수정</button>
              </td>
            </tr>
            {/* <tr>
              <th>비밀번호</th>
              <td>
                <button className="btn btn-outline-primary" onClick={handlerUpdatePwModal}>비밀번호 수정</button>
              </td>
            </tr> */}
            <tr>
              <th className="required">이름<span className="font_red">*</span></th>
              <td>
                <input type="text" className="form-control" ref={name} defaultValue={userDetail?.name}></input>
              </td>
            </tr>
            <tr>
              <th className="required">성별<span className="font_red">*</span></th>
              <td>
                <select
                  className="selectUserType form-select"
                  value={sex || ""}
                  onChange={(e) => setSex(e.target.value)}
                >
                  <option value="" disabled>
                    선택
                  </option>
                  <option value="1">남자</option>
                  <option value="2">여자</option>
                </select>
              </td>
            </tr>
            <tr>
              <th className="required">생년월일<span className="font_red">*</span></th>
              <td>
                <input
                  className="selectBirth form-control"
                  type="date"
                  ref={birthday}
                  defaultValue={userDetail?.birthday}
                ></input>
              </td>
            </tr>
              <tr>
                <th className="required">전화번호<span className="font_red">*</span></th>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    ref={phone}
                    defaultValue={userDetail?.phone}
                    onChange={(e) => {
                      phone.current.value = formatPhoneNumber(e.target.value);
                    }}
                    placeholder="ex) 010-xxxx-xxxx"
                  ></input>
                </td>
              </tr>
              <tr>
                <th className="required">이메일<span className="font_red">*</span></th>
                <td>
                  <input type="text" className="form-control" ref={email} defaultValue={userDetail?.email}></input>
                </td>
              </tr>
              {userDetail?.userType === "B" && (
                <tr>
                    <th>기업 정보</th>
                    <td>
                        {bizIdx ? (
                            <button className="btn btn-outline-primary" onClick={() => navigate(`/react/company/companyUpdate.do/${bizIdx}`)}>
                                기업 정보 수정
                            </button>
                        ) : (
                            <button className="btn btn-outline-primary" onClick={() => navigate(`/react/company/companyWrite.do/`)}>
                                기업 정보 등록
                            </button>
                        )}
                    </td>
                </tr>
              )}
              <tr>
                <th className="required">우편번호<span className="font_red">*</span></th>
                <td className="address-container">
                  <input
                    type="text"
                    className="form-control zipCode"
                    value={zipCode || ""}
                    defaultValue={userDetail?.zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    placeholder="우편번호 입력"
                  />
                  <PostCode onHandleComplete={onAddressComplete} />
                </td>
              </tr>
              <tr>
                <th className="required">주소<span className="font_red">*</span></th>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={userDetail?.address}
                    value={address || ""}
                    onChange={(e) => setAddress(e.target.value)}
                  ></input>
                </td>
              </tr>
              <tr>
                <th>상세 주소</th>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    ref={userDetailAddress}
                    defaultValue={userDetail?.detailAddress}
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="btnGroup">
            <Button onClick={handlerUpdate}>정보 수정하기</Button>
          </div>
        </StyledMypage>
      {modal && (
        <Portal>
          <ChangePwModal loginId={userInfo.loginId} />
        </Portal>
      )}
    </>
  );
};
