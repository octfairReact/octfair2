import { IBiz } from "./IBiz";

export interface IUser {
    userIdx: number;
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
    detailAddress?: string;
    statusYn: string;
    regdate: string;
    bizIdx: number;
}

// 나머지 필드는 'Omit'을 사용하여 분리
export type manageUpdateApplicantData = Omit<
    IUser,
    "userIdx" | "loginId" | "userType" | "sex" | "password" | "checkPassword" | "statusYn" | "bizIdx"
>;


export interface IPostResponse {
    result: string;
    id?: string;
}

export interface IUserDetailResponse {
    detail: IUser;
    chkRegBiz?: IBiz;
}

export interface IUserListResponse {
    applicantCnt: number;
    applicant: IUser[];
}
