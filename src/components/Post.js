import { useNavigation } from "react-router";
import styled from "styled-components";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { useState } from "react";
import { Api } from "../services/api";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { UserImage } from "./UserImage";

export default function Post({ post, id }) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(Number(post.likes));

  function likeOrDislike(id) {
    setLiked(!liked);
    liked ? setLikes(likes - 1) : setLikes(likes + 1);

    Api.post(`/like-or-dislike/${id}`).catch(() =>
      swal("", "Erro ao registrar like", "error")
    );
  }

  return (
    <PostWrapper>
      <UserLikesContainer>
        <Link to={id ? `/user/${id}` : `/user/${post.userId}`}><UserImage src={post.userImage} /></Link>
        <h3>
          {liked ? (
            <BsHeartFill
              onClick={() => likeOrDislike(post.id)}
              cursor={"pointer"}
              color="#AC0000"
              size={20}
            />
          ) : (
            <BsHeart
              onClick={() => likeOrDislike(post.id)}
              cursor={"pointer"}
              color="white"
              size={20}
            />
          )}
        </h3>
        <TextLikes>
          {likes} like{likes > 1 && "s"}
        </TextLikes>
      </UserLikesContainer>
      <PostBody>
        <Link to={`/user/${post.userId}`}><PostUsername>{post.username}</PostUsername></Link>
        <PostContent>{post.content}</PostContent>
        {post.link.success ? (
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
        ) : (
          <LinkUrl style={{ fontSize: 12 }}>{post.link.url}</LinkUrl>
        )}
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

const UserLikesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
`;

const TextLikes = styled.div`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  text-align: center;
  color: #ffffff;
`;

const PostBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  gap: 5px;

  a {
    text-decoration: none
  }
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
  @media (max-width: 937px) {
    align-items: flex-start;
  }
`;

const LinkDescriptions = styled.div`
  padding: 24px;
  @media (max-width: 937px) {
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
