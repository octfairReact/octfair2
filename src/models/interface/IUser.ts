export interface IUser {
    userIdx: number;
    loginId: string;
    userType: string;
    name: string;
    password: string;
    checkPassword: string;
    sex: string;
    zipCode: number;
    phone: string;
    email: string;
    birthday: string;
    address: string;
    detailAddress: string;
    statusYn: string;
    regdate: string;
}


export interface IPostResponse {
    result: string;
}

export interface IUserDetailResponse {
    detail: IUser;
}

export interface IUserListResponse {
    applicantCnt: number;
    applicant: IUser[];
}
