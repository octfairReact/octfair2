export interface IFaq {
  faq_idx: number;
  title: string;
  author: string;
  content: string;
  created_date: string;
}

export interface IFaqListResponse {
  faqCnt: number;
  faq: IFaq[];
}

export interface IDetailResponse {
  detail: IFaqDetail;
}

export interface IFaqDetail extends IFaq {
  faq_type: string;
}
