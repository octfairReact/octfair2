export interface IResume {
  resIdx: number;
  resTitle: string;
  updatedDate: string;
  fileName: string;
}

export interface IPostResponse {
  result: string;
}

// export interface IResumeDetail extends IResume {
//   content: string;
//   fileExt: string | null;
//   fileName: string | null;
//   fileSize: number;
//   logicalPath: string | null;
//   phsycalPath: string | null;
// }

// export interface IDetailReponse {
//   detail: IResumeDetail;
// }

export interface IResumeListResponse {
  payload: IResume[];
}
  