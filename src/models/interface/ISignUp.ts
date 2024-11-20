

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

// 유효성 검사용 인터페이스 (zipCode를 string으로 처리)
export interface ISignUpForValidation extends Omit<ISignUp, 'zipCode'> {
    zipCode: string;  // zipCode는 string으로 변경
}


export type UserType = Pick<ISignUp, "userType" | "userGender">;
export type Password = Pick<ISignUp, "password" | "checkPassword">;
export type LoginId = Pick<ISignUp, "loginId">;
export type Name = Pick<ISignUp, "name">;
export type Phone = Pick<ISignUp, "phone">;
export type Email = Pick<ISignUp, "email">;
export type Birthday = Pick<ISignUp, "birth">;
export type ZipCode = Pick<ISignUp, "zipCode">;
export type Address = Pick<ISignUp, "address" | "detailAddress">;





//응답 받기 용
export interface IPostResponse {
  result: string;
}