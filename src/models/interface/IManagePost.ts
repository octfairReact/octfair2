export interface IManagePost {
  postIdx: number;
  title: string;
  workLocation: string;
  expRequired: string;
  startDate: string;
  endDate: string;
  postDate: string;
  bizIdx: number;
  appStatus: string;
}

export interface IManagePostListResponse {
  approvalPostCnt: number;
  approvalList: IManagePost[];
  pendingPostCnt: number;
  pendingList: IManagePost[];
}
