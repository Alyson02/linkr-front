import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../../services/api";
import Post from "../../components/Post/index";
import { TailSpin } from "react-loader-spinner";
import PageTitle from "../../components/PageTitle";
import { TimeLineWrapper } from "../../components/TimeLineWrapper";
import { PostsWrapper } from "../../components/PostsWrapper";
import { Message } from "../../components/Message";
import { UserImage } from "../../components/UserImage";
import { AuthContext } from "../../contexts/auth";
import { Wrapper } from "../../components/Wrapper";
import InfiniteScroll from "react-infinite-scroll-component";
import { Loader } from "../../components/Loader";
import { EndMessage } from "../../components/EndMessage";
import { TrendingBar, TrendingWrapper } from "../../components/TrendingWrapper";
import HashtagList from "../Timeline/components/HashtagList";

export default function UserPosts() {
  let { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(1);
  const [noMore, setNoMore] = useState(true);
  const [follow, setFollow] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [following, setFollowing] = useState("");
  const loggedUser = JSON.parse(localStorage.getItem("user")).user;

  const auth = useContext(AuthContext);

  const config = {
    headers: {
      Authorization: `Bearer ${auth.user.token}`,
    },
  };

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = (await Api.get(`/user/${id}?page=${page}&limit=10`)).data;
        setPosts(res.posts);
        setUser(res.user);
        setLoading(false);
        setPage(page + 1);
        setFollowing(res.following);
        if (res.posts.length < 10) {
          setNoMore(false);
        }
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
      }
    };

    const getFollow = async () => {
      try {
        const res = (await Api.get(`/user/follow/${id}`, {}, config)).data
          .follow;

        setDisabled(false);

        setFollow(res);
      } catch (err) {
        console.log(err);
        setError(true);
        setLoading(false);
        setNoMore(false);
      }
    };

    getPosts();
    getFollow();
  }, [id]);

  const { setClickedOn } = useContext(AuthContext);

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

    return posts.map((p, i) => <Post post={p} key={i} following={following} />);
  }

  async function getPosts() {
    const res = await Api.get(`/user/${id}?page=${page}&limit=10`);
    return res.data.posts;
  }

  async function fetchData() {
    const postsServer = await getPosts();
    setPosts([...posts, ...postsServer]);

    if (postsServer.length === 0 || postsServer.length < 10) setNoMore(false);
    setPage(page + 1);
  }

  async function followUser() {
    try {
      await Api.post(`/user/follow/${id}`, {}, config);

      setFollow(!follow);
    } catch (err) {
      console.log(err);
      setError(true);
      setLoading(false);
    }
  }

  return (
    <TimeLineWrapper onClick={() => setClickedOn(false)}>
      <PageTitle follow={follow} disabled={disabled}>
        <div>
          <UserImage src={user.pictureUrl} />
          {loading ? "" : <span>{user.username}'s posts</span>}
        </div>
        {Number(id) !== Number(loggedUser.id) ? (
          <button onClick={followUser} disabled={disabled}>
            {follow ? <span>Unfollow</span> : <span>Follow</span>}
          </button>
        ) : (
          ""
        )}
      </PageTitle>
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
        <TrendingWrapper>
          <h1>trending</h1>
          <TrendingBar></TrendingBar>
          <HashtagList />
        </TrendingWrapper>
      </Wrapper>
    </TimeLineWrapper>
  );
}
