export interface IResume {
  resIdx: number;
  resTitle: string;
  updatedDate: string;
  fileName: string;
}

export interface IPostResponse {
  result: string;
}

export interface IResumeDetail extends IResume {
  empStatus: string | null;
  shortIntro: string | null;
  proLink: string | null;
  perStatement: string | null;
  phsycalPath: string | null;
  logicalPath: string | null;
  fileSize: number;
  fileExt: string | null;
  phone: string;
  email: string;
}

export interface IResumeCareer {
  crrIdx: number;
  company: string;
  dept: string;
  position: string;
  startDate: string;
  endDate: string;
  reason: string | null;
  crrDesc: number;
}

export interface IResumeEducation {
  eduIdx: number;
  eduLevel: number;
  schoolName: string;
  major: string | null;
  admDate: string;
  grdDate: string;
  grdStatus: string;
}

export interface IResumeSkill extends IResume {
  skillIdx: number;
  skillName: string;
  skillDetail: string | null;
}

export interface IResumeCertification extends IResume {
  certIdx: number;
  certName: string;
  grade: string;
  issuer: string;
  acqDate: string;
}

export interface IResumeDetailReponse {
  payload: IResumeDetail;
}

export interface IResumeCareerReponse {
  payload: IResumeCareer[];
}

export interface IResumeEducationReponse {
  payload: IResumeEducation[];
}

export interface IResumeSkillReponse {
  payload: IResumeSkill[];
}

export interface IResumeCertificationReponse {
  payload: IResumeCertification[];
}

export interface IResumeListResponse {
  payload: IResume[];
}
  