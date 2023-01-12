import { useEffect, useState } from "react";
import { TailSpin } from "react-loader-spinner";
import { Message } from "../../components/Message";
import PageTitle from "../../components/PageTitle";
import Post from "../../components/Post";
import { PostsWrapper } from "../../components/PostsWrapper";
import { TimeLineWrapper } from "../../components/TimeLineWrapper";
import TopBar from "../../components/TopBar";
import { Api } from "../../services/api";
import { useNavigate, useParams } from "react-router-dom";
import swal from "sweetalert";

export default function HashtagTimeline() {
  const [loading, setLoading] = useState(true);
  const [cleanup, setCleanup] = useState(false);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  let { hashtag } = useParams()
  let navigate = useNavigate();


  useEffect(() => {
    Api.get("/hashtag/"+hashtag)
      .then((r) => {
        setPosts(r.data);
        setLoading(false);
      })
      .catch((e) => {
        if(e.response.status === 404){
            swal("", "Hashtag não encontrada", "error").then(()=>{
                navigate("/timeline");
            });
        }
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
    <TimeLineWrapper>
      <TopBar />
      <PageTitle># {hashtag}</PageTitle>
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
    </TimeLineWrapper>
  );
}