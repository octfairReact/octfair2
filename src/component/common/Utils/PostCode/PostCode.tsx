import { Button } from "react-bootstrap";
import { Address, useDaumPostcodePopup } from "react-daum-postcode";

interface Props {
    onHandleComplete: (data: Address) => void;
}

export const PostCode = ({ onHandleComplete }: Props) => {
    const open = useDaumPostcodePopup();

    const handleSearchAddress = () => {
        open({ onComplete: onHandleComplete }).catch(() => alert("현재 다음 우편번호 서비스를 이용할 수 없습니다."));
    };

    return <Button onClick={handleSearchAddress}>주소 찾기</Button>;
};

export default PostCode;
