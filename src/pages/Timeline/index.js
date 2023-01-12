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
    2000
  )

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

    return (
      <>
        { numPosts > oldNumPosts ? <NewPosts onClick={()=>{cleanup(true)}}>{numPosts - oldNumPosts}<p>new posts, load more!</p><AiOutlineReload size={20}/></NewPosts> : ''}
        
        {posts.map((p) => <Post post={p} key={p.id} />)}
      </>
    );
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
        <PageTitle>
          <div>timeline</div>
        </PageTitle>
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