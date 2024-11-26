import { Button } from "react-bootstrap";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { Portal } from "../../../common/potal/Portal";
import { WithDrawStyled } from "./styled";
import { WithdrawModal } from "../WithdrawModal/WithdrawModal";


export const WithDrawMain = () => {

    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const handlerWithDrawModal = () => {
        setModal(!modal);
    };

    return (
        <>
            <WithDrawStyled>
                <div>
                    사용하고 계신 아이디(세션ID)를 탈퇴할 경우 재사용 및 복구가 불가능합니다. 탈퇴 후 회원정보 및 개인형
                    서비스 이용기록은 모두 삭제됩니다. 안내 사항을 모두 확인하였으며, 이에 동의합니다.
                </div>
                <div>
                    <Button onClick={handlerWithDrawModal}>확인</Button>
                </div>
            </WithDrawStyled>
            {modal && (
                <Portal>
                    <WithdrawModal />
                </Portal>
            )}
        </>
    );
}