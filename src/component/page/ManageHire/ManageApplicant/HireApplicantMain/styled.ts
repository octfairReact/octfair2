import styled from 'styled-components';

export const HireApplicantMainStyled = styled.div`
   

.container {
	display: grid;
	grid-template-columns: 2fr 1fr;
	gap: 20px;
	padding: 20px;
}

.conTitle {
	display: flex; /* 플렉스박스로 설정하여 요소들을 가로로 배치 */
	justify-content: space-between; /* 양 끝으로 배치 */
	align-items: center; /* 세로 중앙 정렬 */
	margin-bottom: 20px; /* 하단 여백 */
}


/* 전체 폰트 조절 */
body {
	font-family: 'Arial', sans-serif;
	font-size: 16px;
	color: #333;
	margin: 0;
	padding: 0;
}

#selectText{
	display: flex; 
	align-items: flex-start;
	font-size: 20px;
	font-weight: bold;
}

.inputSelect {
	display: flex; 
	align-items: end; 
	justify-content: space-between; 
	width: 100%;
	margin-top:20px;

}
.inputSelect span{
	text-align: center; flex-grow: 1
}


/* 테이블 스타일 */
 		.paging_area{
            width: 990px;
             background-color: #f2f2f2;
        }
         /* 테이블 스타일 */
        #listTable {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        #listTable th {
            background-color: #f2f2f2;
            font-weight: bold;
            padding: 10px;
            border: 0px solid; /* 기본 테두리 0px 설정 */
            border-top: 0.5px solid #ddd; /* 상단 테두리 0.5px 설정 */
            text-align: left;
        }
        #listTable td {
            padding: 8px;
            border: 0px solid; /* 기본 테두리 0px 설정 */
            vertical-align: top;
            font-family: Arial, sans-serif; /* 폰트 설정 */
            font-size: 14px; /* 폰트 크기 설정 */
        }
        /* 버튼 스타일 */
        .btn {
            display: inline-block;
            padding: 6px 12px;
            font-size: 14px;
            cursor: pointer;
            border-radius: 4px;
            text-align: center;
            color: #fff; /* 기본 텍스트 색상 */
            text-decoration: none;
            margin-right: 5px;
        }
        .btn-primary {
            border: 1px solid ;
            color: #000; /* 텍스트 색상: 검은색 */
        }
        .btn-danger {
            border: 1px solid #dc3545;
            color: #dc3545;
        }
        .btn-resume {
            border: 1px solid #007bff;
            color: #007bff;
        }
        .btn:hover {
            opacity: 0.9;
        }
        /* 행 구분 스타일 */
        .row-separator {
            border-top: 1px solid #b0b0b0; /* 구분선 추가 */
        }
        /* 폰트 스타일 */
        .highlight {
        	font-weight: bold;	
            color: #333; /* 텍스트 색상 */
        }
		.resTitle{
			font-size:18px;
			font-weight: bold;
		}
`;
