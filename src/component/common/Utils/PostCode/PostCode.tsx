import { Address, useDaumPostcodePopup } from "react-daum-postcode";

interface Props {
    onHandleComplete: (data: Address) => void;
}

export const PostCode = ({ onHandleComplete }: Props) => {
    const open = useDaumPostcodePopup();

    const handleSearchAddress = () => {
        open({ onComplete: onHandleComplete }).catch(() => alert("현재 다음 우편번호 서비스를 이용할 수 없습니다."));
    };

    return (
        <button 
            className="btn btn-outline-primary" 
            onClick={handleSearchAddress}
            style={{ width: "100px", fontWeight: "600" }}
        >
            주소 찾기
        </button>
    )
};

export default PostCode;
