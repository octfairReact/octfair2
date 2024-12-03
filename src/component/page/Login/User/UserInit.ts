// formState.ts
import { useState, useRef } from "react";

export function UserInit() {
    // useState
    const [userType, setUserType] = useState<string>("");
    const [sex, setSex] = useState<string>("");
    const [userStatus, setUserStatus] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [zipCode, setZipCode] = useState<string>("");
    const [firstCheckId, setFirstCheckId] = useState<string>("");

    // useRef
    const loginId = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const checkPassword = useRef<HTMLInputElement>(null);
    const name = useRef<HTMLInputElement>(null);
    const birthday = useRef<HTMLInputElement>(null);
    const phone = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const userDetailAddress = useRef<HTMLInputElement>(null);
    const regdate = useRef<HTMLInputElement>(null);

    return {
        state: {
            userType,
            setUserType,
            sex,
            setSex,
            userStatus,
            setUserStatus,
            address,
            setAddress,
            zipCode,
            setZipCode,
            firstCheckId,
            setFirstCheckId,
        },
        refs: {
            loginId,
            password,
            checkPassword,
            name,
            birthday,
            phone,
            email,
            userDetailAddress,
            regdate,
        },
    };
}
