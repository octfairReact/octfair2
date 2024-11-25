// formState.ts
import { useState, useRef } from "react";

export function UserInit() {
    // useState
    const [userType, setUserType] = useState<string>("");
    const [userGender, setUserGender] = useState<string>("");
    // const [addressData, setAddressData] = useState({ zipCode: "", userAddress: "" });
    const [address, setAddress] = useState<string>("");
    const [zipCode, setZipCode] = useState<string>("");
    const [checkLoginIdExist, setCheckLoginIdExist] = useState<string>("");

    // useRef
    const loginId = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const checkPassword = useRef<HTMLInputElement>(null);
    const name = useRef<HTMLInputElement>(null);
    const birth = useRef<HTMLInputElement>(null);
    const phone = useRef<HTMLInputElement>(null);
    const email = useRef<HTMLInputElement>(null);
    const userDetailAddress = useRef<HTMLInputElement>(null);

    return {
        state: {
            userType,
            setUserType,
            userGender,
            setUserGender,
            // addressData,
            // setAddressData,
            address,
            setAddress,
            zipCode,
            setZipCode,
            checkLoginIdExist,
            setCheckLoginIdExist,
        },
        refs: {
            loginId,
            password,
            checkPassword,
            name,
            birth,
            phone,
            email,
            userDetailAddress,
        },
    };
}
