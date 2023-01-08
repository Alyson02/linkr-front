import { useNavigation } from "react-router";
import React from "react";
import styled from "styled-components";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Api } from "../services/api";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { UserImage } from "./UserImage";

import { Tooltip as ReactTooltip, TooltipWrapper } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Modal from "styled-react-modal";
import { TailSpin } from "react-loader-spinner";
import { useNavigate } from "react-router";

export default function Post({ post, id }) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(Number(post.likes));
  const [modalIsOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let subtitle;

  function likeOrDislike(id) {
    setLiked(!liked);
    liked ? setLikes(likes - 1) : setLikes(likes + 1);

    Api.post(`/like-or-dislike/${id}`).catch(() =>
      swal("", "Erro ao registrar like", "error")
    );
  }

  function tooltipMessage() {
    const previewPleoplesCount = post.peoples.length;
    const pessoa1 = post.peoples[0]?.username;
    const pessoa2 = post.peoples[1]?.username;
    if(previewPleoplesCount === 0){
      return `nothing people liked this post`
    }
    else if (previewPleoplesCount === 0 && liked) {
      return `you`;
    } else if (liked && previewPleoplesCount === 1) {
      return `you and ${pessoa1}`;
    } else if (liked && previewPleoplesCount >= 2) {
      return `you, ${pessoa1} and other ${likes - 2}  peoples`;
    } else if (previewPleoplesCount === 1) {
      return `${pessoa1}`;
    } else {
      return `${pessoa1}, ${pessoa2} and other ${likes - 2}  peoples`;
    }
  }
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }
  function delPost() {
    setLoading(true);

    Api.delete(`/post/${post.id}`)
      .then(() => {
        navigate("/timeline");
      })
      .catch(() => {
        swal("", "Erro ao deletar post", "error");
        closeModal();
        setLoading(false);
      });
  }

  return (
    <PostWrapper>
      <UserLikesContainer>
        <Link to={id ? `/user/${id}` : `/user/${post.userId}`}>
          <UserImage src={post.userImage} />
        </Link>
        <h3>
          {liked ? (
            <TooltipWrapper content={tooltipMessage()}>
              <BsHeartFill
                onClick={() => likeOrDislike(post.id)}
                cursor={"pointer"}
                color="#AC0000"
                size={20}
                id={post.id}
              />
            </TooltipWrapper>
          ) : (
            <TooltipWrapper content={tooltipMessage()}>
              <BsHeart
                onClick={() => likeOrDislike(post.id)}
                cursor={"pointer"}
                color="white"
                size={20}
              />
            </TooltipWrapper>
          )}
          <ReactTooltip />
        </h3>
        <TextLikes>
          {likes} like{likes > 1 && "s"}
        </TextLikes>
      </UserLikesContainer>
      <PostBody>
        <ContentContainer>
          <div>
            <Link to={`/user/${post.userId}`}>
              <PostUsername>{post.username}</PostUsername>
            </Link>
            <PostContent>{post.content}</PostContent>
          </div>
          <div>
            <FaTrash
              cursor={"pointer"}
              color={"white"}
              size={"25px"}
              onClick={openModal}
            />
          </div>
        </ContentContainer>
        <StyledModal
          onBackgroundClick={closeModal}
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Modal"
          opacity={1}
        >
          {loading ? (
            <TailSpin
              height="40"
              width="100%"
              color="#1877f2"
              ariaLabel="tail-spin-loading"
              radius="1"
              visible={true}
              wrapperStyle={{ marginTop: "40px" }}
            />
          ) : (
            <>
              <ContentModal ref={(_subtitle) => (subtitle = _subtitle)}>
                Are you sure you want to delete this post?
              </ContentModal>
              <div>
                <ButtonModalNo onClick={closeModal}>No, go back</ButtonModalNo>
                <ButtonModalYes onClick={delPost}>
                  Yes, delete it
                </ButtonModalYes>
              </div>
            </>
          )}
        </StyledModal>
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
    text-decoration: none;
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

const StyledModal = Modal.styled`
  width: 597px;
  height: 262px;
  display:flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #333333;
  border-radius: 50px;
`;

const ContentModal = styled.h1`
  width: 338px;
  margin-bottom: 30px;
  font-family: "Lato";
  font-style: normal;
  font-weight: 700;
  font-size: 34px;
  line-height: 41px;
  text-align: center;
  color: #ffffff;
`;

const ButtonModalNo = styled.button`
  cursor: pointer;
  width: 134px;
  height: 37px;
  border: none;
  margin-right: 15px;
  background: #ffffff;
  border-radius: 5px;
  color: #1877f2;
`;

const ButtonModalYes = styled.button`
  width: 134px;
  height: 37px;
  border: none;
  background: #1877f2;
  border-radius: 5px;
  color: #ffffff;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
