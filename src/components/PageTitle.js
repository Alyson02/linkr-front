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
  box-sizing: border-box;
  @media (max-width:  937px) {
    margin-left: 17px;
  }

  div:nth-child(1) {
    display: flex;
    align-items: center;
    gap: 20px;
  }

  /* div:nth-child(2) {
    width: 
  } */
`;

export default PageTitle;
