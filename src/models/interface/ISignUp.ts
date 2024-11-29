export interface ISignUp {
    loginId: string;
    userType: string;
    name: string;
    password: string;
    checkPassword: string;
    sex: string;
    zipCode: string;
    phone: string;
    email: string;
    birthday: string;
    address: string;
    detailAddress: string;
}

// 'userType'부터 "checkPassword"
export type SignUpUserTypeToCheckPw = Pick<ISignUp, "loginId" | "userType" | "password" | "checkPassword">;

// 나머지 필드는 'Omit'을 사용하여 분리
export type SignUpOtherUserData = Omit<ISignUp, "loginId" | "userType" | "password" | "checkPassword">;

//응답 받기 용
export interface IPostResponse {
    result: string;
}
