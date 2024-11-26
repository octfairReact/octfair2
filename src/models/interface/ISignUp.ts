

export interface ISignUp {
    loginId: string;
    userType: string;
    name: string;
    password: string;
    checkPassword: string;
    userGender: string;
    zipCode: number;
    phone: string;
    email: string;
    birthday: string;
    address: string;
    detailAddress: string;
}


//ID 중복검사용
// 'loginId'만 인터페이스
export type SignUpLoginId = Pick<ISignUp, "loginId">;

//Password 재설정용
// 'password', 'checkPassword'만 인터페이스
export type SignUpPassword = Pick<ISignUp, "password" | "checkPassword">;


// 'userType'부터 "checkPassword"
export type SignUpUserTypeToCheckPw = Pick<ISignUp, "loginId" | "userType" | "password" | "checkPassword">;

// 나머지 필드는 'Omit'을 사용하여 분리
export type SignUpOtherUserData = Omit<ISignUp, "loginId" | "userType" | "password" | "checkPassword">;


// SignUpOtherUserData의 유효성 검사용 인터페이스 (zipCode를 string으로 처리)
export interface SignUpOtherUserDetail extends Omit<SignUpOtherUserData, "zipCode"> {
    zipCode: string; // zipCode는 string으로 변경
}


//응답 받기 용
export interface IPostResponse {
  result: string;
}

//id 찾기 응답
//응답 받기 용
export interface IUserInfoResponse {
  result: string;
  id: string;
}

