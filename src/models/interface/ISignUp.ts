

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
    birth: string;
    address: string;
    detailAddress: string;
}

// // 전체 유효성 검사용 인터페이스 (zipCode를 string으로 처리)
// export interface ISignUpForValidation extends Omit<ISignUp, 'zipCode'> {
//     zipCode: string;  // zipCode는 string으로 변경
// }


// 'loginId', 'userType', 'password', 'checkPassword'까지 먼저 묶는 인터페이스
export type SignUpPasswordDetail = Pick<ISignUp, "loginId" | "userType" | "password" | "checkPassword">;

//recoil 사용시
export type SignUpUserTypeGender = Pick<ISignUp, "userType" | "userGender">;

// 나머지 필드는 'Omit'을 사용하여 분리
export type SignUpOtherUserDetails = Omit<ISignUp, "loginId" | "userType" | "password" | "checkPassword">;

// 유효성 검사용 인터페이스 (zipCode를 string으로 처리)
export interface SignUpOtherUserDetail extends Omit<SignUpOtherUserDetails, "zipCode"> {
    zipCode: string; // zipCode는 string으로 변경
}






//응답 받기 용
export interface IPostResponse {
  result: string;
}

