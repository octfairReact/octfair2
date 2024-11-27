export interface IBiz {
    bizIdx: number;
    bizName: string;
    bizAddr: string;
    bizContact: string;
    bizWebUrl: string;
    bizCeoName: string;
    bizFoundDate: string;
    bizIntro: number;
    bizEmpCount: string;
    bizRevenue: string;
    bizLogo: string;
    loginId: string;
    phsycalPath: string;
    logicalPath: string;
    fileSize: string;
    fileExt: string;
}

export interface IPostResponse {
    result: string;
}

export interface IBizDetailResponse {
    detail: IBiz;
}

export interface IBizListResponse {
    bizCnt: number;
    biz: IBiz[];
}
