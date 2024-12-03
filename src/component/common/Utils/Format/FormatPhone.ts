// utils/phoneUtils.js

// 전화번호 포맷팅 함수
export const formatPhoneNumber = (value) => {
    const onlyNumbers = value.replace(/\D/g, ""); // 숫자만 추출
    if (onlyNumbers.length <= 3) return onlyNumbers;
    if (onlyNumbers.length <= 7) {
        return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3)}`;
    }
    return `${onlyNumbers.slice(0, 3)}-${onlyNumbers.slice(3, 7)}-${onlyNumbers.slice(7, 11)}`;
};
