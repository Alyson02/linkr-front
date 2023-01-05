import { useNavigation } from "react-router";
import styled from "styled-components";
import { UserImage } from "..";

export default function Post({ post }) {
  return (
    <PostWrapper>
      <UserImage src={post.userImage} />
      <PostBody>
        <PostUsername>{post.username}</PostUsername>
        <PostContent>{post.content}</PostContent>
        <LinkWrapper onClick={() => window.open(post.link.url)}>
          <LinkDescriptions>
            <LinkTitle>{post.link.title}</LinkTitle>
            <LinkDescription>{post.link.description}</LinkDescription>
            <LinkUrl>{post.link.url}</LinkUrl>
          </LinkDescriptions>
          <LinkImage
            src={post.link.image}
            alt=""
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src =
                "https://rafaturis.com.br/wp-content/uploads/2014/01/default-placeholder.png";
            }}
          />
        </LinkWrapper>
      </PostBody>
    </PostWrapper>
  );
}

const PostWrapper = styled.div`
  background-color: #171717;
  padding: 18px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  gap: 18px;
  overflow: hidden;

  @media (max-width: 937px) {
    border-radius: 0px;
    gap: 10px;
    padding: 10px;
  }
`;

const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  gap: 5px;
`;

const PostUsername = styled.p`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 19px;
  line-height: 23px;
  color: #ffffff;
`;

const PostContent = styled.p`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 17px;
  line-height: 20px;
  color: #b7b7b7;
`;

const LinkWrapper = styled.div`
  border: 1px solid #4d4d4d;
  border-radius: 11px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
  @media (max-width:  937px) {
    align-items: flex-start;
  }
`;

const LinkDescriptions = styled.div`
  padding: 24px;
  @media (max-width:  937px) {
    padding: 8px;
  }
`;

const LinkTitle = styled.h1`
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

const LinkDescription = styled.p`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #9b9595;
  margin: 10px 0;
  @media (max-width: 937px) {
    font-size: 9px;
  }
`;

const LinkUrl = styled.p`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #cecece;
  @media (max-width: 937px) {
    font-size: 9px;
  }
`;

const LinkImage = styled.img`
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
