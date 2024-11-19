export interface IJobPost {
  postIdx: number;
  title: string;
  workLocation: string;
  expRequired: string;
  endDate: string;
  postDate: string;
}

export interface IJobPostListResponse {
  approvalPostCnt: number;
  approvalList: IJobPost[];
}
