export interface IJobPost {
  postIdx: number;
  title: string;
  workLocation: string;
  expRequired: string;
  endDate: string;
  postDate: string;
  bizIdx: number;
}

export interface IJobPostDetail extends IJobPost {
  appStatus: string;
  benefits: string | null;
  duties: string;
  expYears: number | null;
  fileExt: string | null;
  fileName: string | null;
  fileSize: number;
  hirProcess: string | null;
  logicalPath: string | null;
  openings: string | null;
  phsycalPath: string | null;
  posDescription: string | null;
  prefQualifications: string | null;
  reqQualifications: string | null;
  salary: string | null;
  startDate: string;
}

export interface IBizDetail {
  bizAddr: string;
  bizCeoName: string;
  bizContact: string;
  bizEmpCount: string;
  bizFoundDate: string;
  bizIdx: number;
  bizIntro: string;
  bizLogo: string;
  bizName: string;
  bizRevenue: string;
  bizWebUrl: string;
  fileExt: string | null;
  fileSize: number;
  logicalPath: string | null;
  loginId: string;
  phsycalPath: string | null;
}

export interface IJobPostListResponse {
  approvalPostCnt: number;
  approvalList: IJobPost[];
}

export interface IPostdetailResponse {
  postDetail: IJobPostDetail;
  bizDetail: IBizDetail;
}
