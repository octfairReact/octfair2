// src/validation/schemas/userSchema.ts

import { z } from "zod";
import { UserRegex } from "./UserRegex";


//아이디 중복 검사
//비밀번호 찾기(변경) 검사
export const loginIdSchema = z.object({
    loginId: z
        .string()
        .min(1, "아이디를 입력해주세요")
        .max(20, "ID는 최대 20자리 이하여야 합니다")
        .regex(UserRegex.loginIdRegex, "ID는 숫자, 영문자 조합으로 6~20자리여야 합니다"),
});

//비밀번호 찾기(변경) 검사
export const nameEmailSchema = z.object({
    name: z.string().min(1, "이름을 입력해주세요"),
    email: z.string().min(1, "이메일을 입력해주세요").regex(UserRegex.emailRegex, "올바른 이메일 형식이 아닙니다"),
});

//아이디 찾기(변경) 검사
export const loginIdEmailSchema = z.object({
    loginId: z
        .string()
        .min(1, "아이디를 입력해주세요")
        .max(20, "ID는 최대 20자리 이하여야 합니다")
        .regex(UserRegex.loginIdRegex, "ID는 숫자, 영문자 조합으로 6~20자리여야 합니다"),
    email: z.string().min(1, "이메일을 입력해주세요").regex(UserRegex.emailRegex, "올바른 이메일 형식이 아닙니다"),
});



//패스워드 재설정 때 사용
export const passwordCheckPwSchema = z
    .object({
        password: z
            .string()
            .min(1, "비밀번호를 입력해주세요")
            .regex(UserRegex.passwordRegex, "비밀번호는 숫자, 영문자, 특수문자 조합으로 8~15자리여야 합니다"),
        checkPassword: z.string().min(1, "확인용 비밀번호를 입력해주세요"),
    })
    .refine((data) => data.password === data.checkPassword, {
        message: "비밀번호 확인이 일치하지 않습니다.",
        path: ["checkPassword"],
    });



export const userTypeToCheckPwSchema = z.object({
    userType: z.string().min(1, "회원 유형을 선택해주세요"),
    loginId: z
        .string()
        .min(1, "아이디를 입력해주세요")
        .regex(UserRegex.loginIdRegex, "ID는 숫자, 영문자 조합으로 6~20자리여야 합니다"),
    password: z
            .string()
            .min(1, "비밀번호를 입력해주세요")
            .regex(UserRegex.passwordRegex, "비밀번호는 숫자, 영문자, 특수문자 조합으로 8~15자리여야 합니다"),
        checkPassword: z.string().min(1, "확인용 비밀번호를 입력해주세요"),
    })
    .refine((data) => data.password === data.checkPassword, {
        message: "비밀번호 확인이 일치하지 않습니다.",
        path: ["checkPassword"],
});



export const otherUserDataSchema = z.object({
    name: z.string().min(1, "이름을 입력해주세요"),
    userGender: z.string().min(1, "성별을 선택해주세요"),
    birth: z
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
