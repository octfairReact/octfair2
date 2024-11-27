export interface ICompany {
    postIdx: number;
    bizIdx: number;
  }
  
  export interface IPostResponse {
    result: string;
  }
  
  export interface ICompanyDetail {
    bizIdx : number;
    bizName: string;
    bizAddr: string;
    bizContact: string;
    bizWebUrl: string | null;
    bizCeoName: string;
    bizFoundDate: string;
    bizEmpCount: string | null;
    bizRevenue: string;
    bizIntro: string | null;
    loginId: string | null;

    bizLogo: string | null;
    phsycalPath: string | null;
    logicalPath: string | null;
    fileSize: number | null;
    fileExt: string | null;
  }
  
  // export interface IResumeSkill extends IResume {
  //   skillIdx: number;
  //   skillName: string;
  //   skillDetail: string | null;
  // }

  export interface ICompanyDetailReponse {
    payload: ICompanyDetail;
  }