import { cleanup } from "@testing-library/react";
import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import swal from "sweetalert";
import { Message } from "../../components/Message";
import PageTitle from "../../components/PageTitle";
import Post from "../../components/Post";
import { PostsWrapper } from "../../components/PostsWrapper";
import { TimeLineWrapper } from "../../components/TimeLineWrapper";
import TopBar from "../../components/TopBar";
import { Api } from "../../services/api";
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
      <TopBar />
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