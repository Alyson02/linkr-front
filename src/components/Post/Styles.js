import styled from "styled-components";

export const RepostedInfo = styled.div`
  position: absolute;
  left: 12px;
  top: 8px;
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const RepostedPeople = styled.span`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #ffffff;
`;

export const BackIfRepost = styled.div`
  padding-top: ${(props) => (props.reposted ? "33px" : "0px")};
  background-color: #1e1e1e;
  border-radius: 16px;
  position: relative;
  @media (max-width: 937px) {
    border-radius: 0;
  }
`;

export const InputContainer = styled.form`
  display: flex;
  width: inherit;
  border-radius: 8px;
  cursor: text;
  align-items: center;
  justify-content: space-between;
  padding-right: 10px;
  gap: 15px;
  div {
    display: flex;
    align-items: center;
    position: relative;
    width: inherit;
    background-color: #252525;
    border-radius: 8px;
    padding: 0 0.7vw;
    input {
      display: flex;
      align-items: center;
      width: calc(100% - 20px);
      height: 45px;
      border-radius: 8px;
      border: none;
      font-size: 14px;
      color: #c6c6c6;
      font-family: "Lato";
      background-color: #252525;
    }
    input:focus {
      box-shadow: 0;
      outline: 0;
    }
    input::placeholder {
      color: #575757;
      font-style: italic;
    }
    button {
      background-color: #252525;
      border: none;
    }
  }
  img {
    border-radius: 26.5px;
    width: 40px;
    height: 40px;
    object-fit: cover;
    cursor: pointer;
    @media (max-width: 937px) {
      width: 30px;
      height: 30px;
    }
  }
`;

export const MainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const PostWrapper = styled.div`
  background-color: #171717;
  padding: 18px;
  display: flex;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  width: 100%;
  overflow: hidden;
  flex-direction: row;
  gap: 20px;
  z-index: 2;
  @media (max-width: 937px) {
    border-radius: 0px;
  }
`;

export const PostContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 18px;
  @media (max-width: 937px) {
    border-radius: 0px;
    gap: 10px;
  }
`;

export const UserLikesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

export const TextLikes = styled.p`
  margin-top: 2px;
  margin-bottom: 13px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  color: #ffffff;
  overflow: hidden;
  white-space: nowrap;
`;

export const TextIconsPost = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  color: #ffffff;
`;

export const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  gap: 5px;
  a {
    text-decoration: none;
  }
`;

export const PostUsername = styled.p`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  color: #ffffff;
`;

export const PostContent = styled.p`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: #b7b7b7;
`;

export const LinkWrapper = styled.div`
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  @media (max-width: 937px) {
    align-items: flex-start;
  }
`;

export const LinkDescriptions = styled.div`
  padding: 24px;
  @media (max-width: 937px) {
    padding: 8px;
  }
`;

export const LinkTitle = styled.h1`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  line-break: normal;
  overflow-wrap: break-word;
  word-break: break-all;
  color: #cecece;
  @media (max-width: 937px) {
    font-size: 11px;
  }
`;

export const LinkDescription = styled.p`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #9b9595;
  margin: 10px 0;
  overflow-wrap: break-word;
  word-break: break-all;
  @media (max-width: 937px) {
    font-size: 9px;
  }
`;

export const LinkUrl = styled.p`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  overflow-wrap: break-word;
  word-break: break-all;
  color: #cecece;
  @media (max-width: 937px) {
    font-size: 9px;
  }
`;

export const LinkImage = styled.img`
  width: 155px;
  height: 155px;
  object-fit: cover;
  border-radius: inherit;
  border-bottom-left-radius: 0;
  border-top-left-radius: 0;
  @media (max-width: 937px) {
    width: 95px;
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  svg {
    margin-right: 10px;
  }
`;

export const InputContent = styled.textarea`
  background: #ffffff;
  border-radius: 5px;
  width: 100%;
  border: none;
  outline: none;
  border-radius: 5px;
  padding: 12px;
  min-height: 66px;
  resize: vertical;
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  color: #4c4c4c;
`;

export const CommentsWrapper = styled.div`
  z-index: 1;
  margin-top: -76px;
  min-width: 100%;
  height: auto;
  padding: 88px 20px 25px 20px;
  display: ${(props) => props.pressedOnComment ? "flex" : "none"};
  flex-direction: column;
  background-color: #1E1E1E;
  border-radius: 16px;
`;

export const CommentLine = styled.div`
  margin-top: 19px;
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    margin-top: 1px;
    width: 39px;
    height: 39px;
    border-radius: 26.5px;
    margin-right: 14px;
    object-fit: cover;
  }
`;

export const CommentForm = styled.form`
  margin-top: 7px;
  display: flex;
  flex-grow: 1;

  input {
    min-width: 100%;
    height: 39px;
    padding: 11px 15px;
    font-family: 'Lato', sans-serif;
    font-style: italic;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.05em;
    color: #575757;
    background-color: #252525;
    border: none;
    border-radius: 8px;
  }

  button {
    margin-left: -39px;
    padding-right: 16px;
    width: 39px;
    height: 39px;
    background-color: #252525;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    border-radius: 8px;
  }
`;


// const MainWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
// `;

// const PostWrapper = styled.div`
//   z-index: 2;
//   background-color: #171717;
//   padding: 18px;
//   display: flex;
//   box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
//   border-radius: 16px;
//   width: 100%;
//   overflow: hidden;
//   gap: 20px;

//   @media (max-width: 937px) {
//     border-radius: 0px;
//   }
// `

// const UserLikesContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;

//   h3 {
//     margin-top: 19px;
//   }
// `;

// const TextLikes = styled.p`
//   margin-top: 2px;
//   margin-bottom: 13px;
//   font-family: "Lato";
//   font-style: normal;
//   font-weight: 400;
//   font-size: 11px;
//   line-height: 13px;
//   text-align: center;
//   color: #ffffff;
//   overflow: hidden;
//   white-space: nowrap;
// `;

// const PostBody = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: start;
//   width: 100%;
//   gap: 5px;

//   a {
//     text-decoration: none;
//   }
// `;

// const PostUsername = styled.p`
//   font-family: "Lato";
//   font-style: normal;
//   font-weight: 400;
//   font-size: 19px;
//   line-height: 23px;
//   color: #ffffff;
// `;

// const PostContent = styled.p`
//   font-family: "Lato";
//   font-style: normal;
//   font-weight: 400;
//   font-size: 17px;
//   line-height: 20px;
//   color: #b7b7b7;
// `;

// const LinkWrapper = styled.div`
//   border: 1px solid #4d4d4d;
//   border-radius: 11px;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   width: 100%;
//   cursor: pointer;
//   @media (max-width: 937px) {
//     align-items: flex-start;
//   }
// `;

// const LinkDescriptions = styled.div`
//   padding: 24px;
//   @media (max-width: 937px) {
//     padding: 8px;
//   }
// `;

// const LinkTitle = styled.h1`
//   font-family: "Lato";
//   font-style: normal;
//   font-weight: 400;
//   font-size: 16px;
//   line-height: 19px;
//   line-break: normal;
//   overflow-wrap: break-word;
//   word-break: break-all;
//   color: #cecece;
//   @media (max-width: 937px) {
//     font-size: 11px;
//   }
// `;

// const LinkDescription = styled.p`
//   font-family: "Lato";
//   font-style: normal;
//   font-weight: 400;
//   font-size: 11px;
//   line-height: 13px;
//   color: #9b9595;
//   margin: 10px 0;
//   @media (max-width: 937px) {
//     font-size: 9px;
//   }
// `;

// const LinkUrl = styled.p`
//   font-family: "Lato";
//   font-style: normal;
//   font-weight: 400;
//   font-size: 11px;
//   line-height: 13px;
//   color: #cecece;
//   @media (max-width: 937px) {
//     font-size: 9px;
//   }
// `;

// const LinkImage = styled.img`
//   width: 155px;
//   height: 155px;
//   object-fit: cover;
//   border-radius: inherit;
//   border-bottom-left-radius: 0;
//   border-top-left-radius: 0;
//   @media (max-width: 937px) {
//     width: 95px;
//   }
// `;

// const ContentContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   svg{
//     margin-right: 10px;
//   }
// `;


// const InputContent = styled.textarea`
//   background: #ffffff;
//   border-radius: 5px;
//   width: 100%;
//   border: none;
//   outline: none;
//   border-radius: 5px;
//   padding: 12px;
//   min-height: 66px;
//   resize: vertical;
//   font-family: 'Lato';
//   font-style: normal;
//   font-weight: 400;
//   font-size: 14px;
//   line-height: 17px;
  
//   color: #4C4C4C;

// `;

