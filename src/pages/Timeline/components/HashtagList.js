import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from 'styled-components';
import { AuthContext } from "../../../contexts/auth";

export default function HashtagList() {
    
    const navigate = useNavigate();

    const [hashtagList, setHashtagList] = useState([]);

    const { user, setHashtag } = useContext(AuthContext);

    useEffect(() => {
        const request = axios.get(
            "https://linkr-ipaw.onrender.com/hashtag",
            { headers: { Authorization: `Bearer ${user.token}` } }
        );        
        request.then(response => {
            setHashtagList(response.data);
        });
        request.catch(error => {
            console.log(error.response.data);
        });
    }, [user]);

    function redirectToHashtag(hashtag) {
        setHashtag(hashtag);
        navigate(`/hashtag/${hashtag.name}`);
    }

    return (
        <>
        <List>
            {hashtagList.map((hashtag, index) =>
                <li key={index} onClick={() => redirectToHashtag(hashtag)}>
                    # {hashtag.name}
                </li>
            )}
        </List>
        </>
    );
}

const List = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    li {
        font-family: 'Lato', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 19px;
        line-height: 23px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
    }
`;