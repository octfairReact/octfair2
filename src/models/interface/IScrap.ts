export interface IScrap {
  loginIdx: number | null;
  postBizIdx: string;
  postBizName: string;
  postEndDate: string;
  postExpRequired: string;
  postIdx: number;
  postStatus: string;
  postTitle: string;
  postWorkLocation: string;
  scrapIdx: number;
  scrappedDate: string;
}

export interface IScrapListResponse {
  scrapCnt: number;
  scrapList: IScrap[];
}

export interface ISaveScrapResponse {
  result: string;
}
