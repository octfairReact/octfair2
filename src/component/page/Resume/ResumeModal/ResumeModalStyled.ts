import styled from 'styled-components';

export const ResumeModalStyled = styled.div`
.modal-header{
    height: 40px;
    line-height: 40px;
    padding: 0px 20px;
    background-color: #3e4463;
}

.modal-header strong {
    font-size: 17px;
    color: #fff;
}


#previewTitle {
    white-space: pre-line;
    font-size: 25px;
    font-weight: 900;
}

#introAndLink{
    margin-top: 20px;
    padding: 15px;
    border-top: 1px solid #ccc;
    white-space: pre-line;
}
#linkPadding{
padding-left: 10px;
}
td {
    text-align: left;
}
.companyPosition{
    font-weight: 900;
    font-size: 15px;
}

#previewResumeContent{
padding: 20px;
}
#previewContentTitle{
margin-bottom: 20px;
}
#addFile{
color: blue; 
text-decoration: underline; 
cursor: pointer;
}
.major{
padding: 0 10px;
}
.companyPositionP{
margin-top: 20px;
margin-left: 20px;
white-space: pre-line;
}
#perStatementTd{
border-bottom: 1px solid #ccc;
}
#perStatementP{
padding: 20px;
white-space: pre-line;
}
`;