import styled from "styled-components";

export const TrendingWrapper = styled.div`
    width: 301px;
    height: 406px;
    margin: 43px 25px;
    display: flex;
    flex-direction: column;
    background: #171717;
    border-radius: 16px;

    h1{
        margin: 9px 16px 12px 16px;
        font-family: 'Oswald', sans-serif;
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        color: #FFFFFF;
    }

    @media (max-width: 937px) {
        display: none;
    }
`;

export const TrendingBar = styled.div`
    width: 301px;
    height: 0px;
    margin-bottom: 22px;
    border: 1px solid #484848;

    @media (max-width: 937px) {
        display: none;
    }
`;