import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Message } from "../../components/Message";
import PageTitle from "../../components/PageTitle";
import Post from "../../components/Post";
import { PostsWrapper } from "../../components/PostsWrapper";
import { Wrapper } from "../../components/Wrapper";
import { TimeLineWrapper } from "../../components/TimeLineWrapper";
import { TrendingWrapper, TrendingBar } from "../../components/TrendingWrapper";
import HashtagList from "./components/HashtagList";
import TopBar from "../../components/TopBar";
import { Api } from "../../services/api";
import PostWriter from "./components/PostWriter";

export default function Timeline() {
  const [loading, setLoading] = useState(true);
  const [cleanup, setCleanup] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    Api.get(`/posts?page=${page}&limit=10`)
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
    <>
      <TimeLineWrapper>
        <TopBar />
        <PageTitle>Timeline</PageTitle>
        <Wrapper>
          <PostsWrapper>
            <PostWriter setCleanup={setCleanup} />
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
          <TrendingWrapper>
            <h1>trending</h1>
            <TrendingBar></TrendingBar>
            <HashtagList />
          </TrendingWrapper>
        </Wrapper>
      </TimeLineWrapper>
    </>
  );
}
