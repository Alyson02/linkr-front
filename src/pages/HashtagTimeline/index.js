import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Message } from "../../components/Message";
import PageTitle from "../../components/PageTitle";
import Post from "../../components/Post/index";
import { PostsWrapper } from "../../components/PostsWrapper";
import { TimeLineWrapper } from "../../components/TimeLineWrapper";
import TopBar from "../../components/TopBar";
import { Api } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "../../components/Loader";
import { EndMessage } from "../../components/EndMessage";
import { Wrapper } from "../../components/Wrapper";

export default function HashtagTimeline() {
  const [loading, setLoading] = useState(true);
  const [cleanup, setCleanup] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [noMore, setNoMore] = useState(true);
  let { hashtag } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    Api.get(`/hashtag/${hashtag}?page=1&limit=10`)
      .then((r) => {
        setPosts(r.data);
        setLoading(false);
        setPage(page + 1);
      })
      .catch((e) => {
        if (e.response.status === 404) {
          swal("", "Hashtag não encontrada", "error").then(() => {
            navigate("/timeline");
          });
        }
        setError(true);
        setLoading(false);
        setNoMore(false);
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

    return posts.map((p, i) => <Post post={p} key={i} />);
  }

  async function getPosts() {
    const res = await Api.get(`/hashtag/${hashtag}?page=${page}&limit=10`);
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
    <TimeLineWrapper>
      <TopBar />
      <PageTitle>#{hashtag}</PageTitle>
      <Wrapper>
        <InfiniteScroll
          dataLength={posts.length}
          next={fetchData}
          hasMore={noMore}
          loader={<Loader />}
          endMessage={
            <EndMessage>{!error && "Yay! You have seen it all"}</EndMessage>
          }
        >
          <PostsWrapper>
            <CarregaPosts />
          </PostsWrapper>
        </InfiniteScroll>
      </Wrapper>
    </TimeLineWrapper>
  );
}
