import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Api } from "../../services/api"
import Post from "../../components/Post"
import { TailSpin } from "react-loader-spinner";
import PageTitle from "../../components/PageTitle";
import TopBar from "../../components/TopBar"
import { TimeLineWrapper } from "../../components/TimeLineWrapper"
import { PostsWrapper } from "../../components/PostsWrapper"
import { Message } from "../../components/Message"
import { UserImage } from "../../components/UserImage";

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

    }, [id])

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


    return (
        <TimeLineWrapper>
            <TopBar />
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