import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import styled from "styled-components"
import { Api } from "../../services/api"
import Post from "../Timeline/components/Post"
import { TailSpin } from "react-loader-spinner";
import PageTitle from "../../components/pageTitle";
import { UserImage } from "../Timeline"

export default function UserPosts() {

    let { id } = useParams()

    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [user, setUser] = useState([])

    useEffect(() => {

        const getPosts = async () => {

            try {

                const res = (await Api.get(`/user/${id}`)).data
                setPosts(res.posts)
                setUser(res.user)
                setLoading(false);

            } catch (err) {
                setError(true)
                setLoading(false);
            }
        }

        getPosts()

    }, [])

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
            <PageTitle>
                <UserImage src={user.pictureUrl} />
                {loading ? '' : (
                    <span>{user.username}'s posts</span>
                )}
            </PageTitle>
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
        </TimeLineWrapper >
    );
}

const TimeLineWrapper = styled.div`
  width: 937px;
  margin: 78px auto 0 auto;
  @media (max-width: 937px) {
    width: 100%;
  }
`;

const PostsWrapper = styled.div`
  margin-top: 43px;
  width: 611px;
  display: flex;
  flex-direction: column;
  gap: 29px;

  @media (max-width: 937px) {
    width: 100%;
  }
`;

const Message = styled.p`
  font-family: "Lato";
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #9b9595;
  text-align: center;
`;