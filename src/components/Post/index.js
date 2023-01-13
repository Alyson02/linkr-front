import { useNavigate } from "react-router";
import React, { useContext } from "react";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import { FaRetweet, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { Api } from "../../services/api";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import { UserImage } from "../UserImage";
import { FaPencilAlt } from "react-icons/fa";
import { useRef } from "react";
import { useEffect } from "react";
import { ReactTagify } from "react-tagify";
import { Tooltip as ReactTooltip, TooltipWrapper } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { FiSend } from "react-icons/fi";
import { AuthContext } from "../../contexts/auth";
import { GenericModal } from "../Modal";
import {
  BackIfRepost,
  ContentContainer,
  InputContainer,
  InputContent,
  LinkDescription,
  LinkDescriptions,
  LinkImage,
  LinkTitle,
  LinkUrl,
  LinkWrapper,
  PostBody,
  PostContainer,
  PostContent,
  PostUsername,
  PostWrapper,
  RepostedInfo,
  RepostedPeople,
  TextIconsPost,
  UserLikesContainer,
} from "./Styles";

export default function Post({ post, id, setCleanup }) {
  const [liked, setLiked] = useState(post.liked);
  const [likes, setLikes] = useState(Number(post.likes));
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalRepostIsOpen, setModalRepostIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [postContent, setPostContent] = useState(post.content);
  const [edit, setEdit] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const inputRef = useRef(null);
  const [textPost, setTextPost] = useState(post.content);
  const foundUser = JSON.parse(localStorage.getItem("user")).user;
  const [comment, setComment] = useState("");

  const auth = useContext(AuthContext);

  const config = {
    headers: {
      Authorization: `Bearer ${auth.token}`,
    },
  };

  useEffect(() => {
    if (edit) {
      inputRef.current.focus();
    }
  }, [edit]);

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

    if (previewPleoplesCount === 0 && liked) {
      return `you`;
    } else if (previewPleoplesCount === 0) {
      return `nothing people liked this post`;
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
        closeModal();
        setLoading(false);
      })
      .catch(() => {
        swal("", "Erro ao deletar post", "error");
        closeModal();
        setLoading(false);
      });
  }

  async function commentOnPost(e) {
    e.preventDefault();
    try {
      const commentToBeAdded = comment;

      setComment("");

      await Api.post(
        `/post/comment/${post.id}`,
        { comment: commentToBeAdded },
        config
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function repost() {
    try {
      const res = await Api.post(`/posts/repost/${post.id}`);
      setModalRepostIsOpen(false);
      setCleanup(true);
    } catch (err) {
      console.log(err);
      setModalRepostIsOpen(false);
    }
  }

  return (
    <BackIfRepost reposted={post.reposted}>
      {post.reposted && (
        <RepostedInfo>
          <FaRetweet cursor={"pointer"} color="white" size={20} />
          <RepostedPeople>
            Re-posted by{" "}
            {post.repost.userId == auth.user.user.id
              ? "you"
              : post.repost.username}
          </RepostedPeople>
        </RepostedInfo>
      )}
      <PostWrapper>
        <PostContainer>
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
            <TextIconsPost>
              {likes} like{likes > 1 && "s"}
            </TextIconsPost>
            <FaRetweet
              onClick={() => setModalRepostIsOpen(true)}
              cursor={"pointer"}
              color="white"
              size={20}
            />
            <TextIconsPost>{post.reposts}</TextIconsPost>
          </UserLikesContainer>
          <PostBody>
            <ContentContainer>
              <div>
                <Link to={`/user/${post.userId}`}>
                  <PostUsername>{post.username}</PostUsername>
                </Link>
              </div>
              {foundUser.id === post.userId ? (
                <div>
                  <FaPencilAlt
                    className="edit"
                    cursor={"pointer"}
                    color={"white"}
                    size={"25px"}
                    onClick={() => setEdit(!edit)}
                  />
                  <FaTrash
                    cursor={"pointer"}
                    color={"white"}
                    size={"25px"}
                    onClick={openModal}
                  />
                </div>
              ) : (
                ""
              )}
            </ContentContainer>
            {edit === true ? (
              <InputContent
                ref={inputRef}
                value={postContent}
                onKeyDown={(e) => {
                  if (e.key === "Escape") {
                    setEdit(false);
                  }
                  if (e.key === "Enter") {
                    setEditLoading(true);

                    Api.put(`/post/${post.id}`, { content: postContent })
                      .then((e) => {
                        setTextPost(postContent);
                        setEditLoading(false);
                        setEdit(false);
                      })
                      .catch(() => {
                        swal("", "Erro ao editar post", "error");
                        setEditLoading(false);
                      });
                  }
                }}
                disabled={editLoading}
                onChange={(e) => {
                  setPostContent(e.target.value);
                }}
              />
            ) : (
              <ReactTagify
                colors={"white"}
                tagClicked={(tag) =>
                  navigate("/hashtag/" + tag.replace("#", ""))
                }
              >
                <PostContent>{textPost}</PostContent>
              </ReactTagify>
            )}
            <GenericModal
              open={modalIsOpen}
              close={closeModal}
              loading={loading}
              word="delete"
              phrase="Are you sure you want to delete this post?"
              action={delPost}
            />
            <GenericModal
              open={modalRepostIsOpen}
              close={() => setModalRepostIsOpen(false)}
              action={repost}
              word="share"
              phrase="Do you want to re-post this link?"
              loading={loading}
            />
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
        </PostContainer>
        <InputContainer onSubmit={commentOnPost}>
          <img src={foundUser.pictureUrl} alt="avatar" />
          <div>
            <input
              placeholder="write a comment..."
              onChange={(e) => setComment(e.target.value)}
              value={comment}
            />
            <button type="submit" value={comment}>
              <FiSend size={20} color="#C6C6C6" />
            </button>
          </div>
        </InputContainer>
      </PostWrapper>
    </BackIfRepost>
  );
}
