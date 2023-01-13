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
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "../../components/Loader";
import { EndMessage } from "../../components/EndMessage";

export default function Timeline() {
  const [loading, setLoading] = useState(true);
  const [cleanup, setCleanup] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [noMore, setNoMore] = useState(true);

  useEffect(() => {
    setLoading(true);

    if (cleanup === true) {
      setPage(1);
      setCleanup(false);
      return;
    }

    Api.get(`/posts?page=${page}&limit=10`)
      .then((r) => {
        setPosts(r.data);
        setLoading(false);
        setPage(page + 1);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
        setNoMore(false);
      });
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
    return posts.map((p, i) => (
      <Post setCleanup={setCleanup} post={p} key={i} />
    ));
  }

  async function getPosts() {
    const res = await Api.get(`/posts?page=${page}&limit=10`);
    return res.data;
  }

  async function fetchData() {
    const postsServer = await getPosts();
    setPosts([...posts, ...postsServer]);

    if (postsServer.length === 0 || postsServer.length < 10) setNoMore(false);
    setPage(page + 1);
  }

  return (
    <>
      <TimeLineWrapper>
        <TopBar />
        <PageTitle>
          <div>timeline</div>
        </PageTitle>
        <Wrapper>
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchData}
            hasMore={noMore}
            loader={<Loader />}
            endMessage={
              <EndMessage>{!error && "There are no posts yet"}</EndMessage>
            }
          >
            <PostsWrapper>
              <PostWriter setCleanup={setCleanup} />
              <CarregaPosts />
            </PostsWrapper>
          </InfiniteScroll>
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
