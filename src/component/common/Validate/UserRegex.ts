

export const UserRegex = {
    loginIdRegex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/,
    passwordRegex: /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%#^*?&])[A-Za-z\d@$!%*#^?&]{8,15}$/,
    phoneRegex: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
    emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    zipCodeRegex: /^\d{5}$/,
    nameRegex: /^[A-Za-z가-힣\s]+$/,
};
