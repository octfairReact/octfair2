import { z } from "zod";
import { otherUserDataSchema } from "./UserSchema";

export const otherUserDataSchemaWithoutSex = otherUserDataSchema.omit({ sex: true });

export const manageApplicantSchema = otherUserDataSchemaWithoutSex.merge(
    z.object({
        regdate: z
            .string()
            .min(1, "가입일을 입력해주세요")
            .refine(
                (data) => {
                    const today = new Date();
                    const regDate = new Date(data);
                    return regDate <= today; // 미래 날짜를 거부
                },
                {
                    message: "가입일자는 미래 날짜일 수 없습니다.",
                }
            ),
    })
);

