import { FC, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { IBiz, IBizDetailResponse, IPostResponse } from "../../../../models/interface/IBiz";
import { ManageBusiness } from "../../../../api/api";
import { postApi } from "../../../../api/postApi";
import { NoticeModalStyled } from "../../Notice/NoticeModal/styled";
import { bizDataSchema } from "../../../common/Validate/Schemas/Schemas";

interface IBusinessModalProps {
    bizIdx: number;
}

export const BusinessModal: FC<IBusinessModalProps> = ({ bizIdx }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [bizDetail, setBizDetail] = useState<IBiz>();

    const bizName = useRef<HTMLInputElement>(null);
    const bizCeoName = useRef<HTMLInputElement>(null);
    const bizEmpCount = useRef<HTMLInputElement>(null);
    const bizRevenue = useRef<HTMLInputElement>(null);
    const bizContact = useRef<HTMLInputElement>(null);
    const bizAddr = useRef<HTMLInputElement>(null);
    const bizWebUrl = useRef<HTMLInputElement>(null);
    const bizFoundDate = useRef<HTMLInputElement>(null);
    const bizIntro = useRef<HTMLInputElement>(null);

    useEffect(() => {
        bizIdx && searchDetail(); // 컴포넌트 생성될 때 실행
    }, []);

    const searchDetail = async () => {
        const param = { bizIdx: bizIdx };
        console.log(param);
        const detailApi = await postApi<IBizDetailResponse>(ManageBusiness.getDetail, param);
        if (detailApi) {
            setBizDetail(detailApi.detail);
        }
    };

    const handlerUpdate = async () => {

        const bizData = {
            bizName: bizName.current.value,
            bizCeoName: bizCeoName.current.value,
            bizEmpCount: bizEmpCount.current.value,
            bizRevenue: bizRevenue.current.value,
            bizContact: bizContact.current.value,
            bizAddr: bizAddr.current.value,
            bizWebUrl: bizWebUrl.current.value,
            bizFoundDate: bizFoundDate.current.value,
            bizIntro: bizIntro.current.value,
        };

        const validBiz = bizDataSchema.safeParse(bizData);
        
        if (!validBiz.success) {
            alert(validBiz.error.errors[0].message);
            return;
        }

        const param = {
            bizName: bizName.current.value,
            bizCeoName: bizCeoName.current.value,
            bizEmpCount: bizEmpCount.current.value,
            bizRevenue: bizRevenue.current.value,
            bizContact: bizContact.current.value,
            bizAddr: bizAddr.current.value,
            bizWebUrl: bizWebUrl.current.value,
            bizFoundDate: bizFoundDate.current.value,
            bizIntro: bizIntro.current.value,
            bizIdx: bizIdx,
        };

        const updateApi = await postApi<IPostResponse>(ManageBusiness.getUpdate, param);

        if (updateApi.result === "success") {
            alert("기업 정보 수정이 완료되었습니다");
            handlerModal();
        }
    };

    const handlerModal = () => {
        setModal(!modal);
    };

    return (
        <NoticeModalStyled>
            <table className="table">
                <tbody>
                    <tr>
                        <th>사업자번호</th>
                        <td>
                            <input type="text" defaultValue={bizDetail?.bizIdx} readOnly></input>
                        </td>
                    </tr>
                    <tr>
                        <th>사업자명</th>
                        <td>
                            <input type="text" ref={bizName} defaultValue={bizDetail?.bizName}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>대표자</th>
                        <td>
                            <input type="text" ref={bizCeoName} defaultValue={bizDetail?.bizCeoName}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>사원수</th>
                        <td>
                            <input type="text" ref={bizEmpCount} defaultValue={bizDetail?.bizEmpCount}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>매출액</th>
                        <td>
                            <input type="text" ref={bizRevenue} defaultValue={bizDetail?.bizRevenue}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>연락처</th>
                        <td>
                            <input type="text" ref={bizContact} defaultValue={bizDetail?.bizContact}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>사업자 주소</th>
                        <td>
                            <input type="text" ref={bizAddr} defaultValue={bizDetail?.bizAddr}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>홈페이지 주소</th>
                        <td>
                            <input type="text" ref={bizWebUrl} defaultValue={bizDetail?.bizWebUrl}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>설립일</th>
                        <td>
                            <input type="date" ref={bizFoundDate} defaultValue={bizDetail?.bizFoundDate}></input>
                        </td>
                    </tr>
                    <tr>
                        <th>회사 소개</th>
                        <td>
                            <input type="text" ref={bizIntro} defaultValue={bizDetail?.bizIntro}></input>
                        </td>
                    </tr>
                    <div className="footer">
                        <button onClick={handlerModal}>나가기</button>
                        <button onClick={handlerUpdate}>수정</button>
                    </div>
                </tbody>
            </table>
        </NoticeModalStyled>
    );
};
