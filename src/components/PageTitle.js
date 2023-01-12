import styled from "styled-components";

const PageTitle = styled.h1`
  display: flex;
  align-items: center;
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;
  justify-content: space-between;
  box-sizing: border-box;

  @media (max-width:  937px) {
    margin-left: 17px;
  }

  div:nth-child(1) {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  div:nth-child(2) {
    display: flex;
    width: 112px;
    height: 31px;
    border-radius: 5px;
    background-color: ${props => props.follow ? '#FFFFFF' : '#1877F2'};
    color: ${props => props.follow ? '#1877F2' : '#FFFFFF'};
    font-family: 'Lato';
    font-size: 14px;
    font-weight: 700;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

export default PageTitle;
