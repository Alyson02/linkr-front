import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Message } from "../../components/Message";
import PageTitle from "../../components/PageTitle";
import Post from "../../components/Post/index";
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
import { AiOutlineReload } from "react-icons/ai";
import styled from "styled-components";
import useInterval from 'use-interval'

export default function Timeline() {
  const [loading, setLoading] = useState(true);
  const [cleanup, setCleanup] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [noMore, setNoMore] = useState(true);
  const [following, setFollowing] = useState('');
  const [numPosts, setNumPosts] = useState(-1);
  const [oldNumPosts, setOldNumPosts] = useState(-1);

  useInterval(
    () => {
      Api.get(`/posts/count`)
      .then((r) => {
        if(oldNumPosts === -1){
          setOldNumPosts(r.data.numPosts);
        }
        setNumPosts(r.data.numPosts)
      })
    },
    10000
  )

  useEffect(() => {
    setLoading(true);

    if (cleanup === true) {
      setPage(1);
      setCleanup(false);
      return;
    }

    Api.get(`/posts?page=${page}&limit=10`)
      .then((r) => {
        setFollowing(r.data.following)
        setPosts(r.data.posts);
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

    if(posts.length === 0 && following === '' && loading===false){
      return <Message>You don't follow anyone yet. Search for new friends!</Message>;
    }

    else if (posts.length === 0 && following !== '' && loading===false){
      return <Message>No posts found from your friends</Message>;
    }

    return (
      <>
        { numPosts > oldNumPosts ? <NewPosts onClick={()=>{cleanup(true)}}>{numPosts - oldNumPosts}<p>new posts, load more!</p><AiOutlineReload size={20}/></NewPosts> : ''}

        {posts.map((p, i) => (
          <Post setCleanup={setCleanup} following={following} post={p} key={i} />
        ))}
      </>
    );
  }

  async function getPosts() {
    const res = await Api.get(`/posts?page=${page}&limit=10`);
    return res.data.posts;
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

const NewPosts = styled.button`
  display:flex;
  align-items: center;
  justify-content: center;
  background: #1877F2;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  height: 60px;
  font-family: 'Lato';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  border:none;
  p{
    margin: 0 5px;
    color: #FFFFFF;
  }
  color: #FFFFFF;
`