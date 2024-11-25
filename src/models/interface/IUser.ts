export interface IUser {
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
    userStatus: number;
}

export interface IPostResponse {
    result: string;
}

export interface IUserDetailResponse {
    detail: IUser;
}