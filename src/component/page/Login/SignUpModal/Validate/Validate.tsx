import { FC, useState } from "react";
import { z } from "zod";

const userSchema = z.object({
    userType: z.string().min(1, "회원 유형을 선택해주세요"),
});

interface userTypeProps {
    userType: string;
    setUserType: React.Dispatch<React.SetStateAction<string>>;
}

export const ValidType: FC<userTypeProps> = ({ userType, setUserType }) => {
    const [error, setError] = useState("");

    const handleUserType = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setUserType(value);

        // Zod를 사용한 유효성 검사
        const result = userSchema.safeParse({ userType: value });

        if (!result.success) {
            setError(result.error.errors[0].message); // 에러 메시지 설정
        } else {
            setError(""); // 에러 메시지 초기화
        }
    };

    return (
        <select className="selectUserType" value={userType} onChange={handleUserType}>
            <option value="">선택</option>
            <option value="A">개인회원</option>
            <option value="B">기업회원</option>
        </select>
    );
};
