import { cleanup } from "@testing-library/react";
import { useEffect, useContext, useState } from "react";
import axios from "axios";
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
import { AuthContext } from "../../contexts/auth";

export default function Hashtag() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  const { user, hashtag } = useContext(AuthContext);

  useEffect(() => {
    const request = axios.get(
        `https://linkr-ipaw.onrender.com/hashtag/${hashtag.id}`,
        { headers: { Authorization: `Bearer ${user.token}` } }
    );
    request.then(response => {
        setPosts(response.data);
        setLoading(false);
    });
    request.catch(error => {
        setError(true);
        setLoading(false);
        console.log(error.response.data);
    });
}, []);

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
        <PageTitle># {hashtag.name}</PageTitle>
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
    </>
  );
}