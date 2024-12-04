// export const handleOutsideClick = (e: MouseEvent) => {
//     const target = e.target as HTMLElement;
//     // 클릭한 요소가 '.modal-content' 클래스에 포함되지 않으면
//     if (!target.closest(".modal-content")) {
//         e.preventDefault(); // 기본 동작 방지
//         e.stopImmediatePropagation(); // 이벤트 전파 차단
//     }
// };

import { useEffect } from "react";

export const clickHandler = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target.closest(".modal-content")) {
        e.preventDefault(); // 기본 동작 방지
        e.stopImmediatePropagation(); // 이벤트 전파 차단
    }
};

export const handleOutsideClick = (modal: boolean, clickHandler: (e: MouseEvent) => void) => {
    if (modal) {
        // modal이 열려 있을 때만 클릭 리스너를 추가
        document.addEventListener("click", clickHandler, true);
    } else {
        // modal이 닫혔을 때는 리스너를 제거
        document.removeEventListener("click", clickHandler, true);
    }
};

// 커스텀 훅: useOutsideClick
export const useOutsideClick = (modal: boolean) => {
    useEffect(() => {
        // modal 상태에 따라 클릭 리스너를 추가하거나 제거
        handleOutsideClick(modal, clickHandler);

        // Cleanup: 컴포넌트가 언마운트 될 때 리스너 제거
        return () => {
            handleOutsideClick(false, clickHandler); // 컴포넌트 언마운트 시 리스너 제거
        };
    }, [modal]); // modal 상태가 변경될 때마다 실행
};
