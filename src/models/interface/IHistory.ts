export interface IApply {
    appId: number;
	userIdx: number;
	postingId: number;
	applyDate: string;
	viewed: string;
	status: string;
	resIdx: number;
	postTitle: string;
	bizIdx: number;
	bizName: string;
    }

export interface IHistorySearch {
    startDate: string;
    viewStatus: string;
    sortOrder: string;
    keyWord: string;
}

export interface IApplyResponse{
	result: IApply[];
	historyCnt: number;
}