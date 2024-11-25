import { IResumeCareer, IResumeCertification, IResumeDetail, IResumeEducation, IResumeSkill } from "./IResume";

export interface IApplicant {
    appId: number,
    userIdx: number,
    loginId: string,
    postIdx: number,
    title: string,
    endDate: null,
    applyDate: string,
    viewed: number,
    status: string,
    resIdx: number,
    name: string,
    email: string,
    phone: string,
    hirProcess: null,
    resTitle: string,
    schoolName: string,
    grdStatus: string,
    company: string,
  }

export interface IApplicantSearch {
    postIdx : string,
    keyword : string,
  }

export interface IBiz {
    postIdx: number,
    title: string,
  }

export interface IApplicantResponse{
    list: IApplicant[];
    count: number;
  }

  export interface IPreviewResume{
    resumeInfo: IResumeDetail;
    careerInfo: IResumeCareer[];
    eduInfo: IResumeEducation[];
    skillInfo: IResumeSkill[];
    certInfo: IResumeCertification[];
    
  }