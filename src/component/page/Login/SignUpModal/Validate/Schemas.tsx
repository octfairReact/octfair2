// src/validation/schemas/userSchema.ts

import { z } from "zod";

const loginIdRegex = /^[a-zA-Z0-9]{4,15}$/; // 예시 정규식
const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%#^*?&])[A-Za-z\d@$!%*#^?&]{8,15}$/;
const phoneRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const zipCodeRegex = /^\d{5}$/;


export const userSchema1 = z
    .object({
        userType: z.string().min(1, "회원 유형을 선택해주세요"),
        loginId: z.string().min(1, "아이디를 입력해주세요").regex(loginIdRegex, "올바른 아이디 형식이 아닙니다"),
        password: z
            .string()
            .min(1, "비밀번호를 입력해주세요")
            .regex(passwordRegex, "비밀번호는 숫자, 영문자, 특수문자 조합으로 8~15자리여야 합니다"),
        checkPassword: z.string().min(1, "확인용 비밀번호를 입력해주세요"),
    })
    .refine((data) => data.password === data.checkPassword, {
        message: "비밀번호 확인이 일치하지 않습니다.",
        path: ["checkPassword"],
    });

export const userSchema2 = z.object({
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
    phone: z.string().min(1, "전화번호를 입력해주세요").regex(phoneRegex, "올바른 전화번호 형식이 아닙니다"),
    email: z.string().min(1, "이메일을 입력해주세요").regex(emailRegex, "올바른 이메일 형식이 아닙니다"),
    zipCode: z.string().min(1, "우편번호를 입력해주세요").regex(zipCodeRegex, "우편번호는 5자리 숫자여야 합니다"), // 5자리 숫자 체크
    address: z.string().min(1, "주소를 입력해주세요"),
});
           
