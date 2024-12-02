import { passwordCheckPwMinSchema, userTypeToLoginIdSchema } from "./UserSchema";


// 회원가입 전용 스키마


//Id 중복 검사 때 사용
export const loginIdSchema = userTypeToLoginIdSchema.pick({
    loginId: true,
});

//회원 유형부터 패스워드 체크까지 병합
const userTypeToCheckPwMinSchema = userTypeToLoginIdSchema.merge(passwordCheckPwMinSchema);

export const userTypeToCheckPwSchema = userTypeToCheckPwMinSchema.refine(
    (data) => data.password === data.checkPassword,
    {
        message: "비밀번호 확인이 일치하지 않습니다.",
        path: ["checkPassword"],
    }
);


