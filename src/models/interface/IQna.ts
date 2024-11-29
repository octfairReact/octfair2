export interface IQna {
  qnaIdx: number;
  title: string;
  content: string;
  author: string;
  createdDate: string;
  ans_content: string | null;
  password: string;
}

export interface IQnaListResponse {
  qnaCnt: number;
  qna: IQna[];
}

export interface IDetailResponse {
  detail: IQnaDetail;
}

export interface IQnaDetail extends IQna {
  fileName: string | null;
  phsycalPath: string | null;
  logicalPath: string | null;
  fileSize: number;
  fileExt: string | null;
}

export interface IPostResponse {
  result: string;
}
