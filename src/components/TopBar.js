import styled from "styled-components"
import { IoIosArrowDown } from 'react-icons/io'
import { UserImage } from "./UserImage"
import { AiOutlineSearch } from 'react-icons/ai'
import { DebounceInput } from 'react-debounce-input'
import { Api } from "../services/api"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function UserSearch({ user }) {

    const navigate = useNavigate()

    return (
        <UserSearchContainer>
            {/* <Link to={`/user/${user.id}`}> */}
                <div onClick={() => navigate(`/user/${user.id}`)}>
                    <img src={user.pictureUrl} />
                    <span>{user.username}</span>
                </div>
            {/* </Link> */}
        </UserSearchContainer>
    )
}

function Result({ users }) {
    return (
        <ResultContainer>
            {users.map(u => <UserSearch user={u} key={u.id} />)}
        </ResultContainer>
    )
}

export default function TopBar() {

    const [users, setUsers] = useState([])
    let nameSearched = ''

    async function search(value) {
        try {

            const res = (await Api.get(`/user/search/${value}`)).data
            setUsers(res)

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <TopBarContainer>
            <p>linkr</p>
            <InputContainer>
                <DebounceInput minLength={3} debounceTimeout={300} placeholder='Search for people' onChange={e => {
                    nameSearched = e.target.value
                    if (nameSearched.length > 0) {
                        search(nameSearched)
                    } else {
                        setUsers([])
                    }
                }} />
                <Result users={users} />
                <AiOutlineSearch size={25} color='#C6C6C6' />
            </InputContainer>
            <ProfileContainer>
                <IoIosArrowDown color='white' size={25} />
                <UserImage src='' />
            </ProfileContainer>
        </TopBarContainer>
    )
}

const TopBarContainer = styled.div`
display: flex;
position: fixed;
top: 0;
left: 0;
align-items: center;
justify-content: space-between;
background-color: black;
height: 72px;
width: 100%;
padding: 0 20px;

p {
    font-family: 'Passion One', cursive;
    color: white;
    font-size: 49px;
    font-weight: 700;
}
`

const InputContainer = styled.div`
display: flex;
width: 40vw;
background-color: white;
border-radius: 8px;
cursor: text;
align-items: center;
justify-content: space-between;
padding-right: 10px;
position: relative;
border-top: solid 1px white;

input {
    display: flex;
    align-items: center;
    width: calc(40vw - 45px);
    height: 45px;
    border-radius: 8px;
    border: none;
    padding: 0 0.7vw;
    font-size: 19px;
    color: #C6C6C6;
    font-family: 'Lato'
}

input:focus {
    box-shadow: 0;
    outline: 0;
}

input::placeholder {
    color: #C6C6C6;
}
`

const ProfileContainer = styled.div`
display: flex;
align-items: center;
justify-content: space-between;
width: 85px;
height: 72px;
`

const ResultContainer = styled.div`
display: flex;
flex-direction: column;
width: 40vw;
position: fixed;
top: 54px;
left: 1;
z-index: -1;
border-radius: 0 0 8px 8px;
background-color: #E7E7E7;
gap: 10px;
box-sizing: border-box
`

const UserSearchContainer = styled.div`
padding: 10px;

div {
    display: flex;
    align-items: center;
    gap: 10px;
}

img {
    border-radius: 26.5px;
    width: 40px;
    height: 40px;
    object-fit: cover;
    @media (max-width: 937px) {
    width: 30px;
    height: 30px;
    }
}

span {
    font-size: 19px;
    font-weight: 400;
    font-family: 'Lato';
    color: #515151;
}

a {
    text-decoration: none;
}
`