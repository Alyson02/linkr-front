import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Api } from "../../services/api";
import Post from "../../components/Post";
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

export default function UserPosts() {
  let { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState([]);
  const [page, setPage] = useState(1);
  const [noMore, setNoMore] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = (await Api.get(`/user/${id}?page=${page}&limit=10`)).data;
        setPosts(res.posts);
        setUser(res.user);
        setLoading(false);
        setPage(page + 1);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    getPosts();
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

    return posts.map((p) => <Post id={id} post={p} key={p.id} />);
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

  return (
    <TimeLineWrapper onClick={() => setClickedOn(false)}>
      <PageTitle>
        <UserImage src={user.pictureUrl} />
        {loading ? "" : <span>{user.username}'s posts</span>}
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
            <CarregaPosts />
          </PostsWrapper>
        </InfiniteScroll>
      </Wrapper>
    </TimeLineWrapper>
  );
}
