import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { AuthContext } from "../../../contexts/auth";
import { Api } from "../../../services/api";

export default function HashtagList() {
    
    const navigate = useNavigate();

    const [hashtagList, setHashtagList] = useState([]);

    const { user, setHashtag } = useContext(AuthContext);

    useEffect(() => {
        Api.get("/hashtag")
        .then(response => {
            setHashtagList(response.data);
        })
        .catch(error => {
            console.log(error.response.data);
        });
        
    }, [user]);

    function redirectToHashtag(hashtag) {
        setHashtag(hashtag);
        navigate(`/hashtag/${hashtag.name.substring(1)}`);
    }

    return (
        <>
        <List>
            {hashtagList.map((hashtag, index) =>
                <li key={index} onClick={() => redirectToHashtag(hashtag)}>
                    {hashtag.name}
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
    padding-left: 16px;

    li {
        margin-bottom: 23px;
        font-family: 'Lato', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 19px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
        cursor: pointer;
    }

    @media (max-width: 937px) {
        display: none;
    }
`;