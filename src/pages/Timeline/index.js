import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import styled from "styled-components";
import swal from "sweetalert";
import PageTitle from "../../components/pageTitle";
import { Api } from "../../services/api";
import Post from "./components/Post";
import PostWriter from "./components/PostWriter";

export default function Timeline() {
  const [link, setLink] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [submiting, setSubmiting] = useState(false);
  const [cleanup, setCleanup] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    Api.get("/posts")
      .then((r) => {
        setPosts(r.data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });

    if (cleanup === true) {
      setCleanup(false);
    }
  }, [cleanup]);

  function onFinish(e) {
    setSubmiting(true);
    e.preventDefault();

    const body = {
      link,
      content,
    };

    Api.post("/add-post", body)
      .then(() => {
        setLink("");
        setContent("");
        setSubmiting(false);
        setCleanup(true);
      })
      .catch(() => {
        swal("", "Ouve um erro ao publicar seu link", "error");
        setSubmiting(false);
      });
  }

  function CarregaPosts() {
    if (error) {
      return (
        <Message>
          An error occured while trying to fetch the posts, please refresh the
          page
        </Message>
      );
    }

    if (posts.length === 0) {
      return <Message>There are no posts yet</Message>;
    }

    return posts.map((p) => <Post post={p} key={p.id} />);
  }

  return (
    <TimeLineWrapper>
      <PageTitle>Timeline</PageTitle>
      <PostsWrapper>
        <PostWriter
          setLink={setLink}
          link={link}
          setContent={setContent}
          content={content}
          onFinish={onFinish}
          loading={submiting}
        />
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
          <CarregaPosts />
        )}
      </PostsWrapper>
    </TimeLineWrapper>
  );
}

const TimeLineWrapper = styled.div`
  width: 937px;
  margin: 78px auto 0 auto;
  @media (max-width: 937px) {
    width: 100%;
  }
`;

const PostsWrapper = styled.div`
  margin-top: 43px;
  width: 611px;
  display: flex;
  flex-direction: column;
  gap: 29px;

  @media (max-width: 937px) {
    width: 100%;
  }
`;

const Message = styled.p`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #9b9595;
  text-align: center;
`;

export const UserImage = styled.img`
  border-radius: 26.5px;
  width: 50px;
  height: 50px;
  object-fit: cover;
  @media (max-width: 937px) {
    width: 40px;
    height: 40px;
  }
`;
