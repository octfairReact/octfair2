import { FC, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../stores/modalState";
import { IBiz, IBizDetailResponse, IPostResponse } from "../../../../models/interface/IBiz";
import { ManageBusiness } from "../../../../api/api";
import { postApi } from "../../../../api/postApi";
import { bizDataSchema } from "../../../common/Validate/Schemas/Biz/ManageBizSchema";
import { BusinessModalStyled } from "./css/styled";
import { formatPhoneNumber } from "../../../common/Utils/Format/FormatPhone";

interface IBusinessModalProps {
    onSuccess: () => void;
    bizIdx: number;
}

export const BusinessModal: FC<IBusinessModalProps> = ({ onSuccess, bizIdx }) => {
    const [modal, setModal] = useRecoilState<boolean>(modalState);
    const [bizDetail, setBizDetail] = useState<IBiz>();
    const [bizEmpCount, setBizEmpCount] = useState("");
    const [bizRevenue, setBizRevenue] = useState("");

    const bizName = useRef<HTMLInputElement>(null);
    const bizCeoName = useRef<HTMLInputElement>(null);
    // const bizEmpCount = useRef<HTMLInputElement>(null);
    // const bizRevenue = useRef<HTMLInputElement>(null);
    const bizContact = useRef<HTMLInputElement>(null);
    const bizAddr = useRef<HTMLInputElement>(null);
    const bizWebUrl = useRef<HTMLInputElement>(null);
    const bizFoundDate = useRef<HTMLInputElement>(null);
    const bizIntro = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        bizIdx && searchDetail(); // 컴포넌트 생성될 때 실행
    }, []);

    // bizDetail을 로드한 후 bizEmpCount 설정
    useEffect(() => {
        if (bizDetail) {
            setBizEmpCount(bizDetail?.bizEmpCount); // bizDetail이 로드된 후 bizEmpCount 설정
            setBizRevenue(bizDetail?.bizRevenue); // bizDetail이 로드된 후 bizEmpCount 설정
        }
    }, [bizDetail]);

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
            bizEmpCount: bizEmpCount,
            bizRevenue: bizRevenue,
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
            bizEmpCount: bizEmpCount,
            bizRevenue: bizRevenue,
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
            onSuccess();
        }
    };

    const handlerModal = () => {
        setModal(!modal);
    };

    return (
        <BusinessModalStyled>
            <table className="table">
                <thead>
                    <tr>
                        <th>
                            <div className="title-container">
                                <strong>기업 회원 관리</strong>
                            </div>
                        </th>
                    </tr>
                </thead>
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
                            <select
                                className="selectOption"
                                value={bizEmpCount}
                                defaultValue={bizDetail?.bizEmpCount}
                                onChange={(e) => setBizEmpCount(e.target.value)}
                            >
                                <option value="10명 이하">10명 이하</option>
                                <option value="50명 이하">50명 이하</option>
                                <option value="100명 이하">100명 이하</option>
                                <option value="1000명 이하">1000명 이하</option>
                                <option value="1000명 이상">1000명 이상</option>
                            </select>
                        </td>
                        {/* <td>
                            <input type="text" ref={bizEmpCount} defaultValue={bizDetail?.bizEmpCount}></input>
                        </td> */}
                    </tr>
                    <tr>
                        <th>매출액</th>
                        <td>
                            <select
                                className="selectOption"
                                value={bizRevenue}
                                defaultValue={bizDetail?.bizRevenue}
                                onChange={(e) => setBizRevenue(e.target.value)}
                            >
                                <option value="10억 이하">10억 이하</option>
                                <option value="100억 이하">100억 이하</option>
                                <option value="1000억 이하">1000억 이하</option>
                                <option value="1000억 이상">1000억 이상</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <th>연락처</th>
                        <td>
                            <input
                                type="text"
                                ref={bizContact}
                                defaultValue={bizDetail?.bizContact}
                                onChange={(e) => {
                                    bizContact.current.value = formatPhoneNumber(e.target.value);
                                }}
                                placeholder="ex) 010-xxxx-xxxx"
                            ></input>
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
                            <textarea className="textarea" ref={bizIntro} defaultValue={bizDetail?.bizIntro} />
                        </td>
                    </tr>
                    <div className="footer">
                        <button onClick={handlerModal}>나가기</button>
                        <button onClick={handlerUpdate}>수정</button>
                    </div>
                </tbody>
            </table>
        </BusinessModalStyled>
    );
};
