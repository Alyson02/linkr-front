import { useEffect, useState } from "react";
import styled from "styled-components";

export default function Comment({
    comment,
    userId,
    username,
    pictureUrl,
    isPostAuthor,
    isFollowed,
}) {

    const [subtitle, setSubtitle] = useState("");

    useEffect(() => {
        console.log(isFollowed);
        if (isPostAuthor) {
            setSubtitle("• post’s author");
        }
        if (isFollowed) {
            setSubtitle("• following");
        }
      }, []);

    return (
        <>
        <Line>
            <img src={pictureUrl} alt={userId} />
            <Text>
                <TextLine>
                    <h1>{username}</h1>
                    <p>{subtitle}</p>
                </TextLine>
                <p>{comment}</p>
            </Text>
        </Line>
        </>
    );
}

const Line = styled.div`
    padding: 0 20px;
    height: 71px;
    display: flex;
    justify-content: flex-start;
    align-items: center;    
    border-bottom: 1px solid #353535;
    transform: rotate(-0.1deg);

    img {
        margin-left: 5px;
        width: 39px;
        height: 39px;
        border-radius: 26.5px;
        margin-right: 14px;
        object-fit: cover;
    }
`;

const Text = styled.div`
    margin-left: 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;

    p {
        margin-top: 3px;
        font-family: 'Lato', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #ACACAC;
    }
`;

const TextLine = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;

    h1 {
        font-family: 'Lato', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        color: #F3F3F3;
    }

    p {
        margin-top: 1px;
        margin-left: 4px;
        font-family: 'Lato', sans-serif;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        color: #565656;
    }
`;