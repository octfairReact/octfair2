import { z } from "zod";


//회사 정보 전용 스키마


export const bizDataSchema = z.object({
    bizName: z.string().min(1, "사업자명을 입력해주세요"),
    bizCeoName: z.string().min(1, "대표자명을 입력해주세요"),
    bizEmpCount: z.string().min(1, "사원 수를 입력해주세요"),
    bizRevenue: z.string().min(1, "매출액을 입력해주세요"),
    bizContact: z.string().min(1, "사업 연락처를 입력해주세요"),
    bizAddr: z.string().min(1, "사업지 주소를 입력해주세요"),
    bizWebUrl: z.string().min(1, "홈페이지 주소를 입력해주세요"),
    bizFoundDate: z
        .string()
        .min(1, "설립일을 입력해주세요")
        .refine(
            (data) => {
                const today = new Date();
                const foundDate = new Date(data);
                return foundDate <= today; // 미래 날짜를 거부
            },
            {
                message: "설립일은 미래 날짜일 수 없습니다.",
            }
        ),
    bizIntro: z.string().min(1, "회사 소개를 입력해주세요"),
});
