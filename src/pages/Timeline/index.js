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
    Api.get(`/posts?page=${page}&limit=10`)
      .then((r) => {
        setPosts(r.data);
        setLoading(false);
        setPage(page + 1);
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

  async function getPosts() {
    const res = await Api.get(`/posts?page=${page}&limit=10`);
    console.log(res);
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
        <PageTitle>Timeline</PageTitle>

        <Wrapper>
          <InfiniteScroll
            dataLength={posts.length}
            next={fetchData}
            hasMore={noMore}
            loader={<Loader />}
            endMessage={<EndMessage>Yay! You have seen it all</EndMessage>}
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
