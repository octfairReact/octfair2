// 주소 처리 함수
export const handleAddressComplete = (data, setAddress, setZipCode) => {
    const userAddress = data.address;
    const useZipCode = data.zonecode;

    if (userAddress !== "" || useZipCode !== "") {
        setAddress(userAddress);
        setZipCode(useZipCode);
    }
};
