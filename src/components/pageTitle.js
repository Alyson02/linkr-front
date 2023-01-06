import styled from "styled-components";

const PageTitle = styled.h1`
  display: flex;
  align-items: center;
  gap: 20px;
  font-family: "Oswald";
  font-style: normal;
  font-weight: 700;
  font-size: 43px;
  line-height: 64px;
  color: #ffffff;
  @media (max-width:  937px) {
    margin-left: 17px;
  }
`;

export default PageTitle;
