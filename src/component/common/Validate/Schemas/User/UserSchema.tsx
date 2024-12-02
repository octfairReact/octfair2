import { z } from "zod";
import { UserRegex } from "../../UserRegex";

//공통 스키마

// 아이디와 회원 유형 스키마
export const userTypeToLoginIdSchema = z.object({
    userType: z.string().min(1, "회원 유형을 선택해주세요"),
    loginId: z
        .string()
        .min(1, "아이디를 입력해주세요")
        .regex(UserRegex.loginIdRegex, "ID는 숫자, 영문자 조합으로 6~20자리여야 합니다"),
});


// 다른 스키마와 병합하기 위해 분리
// 패스워드 체크 refine 제외
export const passwordCheckPwMinSchema = z.object({
    password: z
        .string()
        .min(1, "비밀번호를 입력해주세요")
        .regex(UserRegex.passwordRegex, "비밀번호는 숫자, 영문자, 특수문자 조합으로 8~15자리여야 합니다"),
    checkPassword: z.string().min(1, "확인용 비밀번호를 입력해주세요"),
});

// 패스워드 체크 refine 포함
export const passwordCheckPwSchema = passwordCheckPwMinSchema.refine((data) => data.password === data.checkPassword, {
    message: "비밀번호 확인이 일치하지 않습니다.",
    path: ["checkPassword"],
});

//공통(이름, 성별, 생년월일, 전화번호, 이메일, 우편번호, 주소)
export const otherUserDataSchema = z.object({
    name: z.string().min(1, "이름을 입력해주세요").regex(UserRegex.nameRegex, "올바른 이름 형식이 아닙니다"),
    sex: z.string().min(1, "성별을 선택해주세요"),
    birthday: z
        .string()
        .min(1, "생년월일을 선택해주세요")
        .refine(
            (data) => {
                const today = new Date();
                const birthDate = new Date(data);
                return birthDate <= today; // 미래 날짜를 거부
            },
            {
                message: "생년월일은 미래 날짜일 수 없습니다.",
            }
        ),
    phone: z.string().min(1, "전화번호를 입력해주세요").regex(UserRegex.phoneRegex, "올바른 전화번호 형식이 아닙니다"),
    email: z.string().min(1, "이메일을 입력해주세요").regex(UserRegex.emailRegex, "올바른 이메일 형식이 아닙니다"),
    zipCode: z
        .string()
        .min(1, "우편번호를 입력해주세요")
        .regex(UserRegex.zipCodeRegex, "우편번호는 5자리 숫자여야 합니다"), // 5자리 숫자 체크
    address: z.string().min(1, "주소를 입력해주세요"),
});

