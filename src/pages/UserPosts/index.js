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
import { TrendingBar, TrendingWrapper } from "../../components/TrendingWrapper";
import HashtagList from "../Timeline/components/HashtagList";
import { Wrapper } from "../../components/Wrapper";

export default function UserPosts() {
  let { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [user, setUser] = useState([]);
  const [follow, setFollow] = useState(false)
  const loggedUser = JSON.parse(localStorage.getItem("user")).user

  const auth = useContext(AuthContext);

  const config = {
    headers: {
      'Authorization': `Bearer ${auth.user.token}`
    }
  }

  useEffect(() => {
    const getPosts = async () => {
      try {
        const res = (await Api.get(`/user/${id}`)).data;
        setPosts(res.posts);
        setUser(res.user);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    const getFollow = async () => {
      try {

        const res = (await Api.get(`/user/follow/${id}`, {}, config)).data.follow

        setFollow(res)

      } catch (err) {
        setError(true)
        setLoading(false)
      }
    }

    getPosts();
    getFollow()
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

  async function followUser() {

    try {

      await Api.post(`/user/follow/${id}`, {}, config)

      setFollow(!follow)

    } catch (err) {
      setError(true)
      setLoading(false)
    }

  }

  return (
    <TimeLineWrapper onClick={() => setClickedOn(false)}>
      <PageTitle follow={follow}>
        <div>
          <UserImage src={user.pictureUrl} />
          {loading ? "" : <span>{user.username}'s posts</span>}
        </div>
        {Number(id) !== Number(loggedUser.id) ? (
          <div onClick={followUser}>
            {follow ? <span>Unfollow</span> : <span>Follow</span>}
          </div>
        ) : ''}
      </PageTitle>
      <Wrapper>
        <PostsWrapper>
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
  );
}
