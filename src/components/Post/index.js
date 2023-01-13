import { useNavigate } from "react-router";
import React, { useContext } from "react";
import Comment from "../Comment";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { AiOutlineComment } from "react-icons/ai";
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
  CommentForm,
  CommentLine,
  CommentsWrapper,
  ContentContainer,
  InputContainer,
  InputContent,
  LinkDescription,
  LinkDescriptions,
  LinkImage,
  LinkTitle,
  LinkUrl,
  LinkWrapper,
  MainWrapper,
  PostBody,
  PostContainer,
  PostContent,
  PostUsername,
  PostWrapper,
  RepostedInfo,
  RepostedPeople,
  TextIconsPost,
  TextLikes,
  UserLikesContainer,
} from "./Styles";

export default function Post({ post, followList, id, setCleanup }) {
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
  const [pressedOnComment, setPressedOnComment] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(Number(post.comments));
  const [commentList, setCommentList] = useState([]);

  let subtitle;
  const foundUser = JSON.parse(localStorage.getItem("user")).user;

  const auth = useContext(AuthContext);

  const config = {
    headers: {
      'Authorization': `Bearer ${auth.token}`
    }
  }

  useEffect(() => {
    if (edit) {
      inputRef.current.focus();
    }
  }, [edit]);

  useEffect(() => {
    Api.get(`/post/comment/${post.id}`)
    .then((r) => {
      setCommentList(r.data);
    })
    .catch((err) =>
      console.log(err)
    )
  }, [post, setComment]);

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
        e.preventDefault()
        try {

        const commentToBeAdded = comment

        setComment('')

        await Api.post(`/post/comment/${post.id}`, { comment: commentToBeAdded }, config)

        } catch (err) {
        console.log(err)
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
    <MainWrapper>
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
                  width={19.95}
                  height={17.99}
                  id={post.id}
                />
              </TooltipWrapper>
            ) : (
              <TooltipWrapper content={tooltipMessage()}>
                <BsHeart
                  onClick={() => likeOrDislike(post.id)}
                  cursor={"pointer"}
                  color="white"
                  width={19.95}
                  height={17.99}
                />
              </TooltipWrapper>
            )}
            <ReactTooltip />
          </h3>
          <TextLikes>
            {likes} like{likes > 1 && "s"}
          </TextLikes>
          <AiOutlineComment
              onClick={() => setPressedOnComment(!pressedOnComment)}
              cursor={"pointer"}
              color="white"
              size={21}
            />
          <TextLikes>
            {comments} comment{comments > 1 && "s"}
          </TextLikes>
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
            {foundUser.id === post.userId ? 
              <div>
                <FaPencilAlt
                  className="edit"
                  cursor={"pointer"}
                  color={"white"}
                  size={'25px'}
                  onClick={()=> setEdit(!edit)}
                />
                <FaTrash
                  cursor={"pointer"}
                  color={"white"}
                  size={"25px"}
                  onClick={openModal}
                />
              </div>
            :
            ''
            }

          </ContentContainer>
          {
            edit === true ? 
              <InputContent
                ref={inputRef}
                value={postContent}
                onKeyDown={
                  (e)=>{
                    if(e.key === 'Escape'){
                      setEdit(false);
                    }
                    if(e.key === 'Enter'){
                      setEditLoading(true);

                      Api.put(`/post/${post.id}`,{content:postContent}).then((e)=>{
                        setTextPost(postContent)
                        setEditLoading(false);
                        setEdit(false)
                      }).catch(() =>{
                        swal("", "Erro ao editar post", "error")
                        setEditLoading(false);
                        }
                      );
                    }
                    
                  }
                }
                disabled={editLoading}
                onChange={(e) => {setPostContent(e.target.value);}}
              /> 
            : 
            <ReactTagify 
              colors={"white"} 
              tagClicked={(tag)=> navigate('/hashtag/'+tag.replace('#',''))}
            >
              <PostContent>{textPost}</PostContent>
            </ReactTagify>

          }
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
      </PostWrapper>
      <CommentsWrapper pressedOnComment={pressedOnComment}>
        {commentList.map((comment, index) =>
            <Comment 
              key={index}
              comment={comment.comment}
              userId={comment.userId} 
              username={comment.username}
              pictureUrl={comment.pictureUrl}
              isPostAuthor={comment.userId === post.userId ? true : false}
              isFollowed={followList.find(element => element > comment.userId) ? true : false }
            />
        )}
        <CommentLine>
          <img src={foundUser.pictureUrl} alt="userCommenting"/>
          <CommentForm onSubmit={commentOnPost}>
            <input
              data-identifier="input-comment"
              type="text"
              placeholder="write a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            <button type='submit' value={comment}>
              <IoPaperPlaneOutline
                cursor={"pointer"}
                color="#F3F3F3"
                size={16}
              />
            </button>
          </CommentForm>          
        </CommentLine>
      </CommentsWrapper>
    </MainWrapper>
    </BackIfRepost>
  );
}
