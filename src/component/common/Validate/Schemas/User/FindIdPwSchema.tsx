import { otherUserDataSchema, userTypeToLoginIdSchema } from "./UserSchema";

//아이디, 비밀번호 찾기 전용 스키마


//아이디 찾기(변경) 검사,  이메일과 이름만 검증하는 스키마 생성
export const emailAndNameSchema = otherUserDataSchema.pick({
    name: true,
    email: true,
});

// 비밀번호 찾기(변경) 검사,   로그인 아이디와 이메일 검증하는 스키마 생성
// userTypeToLoginIdSchema에서 loginId만, otherUserDataSchema에서 email만 추출
export const loginIdEmailSchema = userTypeToLoginIdSchema
    .pick({ loginId: true })
    .merge(otherUserDataSchema.pick({ email: true }));
